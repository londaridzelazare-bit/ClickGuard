import type { Signal } from "@clickguard/ui";
import type { SyncState, VisitorStatus } from "@clickguard/ui";

export type TrafficSource = "paid" | "organic";

export type ConnectionType =
  | "Datacenter"
  | "Residential"
  | "Mobile"
  | "VPN"
  | "Tor"
  | "Verified crawler";

export type Platform = "Google Ads" | "Meta Ads";

/** One arrival. The same visitor produces many of these. */
export interface Visit {
  at: Date;
  /** Only `paid` visits cost the advertiser money. */
  source: TrafficSource;
  /** The cumulative score *as of* this visit — it is a running total, not a per-visit grade. */
  score: number;
}

export interface Visitor {
  ip: string;
  connection: ConnectionType;
  city: string;
  country: string;

  status: VisitorStatus;
  /** Two to four plain words. Shown in the table instead of the score. */
  threatLabel: string;

  device: string;
  /** The verdict, in one plain-English sentence. No jargon, no score. */
  sentence: string;

  signals: Signal[];
  favor: Signal;

  visits: Visit[];
  /** 1-based index of the visit that pushed the total over the threshold. */
  crossAt?: number;

  platforms: Platform[];
  sync: Partial<Record<Platform, SyncState>>;
  /** What the product owes the customer when a sync did not go cleanly. */
  syncNote?: string;

  /** Money spent on this visitor's paid clicks before the block landed. */
  spentBefore: number;
  spentClicks: number;
  /** Money that still leaked after the block — non-zero only when a sync lagged. */
  spentSince: number;
  sinceSub: string;
  /** Blocked ad impressions/clicks we stopped since the block landed. */
  stopped: number;
  protectedAmount: number;

  unblockedAt?: string;
  unblockedDay?: string;
}

/** A visitor with everything the table and drawer need pre-computed. */
export interface DerivedVisitor extends Visitor {
  visitCount: number;
  paidCount: number;
  score: number;
  lastSeenAt: Date;
  lastSeenLabel: string;
  minutesSinceLastSeen: number;
  blockedAt: Date | null;
  blockedMain: string;
  blockedSub: string;
  /** Line 1 of the verdict box. */
  verdictTitle: string;
  evidenceTitle: string;
  identity: string;
  syncStates: SyncState[];
  syncPending: boolean;
  syncFailed: boolean;
}
