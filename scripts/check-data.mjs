/**
 * Sanity-checks the mock dataset against the product mechanics it claims to
 * model. Run with `node scripts/check-data.mjs` after building the UI package.
 *
 * It is a guard against the brief's explicit red flag: "data that doesn't
 * reflect the mechanics described above".
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { register } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));

// Transpile the TS data module on the fly via esbuild, which vite already installs.
const { build } = await import("esbuild");
const out = await build({
  entryPoints: [resolve(here, "../apps/prototype/src/data/visitors.ts")],
  bundle: true,
  write: false,
  format: "esm",
  platform: "neutral",
  external: [],
  alias: {
    "@clickguard/ui": resolve(here, "../packages/ui/src/index.ts"),
  },
  loader: { ".css": "empty" },
});

const code = out.outputFiles[0].text;
const dataUrl = "data:text/javascript;base64," + Buffer.from(code).toString("base64");
const { VISITORS, derive } = await import(dataUrl);

const NOW = new Date(2026, 8, 12, 10, 40);
const problems = [];
const note = (ip, msg) => problems.push(`${ip.padEnd(16)} ${msg}`);

const THRESHOLD = 70;

for (const v of VISITORS) {
  const d = derive(v);
  const first = v.visits[0].at;
  const last = v.visits[v.visits.length - 1].at;

  if (v.visits.length !== v.pattern?.length && v.pattern) {
    note(v.ip, `pattern length ${v.pattern.length} != ${v.visits.length} visits`);
  }
  if (last > NOW) note(v.ip, `last visit is in the future: ${last.toISOString()}`);
  if (first > last) note(v.ip, "journey runs backwards");

  for (let i = 1; i < v.visits.length; i++) {
    if (v.visits[i].at < v.visits[i - 1].at) note(v.ip, `visit ${i + 1} precedes visit ${i}`);
  }

  // Mechanic: blocking is cumulative. The crossing visit must be the first one
  // at or over the threshold, and it must actually be at or over it.
  if (v.crossAt) {
    const cross = v.visits[v.crossAt - 1];
    if (cross.score < THRESHOLD) {
      note(v.ip, `crossAt visit scores ${cross.score}, below the ${THRESHOLD} threshold`);
    }
    const firstOver = v.visits.findIndex((x) => x.score >= THRESHOLD);
    if (firstOver !== v.crossAt - 1) {
      note(
        v.ip,
        `crossAt=${v.crossAt} but first visit at/over ${THRESHOLD} is visit ${firstOver + 1}`,
      );
    }
  }

  // Coherence: the evidence ledger must add up to the score the drawer is
  // explaining. For a blocked visitor that is the crossing visit; for everyone
  // else it is where they stand now. A total that does not reconcile with the
  // journey is the fastest way to lose the trust this screen exists to build.
  const total = v.signals.reduce((t, s) => t + s.points, 0) + (v.favor?.points ?? 0);
  const explains =
    d.status === "Blocked" && v.crossAt
      ? v.visits[v.crossAt - 1].score
      : v.visits[v.visits.length - 1].score;
  if (total !== explains) {
    note(v.ip, `signals total ${total} but the drawer explains a score of ${explains}`);
  }

  // Mechanic: only paid visits cost money.
  const paid = v.visits.filter((x) => x.source === "paid").length;
  if (v.spentClicks > paid) {
    note(v.ip, `spentClicks=${v.spentClicks} exceeds ${paid} paid visits`);
  }
  if (paid === 0 && v.spentBefore > 0) {
    note(v.ip, `charged ${v.spentBefore} with no paid visits`);
  }

  // Mechanic: blocked means it reached the ad platforms.
  if (d.status === "Blocked" && d.platforms.length === 0) {
    note(v.ip, "blocked but on no platform exclusion list");
  }
  if (d.status !== "Blocked" && v.syncNote) {
    note(v.ip, "has a sync note but is not blocked");
  }
  if (d.status === "Clean" && v.crossAt) {
    note(v.ip, "clean but has a threshold crossing");
  }

  console.log(
    `${v.ip.padEnd(16)} ${String(v.visits.length).padStart(2)} visits ` +
      `${String(paid).padStart(2)} paid  score ${String(d.score).padStart(3)}  ` +
      `${d.status.padEnd(17)} last seen ${d.lastSeenLabel}`,
  );
}

console.log("");
if (problems.length) {
  console.log(`${problems.length} problem(s):`);
  for (const p of problems) console.log("  " + p);
  process.exitCode = 1;
} else {
  console.log(`All ${VISITORS.length} visitors consistent with the product mechanics.`);
}
