import { useId } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";
import "./Pagination.css";

export interface PaginationProps {
  /** 1-based. */
  page: number;
  pageSize: number;
  total: number;
  onPageChange(page: number): void;
  /** Omit to hide the rows-per-page control. */
  pageSizeOptions?: number[];
  onPageSizeChange?(pageSize: number): void;
  /** Plural noun for the range label: "Showing 1–10 of 16 visitors". */
  itemLabel?: string;
  className?: string;
}

type PageToken = number | "gap-start" | "gap-end";

/**
 * Which page buttons to show. Every page up to seven; beyond that the first,
 * the last, and a window around the current page, with gaps between — so the
 * control never grows wider than about nine slots however long the list is.
 */
export function pageTokens(current: number, count: number): PageToken[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);

  const tokens: PageToken[] = [1];
  let start = Math.max(2, current - 1);
  let end = Math.min(count - 1, current + 1);

  // Near either end, widen the window so the control keeps a steady width.
  if (current <= 3) end = 4;
  if (current >= count - 2) start = count - 3;

  if (start > 2) tokens.push("gap-start");
  for (let p = start; p <= end; p++) tokens.push(p);
  if (end < count - 1) tokens.push("gap-end");
  tokens.push(count);
  return tokens;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
  itemLabel = "items",
  className,
}: PaginationProps) {
  const sizeId = useId();
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const first = total === 0 ? 0 : (current - 1) * pageSize + 1;
  const last = Math.min(current * pageSize, total);

  return (
    <nav className={cx("cg-pagination", className)} aria-label="Pagination">
      <span className="cg-pagination__range" aria-live="polite">
        {total === 0 ? (
          <>No {itemLabel}</>
        ) : (
          <>
            Showing <b>{first}–{last}</b> of <b>{total}</b> {itemLabel}
          </>
        )}
      </span>

      {pageSizeOptions && onPageSizeChange && (
        <span className="cg-pagination__size">
          <label htmlFor={sizeId}>Rows per page</label>
          <select
            id={sizeId}
            className="cg-pagination__select"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </span>
      )}

      <ul
        className={cx(
          "cg-pagination__pages",
          !(pageSizeOptions && onPageSizeChange) && "cg-pagination__pages--end",
        )}
      >
        <li>
          <button
            type="button"
            className="cg-pagination__btn cg-pagination__btn--step"
            onClick={() => onPageChange(current - 1)}
            disabled={current <= 1}
            aria-label="Previous page"
          >
            <Icon name="chevronLeft" size="sm" />
          </button>
        </li>

        {pageTokens(current, pageCount).map((token) =>
          typeof token === "number" ? (
            <li key={token}>
              <button
                type="button"
                className="cg-pagination__btn"
                aria-current={token === current ? "page" : undefined}
                aria-label={`Page ${token} of ${pageCount}`}
                onClick={() => token !== current && onPageChange(token)}
              >
                {token}
              </button>
            </li>
          ) : (
            <li key={token} className="cg-pagination__gap" aria-hidden="true">
              …
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            className="cg-pagination__btn cg-pagination__btn--step"
            onClick={() => onPageChange(current + 1)}
            disabled={current >= pageCount}
            aria-label="Next page"
          >
            <Icon name="chevronRight" size="sm" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
