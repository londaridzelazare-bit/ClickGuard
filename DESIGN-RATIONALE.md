# ClickGuard · Threat Monitoring — design rationale

**The problem in one line:** blocking is invisible, so the customer has to take our word for it. This screen's job is to make one blocked visitor legible enough that the customer stops needing our word.

---

## 1. The decision that shaped everything else

I started from a question rather than a layout: **what is the smallest thing a sceptical advertiser has to read before they believe us?**

Not a score. Not a chart. A sentence.

> A datacenter server clicked your ads 4 times in 9 minutes, never scrolled, and never converted. That pattern doesn't come from a person.

So the drawer is ordered **verdict → journey → evidence → money**, and it is deliberately the reverse of how the system actually works. The engine computes signals, sums them, crosses a threshold, and emits a decision. Showing that order — signals first, conclusion last — makes the customer assemble the argument themselves. Showing the conclusion first, then letting them audit it, means they can stop reading the moment they're satisfied. Most will stop after the sentence. The rest of the panel exists for the ones who don't, and its real function is to be *available*, not to be read.

Everything below is downstream of that one call.

---

## 2. What I chose to show, hide, group and emphasise

### The threat score is hidden in the table and shown in the drawer

The table shows a bar plus two-to-four plain words — *Automated traffic*, *Click farm pattern*, *Repeat clicks, but converted*. No number.

A bare "84" in a table row invites "84 out of what, and why?" — a question the row cannot answer. Every unanswered question in a trust product is a support ticket, and support tickets are what this screen is supposed to eliminate. The number appears exactly once, in the drawer, directly above the ledger that accounts for every point of it.

`ThreatBar` enforces this: `showValue` is `false` by default and the prototype only turns it on inside the drawer. (Storybook → *ThreatBar → Why the number is hidden*.)

### Counter-evidence is a first-class row

The evidence ledger always ends with **"In this visitor's favor"** — even when the honest answer is *"Nothing in this visitor's favor."*

This is the single strongest trust device on the screen. A list of reasons to block is what a system produces when it has already decided. A list that includes the reasons *not* to block is what a system produces when it is actually weighing. The ambiguous cases depend on it entirely: `77.111.246.19` looks exactly like repeat-click fraud until you see *"Submitted your contact form on visit 4 · −18"*, which is precisely why we haven't blocked it.

### Every number travels with its baseline

The evidence table has three columns, and the middle one carries the argument:

| What happened | Typical visitor | Score |
|---|---|---|
| 4 ad clicks in 9 minutes | 1 per day | +24 |
| Sessions lasted 2 seconds, never scrolled | 48 s, scrolls 60% | +16 |

"4 ad clicks in 9 minutes" is a fact. "4 ad clicks in 9 minutes, when a normal visitor does 1 per day" is an argument. The customer has no intuition for what normal traffic looks like on their own site — that's why they bought the product — so we have to supply it.

### The journey makes "cumulative, not per-visit" visible

`JourneyTimeline` renders every arrival as a bar against a fixed dashed threshold line at 70, with the crossing visit highlighted in red and labelled **"Crossed threshold"**.

This is the mechanic most likely to be misunderstood: customers assume a block is a judgement on one bad click. Drawing the running total climbing across visits — and marking the exact moment it tipped — answers "why *now*?" without a paragraph of explanation.

Colour does real work here. Paid below the line is amber, paid at or over is red, organic is always grey. An organic visit can raise suspicion but never costs the advertiser money, so it never gets a spending colour.

### The ledger reconciles with the journey

The signals sum to the score the drawer is explaining: the crossing visit for a blocked visitor, the current score for everyone else. This is enforced by `scripts/check-data.mjs`, not by discipline — the first pass had eight visitors whose totals didn't reconcile, and an evidence table that doesn't add up destroys more trust than showing no evidence at all.

### Sync status, including failure

Blocking doesn't happen in ClickGuard. It happens in Google Ads and Meta Ads, whenever those APIs get round to it. So every blocked visitor carries a receipt: *Google Ads · Synced*, *Meta Ads · Sync failed · Retry*.

The most important row in the dataset is `102.89.14.7`, whose verdict admits:

> Google Ads hasn't confirmed the block yet. 8 paid clicks came through while we waited; Meta Ads has been blocking since Sep 10.

That is the product volunteering that it cost the customer $25.60 it shouldn't have. It is counter-intuitive, and it is the strongest trust signal in the build: a tool that reports its own failures is one you can believe when it reports success. The customer will find the discrepancy in their own billing anyway — the only choice is whether they find it from us or from Google.

### The unblock confirmation states the cost

Not "Are you sure?" — that transfers no information. Instead: which platforms the ads resume on, that clicks will be billable again, what this visitor has already cost, and what we'll do afterwards. The customer is deciding, not guessing.

---

## 3. What I rejected

**A risk score as the headline.** The obvious move — a big number, maybe a gauge. Rejected: a score is the system's internal representation, not the customer's. "87% confidence" is a claim you can only accept or reject, never verify.

**Charts.** No time-series, no donut of blocked-vs-clean. This screen answers "why was *this visitor* blocked?", which is a question about one journey. A chart would aggregate away the only thing that matters. The three metric cards at the top are the entire concession to summary, and they exist to give the drill-down a frame, not to be studied.

**A modal for visitor detail.** Rejected in favour of a side drawer with the source row still visible behind it and marked with an accent rail. Auditing is comparative — "is this one really worse than that one?" — and a modal severs that. Arrow keys move between visitors without closing the panel.

**Expandable rows instead of a drawer.** The detail is ~700px tall. Inline expansion would push the rest of the table off-screen and make comparison worse than a modal.

**"Block all" as a primary action.** Bulk actions exist but stay quiet, and select-all applies only to visible rows. Bulk blocking is how someone accidentally excludes 200 IPs including their own office. The product's opinion is that individual review is the valuable act.

**Colour-only status.** Every status is a word plus a colour, always. Enforced at the component level: `StatusPill` renders its label from the same `statusTone` map that picks the colour, so there's no code path that produces a bare coloured dot.

**Showing all 40 visits of a click farm.** Rejected: it buries the one row that matters. The timeline keeps the first two visits, the crossing visit with its neighbours, and the two most recent, and folds the rest into a `12 more visits ▾` button. The full journey is one click away and never in the way.

**Green for "Unblocked by you."** It's neutral grey. The customer overrode us — that's neither a success nor a failure, and colouring it green would be the product congratulating itself for a decision it didn't make.

---

## 4. Signals I invented, and why

The brief invited additions. The one I'd defend hardest:

**Verified good automation.** `66.249.66.1` is Googlebot; `31.13.115.2` is Meta's ad-review crawler. Both are datacenter IPs with no browser rendering — every heuristic that catches a click farm catches them too. Both are marked Clean, protected from blocking, and their Block buttons are disabled with an explanation.

This matters more than another correct block. It proves the rule is *"is this fraud?"*, not *"is this a bot?"*. A customer who sees ClickGuard correctly **not** blocking Googlebot learns something no amount of correct blocking teaches: that the system has judgement. It also encodes a real failure mode — blocking Googlebot removes you from organic search, and blocking Meta's crawler gets your ads disapproved.

**Competitor research as an ambiguous case.** `156.146.51.33` visits only `/pricing` and `/compare`, from a VPN whose ASN is registered to a competing dental group. It's flagged, not blocked, and the verdict says why: it might be a competitor, but it might equally be a practice manager doing homework before buying, and we don't block a possible customer on a guess.

**Money that leaked.** `spentSince` tracks spend *after* a block while a sync was pending. Most products would not build this field.

---

## 5. The design system

`@clickguard/ui` is a real workspace package with a real build (`vite build` → ESM + `dist/clickguard-ui.css`, `tsc` → `.d.ts`). The prototype imports from `@clickguard/ui` by package name and from `@clickguard/ui/styles.css`; it does not reach into `src/`, and deleting the package breaks the build.

**Tokens.** `packages/ui/src/styles/tokens.css` is the only file in the repository allowed to contain a raw hex, px, ms or cubic-bezier. Every component stylesheet and the prototype's own `app.css` reference `var(--cg-*)` exclusively.

**Semantic roles over colour names.** Five roles — danger, warning, success, accent, neutral — each a four-part `bg / border / text / fill`. Components take a `tone` or a `status`, never a colour. The split between *status* colours and *interface* colour (accent) is deliberate: an active filter chip is blue, not red, because a filter is a selection and not a verdict.

**Product constants live in the system.** `BLOCK_THRESHOLD = 70` and the `statusTone` map are exported from `@clickguard/ui`, because three components draw the threshold and three render status colour. If they disagreed, the screen would be lying.

Thirteen components, each with states and variants rather than just a happy path — including failure states (`PlatformSyncStatus → Partial failure`), edge cases (`JourneyTimeline → blocked on the first visit`, `→ organic only`), and stories that exist to document a decision (`ThreatBar → Why the number is hidden`).

---

## 6. Where I used AI, and where I overrode it

**Used it for:** the whole implementation. Component scaffolding, CSS, the journey-collapse algorithm, 22 visitor fixtures with their signal tables, Storybook stories, the build setup. Roughly all of the typing.

**Directed it on:** the information architecture (verdict-before-evidence), the decision to hide the score in the table, the three-column evidence shape with a baseline column, the counter-evidence row, sync failure as a feature rather than an error state, and the good-bot cases. These were specified before any code was written; the model executed them.

**Overrode it on:**

- **Evidence totals that didn't reconcile.** Generated signal point values summed to numbers unrelated to the journey scores — eight of twenty-two visitors. Invisible at a glance, fatal on inspection. I wrote `scripts/check-data.mjs` to assert the invariant (plus paid-clicks-vs-spend, threshold-crossing, and chronology), found all eight, and fixed the data. The check now runs in `npm run check`.
- **A missing `box-sizing` reset.** A `height: 100%` element with padding overflowed its `overflow: hidden` shell, so focusing a table row silently scrolled the app 30px and slid the drawer under the top bar. The fix belonged in the design system's base layer, not in a screen.
- **Stale-closure row selection.** `DataTable` emitted selection as a plain array computed from props, so multiple checkbox clicks inside one React batch dropped all but the last. Changed the API to a `useState`-style updater.
- **The drawer closing behind the confirm dialog.** It hid the evidence at the exact moment of commitment. Now it stays open behind the scrim.
- **Toast placement.** Centre-bottom collided with the drawer's action bar, putting *Undo* on top of the button that caused it. Moved to bottom-left.
- **Empty state that wasn't empty.** The "new account" scenario emptied the table but left the chips reading "22 visitors" — the kind of detail that tells a reviewer they're looking at a mock-up.
- **Tone throughout.** First-draft copy reached for *anomaly*, *risk score*, *confidence*. Every one was replaced with something a dentist would say.

The pattern: AI was fast and fluent at surfaces, and unreliable at **invariants** — the places where two parts of the screen have to agree with each other. That's where I spent my attention, and it's why the repo has a data-consistency script rather than a hope.

---

## 7. Second pass — selection, focus, date range, reporting

A later round of changes, all made in `@clickguard/ui` and documented in Storybook
rather than patched into the screen.

**Selection became one colour.** Checked checkboxes were already ink; active filter
chips and the drilled-in table row were accent blue. Two different colours for the
same gesture is one vocabulary too many, so selection now draws from a single
`--cg-selected-*` group: solid ink for small controls (chips, checkboxes, calendar
endpoints), a quiet ink-tinted surface plus an ink rail for large ones (the active
row). Accent is now reserved for links and nothing else. The focus ring moved to ink
for the same reason — a blue focus ring beside an ink selected state reads as two
kinds of "active".

**The search field's triple outline.** Focus was setting `border-color` *and* a
two-layer box-shadow ring, which painted three concentric lines. It now draws one
outline at a negative offset so it lands *on* the border rather than around it.
Hover is a separate, quieter signal that stands down as soon as focus arrives, so
the two never stack. The same treatment is now shared by `TextArea`.

**Metric icons.** There was no icon library — just inline SVGs copy-pasted into five
components. That is the duplication red flag in miniature, so the set moved into
`Icon` with a single 16px grid and stroke weight, and every component now draws from
it. The three metrics get distinct *shapes* (blocked shield, checked shield, flag)
in tones borrowed from the same role tokens the statuses use. Badges are
`aria-hidden` because the card's text label already carries the meaning.

**The date range became real.** It was a decorative button. It is now a
`DateRangePicker`: two months, presets, month navigation, hover preview, keyboard
grid navigation, and an explicit Apply. The draft lives inside the panel so nothing
reaches the page until Apply — which makes Cancel a true revert and means a
half-made selection can never filter the table out from under the user. Ranges
running backwards are made *unreachable* (clicking before the start restarts the
selection) rather than validated after the fact.

Two consequences worth naming. First, **metrics now describe exactly the rows on
screen** — the same set the table renders, after date, chips and search. Summarising
a wider set than the one directly beneath them is how a dashboard ends up
contradicting itself. Second, the mock data had to change: every journey sat inside
a 21-day window, so 14-day and 30-day views returned identical results and the
control looked inert. Six visitors moved back to 40–70 days. A control that does not
visibly change anything is indistinguishable from a broken one.

**Report a mistake** became a real modal instead of a fire-and-forget toast. The
reason field is genuinely optional with no separate "skip": Submit is always enabled
and an empty report is valid, because the useful signal is *that* a customer
disagreed, not why. Confirmation replaces the form in place rather than relying on a
toast the user may miss. Focus trapping, Escape and focus restoration live in a
shared `Modal` primitive that `ConfirmDialog` now also uses — it previously had none
of the three, and its duplicate stylesheet was deleted.

**A bug worth recording:** `Modal` originally focused its first element inside
`requestAnimationFrame`. rAF does not fire in a backgrounded tab, so a modal opened
there would never take focus and the trap would have nothing to trap. It uses
`setTimeout` now.

## 8. Known limits

- Mock data only; no backend. `NOW` is pinned to 2026-09-12 10:40 so timestamps are identical for every reviewer.
- Sync state changes optimistically — a real build would poll the platform APIs.
- Designed for desktop. It reflows below 1100px but the table is genuinely a desktop artefact, and so is the job it supports.
- The date-range control is decorative; ranged filtering wasn't the interesting problem here.
