import type { Signal, SyncState } from "@clickguard/ui";
import { BLOCK_THRESHOLD } from "@clickguard/ui";
import type {
  ConnectionType,
  DerivedVisitor,
  Platform,
  TrafficSource,
  Visit,
  Visitor,
} from "./types";
import type { VisitorStatus } from "@clickguard/ui";
import { NOW, formatDay, formatLong, formatRelative, plural } from "./format";

/* ---------------------------------------------------------------------------
 * Signal helpers
 *
 * Every signal is a triple: what we saw, what a normal visitor does, and how
 * many points it moved the running total. The baseline is not decoration —
 * it is the only thing that makes the number mean anything to a customer.
 * ------------------------------------------------------------------------ */

const sig = (what: string, baseline: string, points: number): Signal => ({
  what,
  baseline,
  points,
});

const NOTHING_IN_FAVOR: Signal = {
  what: "Nothing in this visitor's favor",
  baseline: "No conversion, form fill or customer history",
  points: 0,
};

/** The shared shape of a click-farm case, parameterised. */
const clickFarmSignals = (
  clicks: number,
  days: number,
  sharedWith: number,
  city: string,
  target = "United States",
): Signal[] => [
  sig(`${clicks} ad clicks in ${days} days, same 2 campaigns`, "1 per day", 22),
  sig(`Device fingerprint shared with ${sharedWith} other IPs`, "1 device per IP", 18),
  sig("Sessions under 3 seconds, no scrolling", "48 s, scrolls 60%", 16),
  sig(`${city}, campaign targets ${target}`, "Location matches", 12),
  sig("Clicks arrive every 4–6 hours, day and night", "Irregular, mostly daytime", 10),
];

/* ---------------------------------------------------------------------------
 * Journey construction
 * ------------------------------------------------------------------------ */

interface VisitorSpec extends Omit<Visitor, "visits" | "favor" | "platforms" | "sync"> {
  /** `P` = paid click, `O` = organic/direct/referral. One character per visit. */
  pattern: string;
  /** Running cumulative score after each visit. Same length as `pattern`. */
  scores: number[];
  /** Minutes before "now" that the first visit happened. */
  ago: number;
  /** Explicit minute gaps between visits (index 0 unused), or use `step`. */
  gaps?: number[];
  /** Average minutes between visits when `gaps` is not given. */
  step?: number;
  favor?: Signal;
  platforms?: Platform[];
  sync?: Partial<Record<Platform, SyncState>>;
}

function buildVisitor(spec: VisitorSpec): Visitor {
  const { pattern, scores, ago, gaps, step = 60 } = spec;
  const visits: Visit[] = [];
  let t = NOW.getTime() - ago * 60000;

  for (let i = 0; i < pattern.length; i++) {
    if (i > 0) {
      // Deterministic jitter so the deployed prototype is identical for
      // everyone, but the spacing still looks like real traffic.
      const gap = gaps ? gaps[i] : step * (0.6 + ((i * 7) % 5) * 0.2);
      t += gap * 60000;
    }
    visits.push({
      at: new Date(t),
      source: (pattern[i] === "P" ? "paid" : "organic") as TrafficSource,
      score: scores[i],
    });
  }

  return {
    ...spec,
    visits,
    favor: spec.favor ?? NOTHING_IN_FAVOR,
    platforms: spec.platforms ?? [],
    sync: spec.sync ?? {},
  };
}

const repeat = (ch: string, n: number) => ch.repeat(n);

/**
 * Builds a rising cumulative curve of `n` visits that crosses the threshold on
 * visit `crossIndex`, ending at `end`. Used for the long click-farm journeys
 * where hand-writing 40 numbers would be noise.
 */
function risingScores(
  n: number,
  crossIndex: number,
  end: number,
  start: number,
  crossValue: number,
): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    let s: number;
    if (!crossIndex) {
      s = n === 1 ? end : start + ((end - start) * i) / (n - 1);
    } else if (i < crossIndex - 1) {
      s = start + ((BLOCK_THRESHOLD - 6 - start) * i) / Math.max(1, crossIndex - 2);
    } else if (i === crossIndex - 1) {
      s = crossValue;
    } else {
      s = crossValue + ((end - crossValue) * (i - crossIndex + 1)) / (n - crossIndex);
    }
    out.push(Math.round(s));
  }
  return out;
}

/* ---------------------------------------------------------------------------
 * The dataset
 *
 * 22 visitors. The mix is deliberate:
 *   · clearly malicious      — 185.220.101.42, 102.89.14.7, 45.142.212.88,
 *                              197.210.53.120, 5.188.62.140, 41.203.72.18,
 *                              49.207.181.92, 178.62.99.14, 41.90.64.203
 *   · genuinely ambiguous    — 77.111.246.19 (converted while click-bursting),
 *                              203.0.113.55 (shared fingerprint, human browsing),
 *                              91.108.4.15, 156.146.51.33 (competitor research)
 *   · plainly fine           — 24.6.113.201, 73.162.8.44, 172.58.203.9,
 *                              98.234.17.6, 96.45.83.210
 *   · good automation        — 66.249.66.1, 31.13.115.2  (see note below)
 *   · overridden by the user — 88.198.24.201
 *   · sync trouble           — 102.89.14.7 (pending), 45.142.212.88 (failed),
 *                              41.90.64.203 (pending)
 * ------------------------------------------------------------------------ */

export const VISITORS: Visitor[] = [
  buildVisitor({
    ip: "185.220.101.42",
    connection: "Datacenter",
    city: "Frankfurt",
    country: "Germany",
    status: "Blocked",
    threatLabel: "Automated traffic",
    pattern: "PPPPO",
    scores: [28, 46, 62, 84, 88],
    ago: 4097,
    gaps: [0, 2, 3, 4, 1790],
    crossAt: 4,
    platforms: ["Google Ads", "Meta Ads"],
    sync: { "Google Ads": "synced", "Meta Ads": "synced" },
    device: "Headless Chrome 128 on Linux · fingerprint shared with 3 other IPs",
    sentence:
      "A datacenter server clicked your ads 4 times in 9 minutes, never scrolled, and never converted. That pattern doesn't come from a person.",
    signals: [
      sig(
        "Datacenter IP (Hetzner range), not a home or mobile connection",
        "Residential or mobile",
        20,
      ),
      sig("4 ad clicks in 9 minutes", "1 per day", 24),
      sig("Sessions lasted 2 seconds, never scrolled", "48 s, scrolls 60%", 16),
      sig("Headless browser markers present", "None", 14),
      sig("Frankfurt, campaign targets United States", "Location matches", 10),
    ],
    spentBefore: 12.8,
    spentClicks: 4,
    spentSince: 0,
    sinceSub: "3 attempts stopped",
    stopped: 3,
    protectedAmount: 9.6,
  }),

  buildVisitor({
    ip: "102.89.14.7",
    connection: "Mobile",
    city: "Lagos",
    country: "Nigeria",
    status: "Blocked",
    threatLabel: "Click farm pattern",
    pattern: repeat("P", 14),
    scores: risingScores(14, 6, 96, 20, 78),
    ago: 5760,
    step: 420,
    crossAt: 6,
    platforms: ["Google Ads", "Meta Ads"],
    sync: { "Google Ads": "pending", "Meta Ads": "synced" },
    device: "Android 12, Chrome Mobile · fingerprint shared with 6 other IPs",
    sentence:
      "A mobile connection in Lagos clicked the same two campaigns 14 times over 4 days, in sessions under 3 seconds. Six other IPs share this phone's fingerprint. That's a click farm, not a customer.",
    syncNote:
      "Google Ads hasn't confirmed the block yet. 8 paid clicks came through while we waited; Meta Ads has been blocking since Sep 10.",
    signals: clickFarmSignals(14, 4, 6, "Lagos"),
    spentBefore: 19.2,
    spentClicks: 6,
    spentSince: 25.6,
    sinceSub: "8 clicks slipped through while Google sync pending",
    stopped: 13,
    protectedAmount: 41.6,
  }),

  buildVisitor({
    ip: "77.111.246.19",
    connection: "VPN",
    city: "London",
    country: "United Kingdom",
    status: "Flagged",
    threatLabel: "Repeat clicks, but converted",
    pattern: "POPPOOO",
    scores: [24, 28, 48, 44, 50, 54, 58],
    ago: 3240,
    step: 400,
    device: "Safari 17 on macOS · NordVPN exit node",
    sentence:
      "This VPN clicked the same ad 3 times in 2 days and barely stayed on the page, which looks like repeat clicking. But it filled in your contact form on visit 4, and bots almost never do that. We're holding off until we see one more paid click without a real action.",
    signals: [
      sig("3 ad clicks in 2 days on the same keyword", "1 per day", 24),
      sig("VPN exit node, real location can't be verified", "Residential or mobile", 20),
      sig("Sessions under 10 seconds, little scrolling", "48 s, scrolls 60%", 16),
      sig("Device fingerprint also seen on 1 other IP", "1 device per IP", 16),
    ],
    favor: sig("Submitted your contact form on visit 4", "Bots almost never convert", -18),
    spentBefore: 9.6,
    spentClicks: 3,
    spentSince: 0,
    sinceSub: "Nothing blocked yet",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "24.6.113.201",
    connection: "Residential",
    city: "Austin",
    country: "United States",
    status: "Clean",
    threatLabel: "Normal behavior",
    pattern: "PO",
    scores: [8, 2],
    ago: 1500,
    step: 1380,
    device: "Chrome 129 on Windows · Spectrum home connection",
    sentence:
      "Someone in Austin clicked one ad, read your pricing page for two minutes, and came back the next day from a search. That's what a real prospect looks like.",
    signals: [
      sig("New visitor, no history with your site", "Most visitors are new", 8),
      sig("Stayed 2 min 10 s, scrolled 85% of the page", "48 s, scrolls 60%", 0),
      sig("Austin, campaign targets United States", "Location matches", 0),
    ],
    favor: sig(
      "Came back the next day from a Google search and viewed pricing",
      "Bots rarely return organically",
      -6,
    ),
    spentBefore: 3.2,
    spentClicks: 1,
    spentSince: 0,
    sinceSub: "Not blocked",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "45.142.212.88",
    connection: "Datacenter",
    city: "Amsterdam",
    country: "Netherlands",
    status: "Blocked",
    threatLabel: "Known bot network",
    pattern: "P",
    scores: [78],
    ago: 1893,
    crossAt: 1,
    platforms: ["Google Ads", "Meta Ads"],
    sync: { "Google Ads": "synced", "Meta Ads": "failed" },
    device: "No browser fingerprint · page never rendered",
    sentence:
      "This IP sits in a datacenter and appears on three public bot lists. It clicked your ad once and never loaded the page. One click was enough to block it.",
    syncNote:
      "Meta Ads rejected the update because your access token expired. Retry, or reconnect Meta Ads in Settings. Google Ads is blocking normally.",
    signals: [
      sig("IP appears on 3 public bot-network lists", "None", 40),
      sig("Datacenter IP (DigitalOcean)", "Residential or mobile", 20),
      sig("Page never rendered, session 0 seconds", "48 s, scrolls 60%", 18),
    ],
    spentBefore: 3.2,
    spentClicks: 1,
    spentSince: 0,
    sinceSub: "1 attempt stopped on Google Ads",
    stopped: 1,
    protectedAmount: 3.2,
  }),

  buildVisitor({
    ip: "197.210.53.120",
    connection: "Mobile",
    city: "Lagos",
    country: "Nigeria",
    status: "Blocked",
    threatLabel: "Click farm pattern",
    pattern: repeat("P", 9) + repeat("O", 31),
    scores: risingScores(40, 9, 98, 18, 78),
    ago: 17280,
    step: 360,
    crossAt: 9,
    platforms: ["Google Ads", "Meta Ads"],
    sync: { "Google Ads": "synced", "Meta Ads": "synced" },
    device: "Android 11, Chrome Mobile · fingerprint shared with 4 other IPs",
    sentence:
      "A mobile connection in Lagos clicked your ads 9 times in 2 days, then kept hitting your landing page directly 31 more times after the block. Real visitors don't do either.",
    signals: clickFarmSignals(9, 2, 4, "Lagos"),
    spentBefore: 28.8,
    spentClicks: 9,
    spentSince: 0,
    sinceSub: "12 attempts stopped",
    stopped: 12,
    protectedAmount: 38.4,
  }),

  buildVisitor({
    ip: "91.108.4.15",
    connection: "Residential",
    city: "Warsaw",
    country: "Poland",
    status: "Flagged",
    threatLabel: "Repeat clicks, off-target",
    pattern: "PPP",
    scores: [22, 38, 52],
    ago: 900,
    step: 300,
    device: "Firefox 130 on Windows · Orange Polska",
    sentence:
      "A home connection in Warsaw clicked your US-targeted ad 3 times in a day. That's unusual, but the sessions look human: real scrolling, two pages each. One more paid click without a real action and we'll block it.",
    signals: [
      sig("3 ad clicks in 15 hours", "1 per day", 22),
      sig("Warsaw, campaign targets United States", "Location matches", 16),
      sig("Same ad and keyword every time", "Varies", 22),
    ],
    favor: sig("Scrolled 70% and viewed 2 pages on each visit", "Human-like browsing", -8),
    spentBefore: 9.6,
    spentClicks: 3,
    spentSince: 0,
    sinceSub: "Nothing blocked yet",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "73.162.8.44",
    connection: "Residential",
    city: "Denver",
    country: "United States",
    status: "Clean",
    threatLabel: "Normal behavior",
    pattern: "POOPOO",
    scores: [6, 4, 4, 10, 4, 2],
    ago: 30240,
    step: 5760,
    device: "Safari 17 on iPhone · Comcast",
    sentence:
      "This visitor has ordered from you twice. Two ad clicks over three weeks with real browsing in between is normal customer behavior.",
    signals: [
      sig("2 ad clicks in 20 days", "1 per day", 6),
      sig("Residential IP (Comcast), Denver", "Residential or mobile", 0),
      sig("Sessions 3–6 minutes, several pages", "48 s", 0),
    ],
    favor: sig("Logged-in customer, 2 orders placed", "Returning customers are trusted", -4),
    spentBefore: 6.4,
    spentClicks: 2,
    spentSince: 0,
    sinceSub: "Not blocked",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "172.58.203.9",
    connection: "Mobile",
    city: "Chicago",
    country: "United States",
    status: "Clean",
    threatLabel: "Normal behavior",
    pattern: "P",
    scores: [12],
    ago: 35,
    device: "Chrome Mobile on Android 14 · T-Mobile",
    sentence:
      "One ad click from a mobile connection in Chicago, 35 minutes ago. Stayed 1 min 40 s and viewed three pages. Nothing unusual.",
    signals: [
      sig("1 ad click, first visit", "1 per day", 12),
      sig("Stayed 1 min 40 s, viewed 3 pages", "48 s", 0),
      sig("Mobile IP (T-Mobile), Chicago", "Residential or mobile", 0),
    ],
    favor: sig(
      "Nothing yet, but nothing against it either",
      "One visit is too early to judge",
      0,
    ),
    spentBefore: 3.2,
    spentClicks: 1,
    spentSince: 0,
    sinceSub: "Not blocked",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "5.188.62.140",
    connection: "Tor",
    city: "Moscow",
    country: "Russia",
    status: "Blocked",
    threatLabel: "Automation markers",
    pattern: "PPP",
    scores: [40, 58, 82],
    ago: 8640,
    step: 25,
    crossAt: 3,
    platforms: ["Google Ads"],
    sync: { "Google Ads": "synced" },
    device: "Scripted browser (Puppeteer markers) · Tor exit node",
    sentence:
      "A Tor exit node ran a scripted browser against your Google ad 3 times in an hour. Your Meta campaigns don't run in this region, so only Google Ads needed the block.",
    signals: [
      sig("Tor exit node", "Residential or mobile", 24),
      sig("Scripted browser (Puppeteer markers)", "None", 28),
      sig("3 ad clicks in 55 minutes", "1 per day", 22),
      sig("Moscow, campaign targets United States", "Location matches", 8),
    ],
    spentBefore: 9.6,
    spentClicks: 3,
    spentSince: 0,
    sinceSub: "7 attempts stopped",
    stopped: 7,
    protectedAmount: 22.4,
  }),

  buildVisitor({
    ip: "88.198.24.201",
    connection: "Datacenter",
    city: "Nuremberg",
    country: "Germany",
    status: "Unblocked by you",
    threatLabel: "Repeat clicks, but converted",
    pattern: "PPPPPOOOO",
    scores: [26, 42, 58, 66, 80, 80, 74, 70, 66],
    ago: 8900,
    gaps: [0, 8, 10, 12, 10, 1600, 1500, 1400, 1300],
    crossAt: 5,
    platforms: ["Google Ads"],
    sync: { "Google Ads": "removed" },
    unblockedAt: "Sep 8, 11:20",
    unblockedDay: "Sep 8",
    device: "Chrome 128 on Linux · Hetzner · likely an office server",
    sentence:
      "We blocked this server after 5 fast paid clicks on Sep 6. You unblocked it on Sep 8. Since then it has come back 4 times without clicking an ad and placed one order. We're still watching, but won't block it again unless you ask.",
    signals: [
      sig("5 ad clicks in 40 minutes", "1 per day", 24),
      sig("Datacenter IP (Hetzner)", "Residential or mobile", 20),
      sig("Sessions 4–6 seconds", "48 s", 14),
      sig("Nuremberg, campaign targets Germany", "Location matches", 0),
      sig("Same landing page every visit", "Varies", 22),
    ],
    favor: sig(
      "Placed an order on Sep 9, after you unblocked it",
      "Bots almost never convert",
      -14,
    ),
    spentBefore: 16,
    spentClicks: 5,
    spentSince: 0,
    sinceSub: "No paid clicks since you unblocked it",
    stopped: 2,
    protectedAmount: 6.4,
  }),

  buildVisitor({
    ip: "203.0.113.55",
    connection: "VPN",
    city: "Singapore",
    country: "Singapore",
    status: "Flagged",
    threatLabel: "Shared device fingerprint",
    pattern: "POOPOOPOOPOO",
    scores: risingScores(12, 0, 61, 20, 0),
    ago: 12960,
    step: 1000,
    device: "Chrome 129 on Windows · Mullvad VPN · fingerprint seen on 2 other IPs",
    sentence:
      "This device shows up under three different IPs, which usually means someone is hiding where they are. But it browses like a person: long sessions, several pages, no burst of clicks. We need a clearer signal before blocking.",
    signals: [
      sig("Device fingerprint seen under 3 different IPs", "1 device per IP", 26),
      sig("VPN exit node (Mullvad)", "Residential or mobile", 20),
      sig("4 ad clicks in 9 days", "1 per day", 15),
    ],
    favor: sig("Long sessions, 3–5 pages each, no click bursts", "Human-like browsing", 0),
    spentBefore: 12.8,
    spentClicks: 4,
    spentSince: 0,
    sinceSub: "Nothing blocked yet",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "98.234.17.6",
    connection: "Residential",
    city: "San Jose",
    country: "United States",
    status: "Clean",
    threatLabel: "Normal behavior",
    pattern: "OOOO",
    scores: [4, 4, 2, 2],
    ago: 8640,
    step: 2000,
    device: "Chrome 129 on macOS · Comcast",
    sentence:
      "Four visits from search results, none from ads. This visitor has never cost you anything.",
    signals: [
      sig("0 ad clicks, 4 organic visits", "1 per day", 4),
      sig("Residential IP (Comcast), San Jose", "Residential or mobile", 0),
    ],
    favor: sig(
      "Arrived from search every time and never cost you a click",
      "Organic traffic is free",
      -2,
    ),
    spentBefore: 0,
    spentClicks: 0,
    spentSince: 0,
    sinceSub: "Not blocked",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "41.203.72.18",
    connection: "Mobile",
    city: "Nairobi",
    country: "Kenya",
    status: "Blocked",
    threatLabel: "Click farm pattern",
    pattern: repeat("P", 7) + repeat("O", 15),
    scores: risingScores(22, 7, 94, 18, 78),
    ago: 21600,
    step: 500,
    crossAt: 7,
    platforms: ["Google Ads", "Meta Ads"],
    sync: { "Google Ads": "synced", "Meta Ads": "synced" },
    device: "Android 10, Chrome Mobile · Safaricom · fingerprint shared with 5 other IPs",
    sentence:
      "A mobile connection in Nairobi clicked your ads 7 times in 3 days, always for 2–3 seconds, sharing a phone fingerprint with five other IPs. It has kept returning directly since the block.",
    signals: clickFarmSignals(7, 3, 5, "Nairobi"),
    spentBefore: 22.4,
    spentClicks: 7,
    spentSince: 0,
    sinceSub: "9 attempts stopped",
    stopped: 9,
    protectedAmount: 28.8,
  }),

  /* ---- Good automation ---------------------------------------------------
   * Not every bot is fraud. A product that blocks Googlebot breaks the
   * customer's organic search presence, and a product that blocks Meta's
   * landing-page checker gets their ads disapproved. Showing the engine
   * *recognising* legitimate automation is a stronger trust signal than any
   * number of correct blocks: it proves the rule is "is this fraud?", not
   * "is this a bot?".
   * --------------------------------------------------------------------- */

  buildVisitor({
    ip: "66.249.66.1",
    connection: "Verified crawler",
    city: "Mountain View",
    country: "United States",
    status: "Clean",
    threatLabel: "Verified search crawler",
    pattern: "OOOOOO",
    scores: [2, 2, 2, 2, 2, 2],
    ago: 14400,
    step: 2400,
    device: "Googlebot/2.1 · reverse DNS confirms google.com",
    sentence:
      "This is Googlebot indexing your site, confirmed by reverse DNS. It never clicks ads and never costs you anything. Blocking it would take you out of Google's organic results, so we never will.",
    signals: [
      sig("Automated client, 6 visits in 10 days", "1 per day", 18),
      sig("Reverse DNS resolves to googlebot.com", "Unverifiable", -8),
      sig("0 ad clicks, only crawls sitemap URLs", "1 per day", 0),
    ],
    favor: sig(
      "Verified search crawler — blocking it would hurt your organic traffic",
      "Good automation is protected",
      -8,
    ),
    spentBefore: 0,
    spentClicks: 0,
    spentSince: 0,
    sinceSub: "Protected from blocking",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "31.13.115.2",
    connection: "Verified crawler",
    city: "Dublin",
    country: "Ireland",
    status: "Clean",
    threatLabel: "Ad platform check",
    pattern: "OOO",
    scores: [4, 4, 4],
    ago: 5400,
    step: 1700,
    device: "facebookexternalhit/1.1 · Meta ASN 32934",
    sentence:
      "Meta's own crawler fetching your landing page to check it against ad policy. It runs from Meta's network and clicks nothing. Blocking it would get your ads disapproved.",
    signals: [
      sig("Datacenter IP, no browser rendering", "Residential or mobile", 22),
      sig("IP belongs to Meta's published ASN 32934", "Unverifiable", -14),
      sig("Fetches only the landing page named in your ad", "Varies", 0),
    ],
    favor: sig(
      "Meta's ad-review crawler — blocking it would get your ads disapproved",
      "Good automation is protected",
      -4,
    ),
    spentBefore: 0,
    spentClicks: 0,
    spentSince: 0,
    sinceSub: "Protected from blocking",
    stopped: 0,
    protectedAmount: 0,
  }),

  /* ---- A second genuinely ambiguous case -------------------------------- */

  buildVisitor({
    ip: "156.146.51.33",
    connection: "VPN",
    city: "Zurich",
    country: "Switzerland",
    status: "Flagged",
    threatLabel: "Only ever reads pricing",
    pattern: "POPOPO",
    scores: [18, 22, 38, 42, 56, 60],
    ago: 20160,
    step: 3200,
    device: "Chrome 129 on macOS · corporate VPN, ASN registered to a dental group",
    sentence:
      "Six visits over two weeks, three of them paid, and every single one went straight to your pricing and comparison pages and nowhere else. The ASN behind this VPN is registered to a competing dental group. This may be a competitor pricing you — but it may also be a practice manager doing their homework before buying, and we won't block a possible customer on a guess.",
    signals: [
      sig("3 ad clicks in 14 days", "1 per day", 12),
      sig("100% of visits land on /pricing or /compare", "Browses 3–5 different pages", 24),
      sig("ASN registered to a competing dental group", "Unaffiliated network", 20),
      sig("Corporate VPN, real location can't be verified", "Residential or mobile", 14),
    ],
    favor: sig(
      "Sessions are 4–7 minutes with real scrolling and no click bursts",
      "Human-like browsing",
      -10,
    ),
    spentBefore: 9.6,
    spentClicks: 3,
    spentSince: 0,
    sinceSub: "Nothing blocked yet",
    stopped: 0,
    protectedAmount: 0,
  }),

  /* ---- Volume, so filtering and sorting have something to chew on ------- */

  buildVisitor({
    ip: "49.207.181.92",
    connection: "Mobile",
    city: "Bengaluru",
    country: "India",
    status: "Blocked",
    threatLabel: "Click farm pattern",
    pattern: repeat("P", 11) + repeat("O", 6),
    scores: risingScores(17, 5, 92, 22, 78),
    ago: 12000,
    step: 640,
    crossAt: 5,
    platforms: ["Google Ads", "Meta Ads"],
    sync: { "Google Ads": "synced", "Meta Ads": "synced" },
    device: "Android 13, Chrome Mobile · fingerprint shared with 8 other IPs",
    sentence:
      "Eleven paid clicks in five days from a phone whose fingerprint is shared with eight other IPs, every session under three seconds. Nobody researches a dentist eleven times without reading a page.",
    signals: clickFarmSignals(11, 5, 8, "Bengaluru"),
    spentBefore: 16,
    spentClicks: 5,
    spentSince: 0,
    sinceSub: "14 attempts stopped",
    stopped: 14,
    protectedAmount: 44.8,
  }),

  buildVisitor({
    ip: "178.62.99.14",
    connection: "Datacenter",
    city: "London",
    country: "United Kingdom",
    status: "Blocked",
    threatLabel: "Automation markers",
    pattern: "PPPP",
    scores: [34, 52, 86, 92],
    ago: 2600,
    step: 14,
    crossAt: 3,
    platforms: ["Google Ads", "Meta Ads"],
    sync: { "Google Ads": "synced", "Meta Ads": "synced" },
    device: "Selenium WebDriver markers · DigitalOcean droplet",
    sentence:
      "Four clicks in 42 minutes from a cloud server running an automation driver. It requested your page but never loaded a single image or stylesheet, which a real browser always does.",
    signals: [
      sig("Selenium WebDriver markers present", "None", 28),
      sig("4 ad clicks in 42 minutes", "1 per day", 24),
      sig("Datacenter IP (DigitalOcean), London", "Residential or mobile", 20),
      sig("Never requested images or stylesheets", "Loads full page", 14),
    ],
    spentBefore: 12.8,
    spentClicks: 4,
    spentSince: 0,
    sinceSub: "5 attempts stopped",
    stopped: 5,
    protectedAmount: 16,
  }),

  buildVisitor({
    ip: "41.90.64.203",
    connection: "Mobile",
    city: "Nairobi",
    country: "Kenya",
    status: "Blocked",
    threatLabel: "Click farm pattern",
    pattern: repeat("P", 8),
    scores: risingScores(8, 5, 90, 24, 78),
    ago: 1400,
    step: 150,
    crossAt: 5,
    platforms: ["Google Ads", "Meta Ads"],
    sync: { "Google Ads": "pending", "Meta Ads": "pending" },
    device: "Android 12, Chrome Mobile · fingerprint shared with 5 other IPs",
    sentence:
      "Eight paid clicks in under a day from a phone sharing a fingerprint with five other IPs in the same city. Same pattern as 41.203.72.18, which we blocked on Sep 8.",
    syncNote:
      "We sent the block to both platforms 4 minutes ago. Neither has confirmed yet — exclusions usually land within 15 minutes, and clicks in the meantime are still billable.",
    signals: clickFarmSignals(8, 1, 5, "Nairobi"),
    spentBefore: 25.6,
    spentClicks: 8,
    spentSince: 0,
    sinceSub: "Waiting on both platforms to confirm",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "96.45.83.210",
    connection: "Residential",
    city: "Phoenix",
    country: "United States",
    status: "Clean",
    threatLabel: "Normal behavior",
    pattern: "OPOO",
    scores: [2, 10, 6, 4],
    ago: 19000,
    step: 4200,
    device: "Edge 129 on Windows · Cox Communications",
    sentence:
      "Found you through search, came back a week later via an ad, then twice more directly. Four visits spread over two weeks with one paid click is ordinary shopping behavior.",
    signals: [
      sig("1 ad click in 13 days", "1 per day", 8),
      sig("Residential IP (Cox), Phoenix", "Residential or mobile", 0),
      sig("Sessions 2–8 minutes across 4 different pages", "48 s", 0),
    ],
    favor: sig(
      "Booked a consultation on the last visit",
      "Bots almost never convert",
      -4,
    ),
    spentBefore: 3.2,
    spentClicks: 1,
    spentSince: 0,
    sinceSub: "Not blocked",
    stopped: 0,
    protectedAmount: 0,
  }),

  buildVisitor({
    ip: "212.102.45.7",
    connection: "VPN",
    city: "Dallas",
    country: "United States",
    status: "Flagged",
    threatLabel: "Repeat clicks, off-target",
    pattern: "PPOP",
    scores: [20, 40, 44, 62],
    ago: 4300,
    step: 520,
    device: "Chrome 129 on Windows · Private Internet Access",
    sentence:
      "Three paid clicks in three days from a consumer VPN, each one 15–20 seconds with light scrolling. Not fast enough to be a script, not engaged enough to be a customer. One more paid click at this rate and we'll block it.",
    signals: [
      sig("3 ad clicks in 3 days", "1 per day", 24),
      sig("Consumer VPN, real location can't be verified", "Residential or mobile", 22),
      sig("Sessions 15–20 seconds, scrolled 25%", "48 s, scrolls 60%", 16),
      sig("Different keyword each time", "Varies", 2),
    ],
    favor: sig(
      "Came back organically once without clicking an ad",
      "Bots rarely return organically",
      -2,
    ),
    spentBefore: 9.6,
    spentClicks: 3,
    spentSince: 0,
    sinceSub: "Nothing blocked yet",
    stopped: 0,
    protectedAmount: 0,
  }),
];

/* ---------------------------------------------------------------------------
 * Derivation
 * ------------------------------------------------------------------------ */

export interface Override {
  status?: VisitorStatus;
  sync?: Partial<Record<Platform, SyncState>>;
  platforms?: Platform[];
  unblockedAt?: string;
  unblockedDay?: string;
  /** Set when the customer, not the engine, made the call. */
  manual?: boolean;
}

export function derive(visitor: Visitor, override?: Override): DerivedVisitor {
  const status = override?.status ?? visitor.status;
  const visitCount = visitor.visits.length;
  const paidCount = visitor.visits.filter((v) => v.source === "paid").length;
  const lastVisit = visitor.visits[visitCount - 1];
  const crossVisit = visitor.crossAt ? visitor.visits[visitor.crossAt - 1] : null;

  let platforms = override?.platforms ?? visitor.platforms;
  if (status === "Blocked" && platforms.length === 0) {
    platforms = ["Google Ads", "Meta Ads"];
  }

  const sync = { ...visitor.sync, ...(override?.sync ?? {}) };
  const syncStates = platforms.map((p) => sync[p] ?? "synced");

  const manual = override?.manual ?? false;
  const blockedAt = status === "Blocked" ? (crossVisit?.at ?? NOW) : null;

  let blockedMain = "—";
  let blockedSub = "";
  let verdictTitle = "";
  let evidenceTitle = "";

  const unblockedDay = override?.unblockedDay ?? visitor.unblockedDay ?? formatDay(NOW);
  const unblockedAt = override?.unblockedAt ?? visitor.unblockedAt ?? formatLong(NOW);

  if (status === "Blocked") {
    blockedMain = platforms.join(", ");
    blockedSub = formatDay(blockedAt!);
    verdictTitle = `Blocked on ${platforms.join(" and ")} · ${manual ? "by you, " : ""}${formatLong(blockedAt!)}`;
    evidenceTitle = crossVisit
      ? `What tipped it on visit ${visitor.crossAt}`
      : "What we saw when you blocked it";
  } else if (status === "Flagged") {
    const watchFrom = visitor.visits.find((v) => v.score >= 40) ?? visitor.visits[0];
    verdictTitle = `Flagged, not blocked · Watching since ${formatDay(watchFrom.at)}`;
    evidenceTitle = "What we've seen so far";
  } else if (status === "Clean") {
    verdictTitle =
      visitCount === 1
        ? "Clean · One visit so far"
        : visitor.connection === "Verified crawler"
          ? "Clean · Verified automation, protected from blocking"
          : visitor.favor.points <= -10
            ? "Clean · Known customer"
            : "Clean · Nothing to block";
    evidenceTitle = "What we checked";
  } else {
    blockedMain = `Unblocked ${unblockedDay}`;
    blockedSub = platforms.length ? `Was on ${platforms.join(", ")}` : "";
    verdictTitle = `Unblocked by you · ${unblockedAt}`;
    evidenceTitle = crossVisit
      ? `What we saw on visit ${visitor.crossAt}, before you unblocked it`
      : "What we saw before you unblocked it";
  }

  // When the customer overrides us in-session, the evidence does not change —
  // we still think what we thought. But the verdict has to say out loud that
  // we complied, otherwise the panel reads as if it is still arguing.
  const sentence =
    override?.status === "Unblocked by you"
      ? `${visitor.sentence} You've unblocked it, so we've removed it from your exclusion lists. We'll keep watching, but we won't block it again unless you ask.`
      : override?.status === "Blocked" && override.manual
        ? `${visitor.sentence} You decided not to wait for that — it's on both exclusion lists now.`
        : visitor.sentence;

  return {
    ...visitor,
    sentence,
    status,
    platforms,
    sync,
    syncStates,
    syncPending: syncStates.includes("pending"),
    syncFailed: syncStates.includes("failed"),
    visitCount,
    paidCount,
    score: lastVisit.score,
    lastSeenAt: lastVisit.at,
    lastSeenLabel: formatRelative(lastVisit.at),
    minutesSinceLastSeen: (NOW.getTime() - lastVisit.at.getTime()) / 60000,
    blockedAt,
    blockedMain,
    blockedSub,
    verdictTitle,
    evidenceTitle,
    identity: `${visitor.connection} · ${visitor.city}, ${visitor.country}`,
    syncNote: status === "Blocked" ? visitor.syncNote : undefined,
    unblockedAt: status === "Unblocked by you" ? unblockedAt : visitor.unblockedAt,
    unblockedDay: status === "Unblocked by you" ? unblockedDay : visitor.unblockedDay,
  };
}

export function journeySummary(v: DerivedVisitor): string {
  return `${v.visitCount} ${plural(v.visitCount, "visit")} · ${v.paidCount} paid · blocks at ${BLOCK_THRESHOLD}`;
}

export type { ConnectionType, Platform };
