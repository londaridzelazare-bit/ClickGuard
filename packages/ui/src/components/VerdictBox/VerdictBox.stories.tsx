import type { Meta, StoryObj } from "@storybook/react";
import { VerdictBox } from "./VerdictBox";

const meta: Meta<typeof VerdictBox> = {
  title: "Threat monitoring/VerdictBox",
  component: VerdictBox,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "The first thing in the drawer and the most important component in the product. It answers *why* in one sentence of plain English before any evidence is shown. Rules: name the behaviour, not the score; say what a normal visitor does instead; never use the words *risk*, *anomaly*, *heuristic* or *confidence*.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof VerdictBox>;

export const Blocked: Story = {
  render: () => (
    <div style={{ maxWidth: 512 }}>
      <VerdictBox status="Blocked" title="Blocked on Google Ads and Meta Ads · Sep 9, 14:32">
        A datacenter server clicked your ads 4 times in 9 minutes, never scrolled, and
        never converted. That pattern doesn&rsquo;t come from a person.
      </VerdictBox>
    </div>
  ),
};

export const Flagged: Story = {
  render: () => (
    <div style={{ maxWidth: 512 }}>
      <VerdictBox status="Flagged" title="Flagged, not blocked · Watching since Sep 10">
        Looks like repeat clicking, but it filled in your contact form on visit 4.
        We&rsquo;re holding off until we see one more paid click without a real action.
      </VerdictBox>
    </div>
  ),
};

export const Clean: Story = {
  render: () => (
    <div style={{ maxWidth: 512 }}>
      <VerdictBox status="Clean" title="Clean · Nothing to block">
        One ad click, two minutes on pricing, back the next day from search.
        That&rsquo;s what a real prospect looks like.
      </VerdictBox>
    </div>
  ),
};

export const Unblocked: Story = {
  render: () => (
    <div style={{ maxWidth: 512 }}>
      <VerdictBox status="Unblocked by you" title="Unblocked by you · Sep 8, 11:20">
        We&rsquo;re still watching, but won&rsquo;t block it again unless you ask.
      </VerdictBox>
    </div>
  ),
};

export const WithSyncNote: Story = {
  name: "With a note — admitting a failure",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: 512 }}>
      <VerdictBox
        status="Blocked"
        title="Blocked on Google Ads and Meta Ads · Sep 10, 08:14"
        note="Google Ads hasn't confirmed the block yet. 8 paid clicks came through while we waited; Meta Ads has been blocking since Sep 10."
      >
        A mobile connection in Lagos clicked the same two campaigns 14 times over 4
        days, in sessions under 3 seconds. Six other IPs share this phone&rsquo;s
        fingerprint. That&rsquo;s a click farm, not a customer.
      </VerdictBox>
      <p className="sb-note">
        The note is where the product says something went wrong. It sits inside the
        verdict rather than in a separate banner, because a caveat the user has to
        hunt for reads as a caveat the product tried to hide. Counter-intuitively
        this is the state that earns the most trust: a tool that reports its own
        failures is a tool you can believe when it reports success.
      </p>
    </div>
  ),
};

export const LongSentence: Story = {
  name: "Edge case — long sentence",
  render: () => (
    <div style={{ maxWidth: 512 }}>
      <VerdictBox status="Flagged" title="Flagged, not blocked · Watching since Aug 28">
        This device shows up under three different IPs, which usually means someone is
        hiding where they are. But it browses like a person: long sessions, several
        pages, no burst of clicks, and it has never clicked two ads in the same hour.
        We need a clearer signal before blocking, because blocking a real customer
        costs you more than one wasted click does.
      </VerdictBox>
    </div>
  ),
};
