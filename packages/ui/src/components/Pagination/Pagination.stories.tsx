import { useState, type ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Primitives/Pagination",
  component: Pagination,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Range label, rows-per-page, and page buttons. The current page uses the system's one selection treatment — solid ink, like a checked checkbox or an active filter. Beyond seven pages it shows the first, the last and a window around the current page, so the control never grows wider than about nine slots.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

function Frame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        maxWidth: 820,
        padding: "var(--cg-space-10) var(--cg-space-16)",
        background: "var(--cg-surface-1)",
        border: "1px solid var(--cg-border)",
        borderRadius: "var(--cg-radius-lg)",
        display: "flex",
      }}
    >
      {children}
    </div>
  );
}

function Interactive({ total, initialPage = 1, initialSize = 10 }: { total: number; initialPage?: number; initialSize?: number }) {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  return (
    <Frame>
      <Pagination
        page={page}
        pageSize={size}
        total={total}
        onPageChange={setPage}
        pageSizeOptions={[10, 25, 50]}
        onPageSizeChange={(n) => {
          setSize(n);
          setPage(1);
        }}
        itemLabel="visitors"
      />
    </Frame>
  );
}

export const TwoPages: Story = {
  name: "Two pages — the prototype's default view",
  render: () => <Interactive total={16} />,
};

export const ManyPages: Story = {
  name: "Many pages — gaps keep it compact",
  render: () => (
    <div className="sb-stack" style={{ maxWidth: "none" }}>
      <Interactive total={480} initialPage={12} />
      <p className="sb-note">
        Forty-eight pages at 10 rows. The first and last pages are always one click
        away; the current page sits in a window of its neighbours, and everything
        else collapses into an ellipsis. Step through to the ends to see the window
        widen so the control keeps a steady width.
      </p>
    </div>
  ),
};

export const FirstPage: Story = {
  name: "Edge case — first page (Previous disabled)",
  render: () => <Interactive total={120} initialPage={1} />,
};

export const LastPage: Story = {
  name: "Edge case — last page (Next disabled, short final page)",
  render: () => <Interactive total={123} initialPage={13} />,
};

export const SinglePage: Story = {
  name: "Edge case — everything fits on one page",
  render: () => <Interactive total={7} />,
};

export const WithoutPageSize: Story = {
  name: "Without the rows-per-page control",
  render: () => {
    const [page, setPage] = useState(2);
    return (
      <Frame>
        <Pagination page={page} pageSize={10} total={42} onPageChange={setPage} itemLabel="reports" />
      </Frame>
    );
  },
};
