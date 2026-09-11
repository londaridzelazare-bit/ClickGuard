# ClickGuard · Threat Monitoring

A working React prototype of ClickGuard's Threat Monitoring screen, built on a real
design-system package that the prototype genuinely consumes.

> **The problem:** blocking invalid traffic is invisible by nature. The customer watches
> traffic disappear and has to take our word for it. This screen's job is to make one
> blocked visitor legible enough that they stop needing our word.

**[Design rationale →](./DESIGN-RATIONALE.md)** — what I decided, what I rejected, where I
used AI and where I overrode it.

---

## Repository layout

```
clickguard/
├─ packages/ui/          @clickguard/ui — design system + Storybook
│  ├─ src/styles/tokens.css    the ONLY file allowed to contain a raw hex or px
│  ├─ src/tokens.ts            typed mirror (var() references, never literals)
│  ├─ src/components/          13 components, each with a .stories.tsx
│  └─ .storybook/
├─ apps/prototype/       the Threat Monitoring screen
│  └─ src/data/          22 mock visitors and their journeys
└─ scripts/check-data.mjs  asserts the mock data obeys the product mechanics
```

## Running it

```bash
npm install
npm run dev          # builds @clickguard/ui, then serves the prototype on :5173
```

```bash
npm run storybook    # Storybook on :6006
```

```bash
npm run check        # typecheck both packages + validate the mock data
```

Other scripts: `npm run build` (ui then app), `npm run build:storybook`, `npm run typecheck`,
`npm run check:data`.

Requires Node 20+.

---

## The design system is not decorative

The brief's red flags were hardcoded styles duplicated across components, and a "design
system" nothing imports. Concretely, here is how this repo avoids both:

**One source of truth for every value.** `packages/ui/src/styles/tokens.css` defines every
colour, space, radius, type size, duration and shadow as a CSS custom property. Every
component stylesheet in the package references `var(--cg-*)` and nothing else — and so does
the prototype's own `app.css`. You can verify it:

```bash
# no raw hex outside the token file
grep -rn "#[0-9a-fA-F]\{6\}" packages/ui/src apps/prototype/src --include=*.css \
  | grep -v "styles/tokens.css"
```

**The prototype consumes the built package.** `apps/prototype` depends on `@clickguard/ui`
as a workspace package and imports it by name:

```ts
import { DataTable, VerdictBox, JourneyTimeline } from "@clickguard/ui";
import "@clickguard/ui/styles.css";
```

It resolves to `packages/ui/dist/` — a real Vite library build plus generated `.d.ts` — not
to source. `npm run build` builds the package first for exactly that reason. Delete the
package and the app stops compiling.

**Product constants live in the system.** `BLOCK_THRESHOLD = 70` and the `statusTone` map
(which status gets which colour) are exported from `@clickguard/ui`, because three separate
components draw the threshold and three render status colour. If they disagreed, the screen
would be lying to the customer.

### Components

| Component | What it carries |
|---|---|
| `VerdictBox` | The one-sentence explanation. Four tones, plus a `note` slot where the product admits a sync failed. |
| `JourneyTimeline` | Every arrival as a score bar against the block threshold, with the crossing visit marked and long runs collapsible. |
| `SignalTable` | The evidence ledger: what happened / what a typical visitor does / points. Includes the counter-evidence row. |
| `ThreatBar` | Score as a bar plus 2–4 plain words. Hides its number by default. |
| `DataTable` | Sorting, row selection, drill-down state, loading skeleton, empty slot. |
| `PlatformSyncStatus` | Whether the exclusion actually landed in Google Ads / Meta Ads. |
| `StatusPill` | Always a word plus a colour. Resolves its own tone from `statusTone`. |
| `MetricCard`, `FilterChip`, `Button`, `Drawer`, `ConfirmDialog`, `EmptyState`, `Toast`, `Checkbox`, `SearchInput` | Supporting primitives. |

Stories cover states and variants, not just the happy path — including failure states,
edge cases (blocked on the first visit, organic-only, 40-visit journeys), and a few that
exist purely to document a decision (`ThreatBar → Why the number is hidden`).

---

## What's interactive in the prototype

- **Sorting** on all six columns, three-state arrows, tabular figures so a sorted column doesn't shimmer.
- **Filtering** by search (IP, city, country, connection type, threat label), status, "cost me money", and platform. Chips carry live counts and disable at zero.
- **Drill-down** into a side drawer; the source row keeps an accent rail so you never lose it.
- **Bulk select and act**, with select-all scoped to visible rows only.
- **Block / unblock / mark safe / retry sync**, each with a toast carrying **Undo**.
- **Unblock confirmation** that states what it will cost.
- **Keyboard**: `Esc` closes the drawer (dialog first if one is open), `↑`/`↓` move between visitors without closing it, `Enter`/`Space` open a focused row.
- **Long journeys collapse** to the visits that carry the argument, expandable in place.

### Seeing the edge states

The top bar has a dashed **Prototype state** switcher — scaffolding, marked as such so it
isn't mistaken for a feature. It reaches:

| State | What it shows |
|---|---|
| Live data (22 visitors) | The full dataset |
| Loading | Skeleton rows |
| New account — nothing seen yet | Empty state, with counts and chips zeroed too |
| Filters match nothing | No-results state with a named search term |

### The mock data

22 visitors, hand-authored, covering: nine clear click-farm and automation cases, four
genuinely ambiguous ones, five ordinary customers, two pieces of **legitimate** automation
(Googlebot and Meta's ad-review crawler — both protected from blocking), one the customer
already overrode, and three with sync trouble including a failed Meta token.

`scripts/check-data.mjs` asserts the data actually obeys the mechanics in the brief:
journeys run forward in time and never into the future, only paid visits cost money, the
threshold crossing is the first visit at or over 70, a blocked visitor is on at least one
exclusion list, and — the one that caught real bugs — **the evidence ledger sums to the
score the drawer is explaining.**

```bash
npm run check:data
```

---

## Deploying

Both builds are static — no environment variables, no backend, no server-side rendering —
so every option below is free, permanently, at this scale.

### Option A — GitHub Pages, deployed manually (what this repo uses)

```bash
npm run deploy
```

One command. It builds `@clickguard/ui`, the prototype and Storybook, validates the mock
data, assembles everything into `_site/`, and force-pushes that to the `gh-pages` branch
via a git worktree. `main` stays source-only, so anyone reading the repository sees code
rather than build output.

```
https://<user>.github.io/<repo>/             → prototype
https://<user>.github.io/<repo>/storybook/   → Storybook
```

**First time only**, in the repository: **Settings → Pages → Source → "Deploy from a
branch" → `gh-pages` / (root)**. The repo must be public for free Pages hosting. After
that, every later deploy is just `npm run deploy` again.

Free and unlimited for public repos, and no CI to configure.

### Option B — Vercel or Cloudflare Pages (two separate URLs)

Nicer if you want the prototype and Storybook on distinct domains. Create **two projects
from the same repository**; neither needs a config file, and both use the repo root.

| | Build command | Output directory |
|---|---|---|
| **Prototype** | `npm run build` | `apps/prototype/dist` |
| **Storybook** | `npm run build:storybook` | `packages/ui/storybook-static` |

- **Vercel** — Hobby tier, free. Framework Preset *Other*.
- **Cloudflare Pages** — free with unlimited bandwidth. Set `NODE_VERSION=20`.
- **Netlify** — free tier (100 GB/month). Base directory blank.

### Option C — Chromatic, for Storybook only

`npx chromatic --project-token=<token>` publishes the Storybook and gives it a permanent
URL, plus visual-regression diffs per commit. Free tier covers this comfortably. Pair it
with any of the above for the prototype.

**Relative paths.** The prototype's Vite config sets `base: "./"` and Storybook emits
relative URLs by default, so both work from a subdirectory (`/storybook/`) as well as from
a domain root. Don't remove that `base` setting.
