import { Fragment, type CSSProperties, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { cx } from "../../utils/cx";
import { Checkbox } from "../Checkbox/Checkbox";
import "./DataTable.css";

export type SortDirection = "asc" | "desc";

export interface SortState {
  key: string;
  dir: SortDirection;
}

export interface DataTableColumn<T> {
  key: string;
  label: string;
  /** Any valid grid track: `1.35fr`, `128px`, `minmax(0, 1fr)`. */
  width: string;
  align?: "left" | "right";
  sortable?: boolean;
  render(row: T): ReactNode;
  /** Rendered in the loading skeleton in place of this cell. */
  skeleton?(index: number): ReactNode;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey(row: T): string;

  sort?: SortState;
  onSortChange?(key: string): void;

  /** Adds the leading checkbox column and the select-all header control. */
  selectable?: boolean;
  checkedKeys?: string[];
  /**
   * Same shape as a `useState` setter, and deliberately so: row toggles are
   * emitted as updater functions, so several clicks landing inside one React
   * batch each see the previous selection rather than the one from the last
   * render. Passing a raw array from props would silently drop all but the
   * final click.
   */
  onCheckedChange?: Dispatch<SetStateAction<string[]>>;

  /** The row currently drilled into. Gets the accent rail. */
  activeKey?: string | null;
  onRowActivate?(row: T): void;

  loading?: boolean;
  skeletonRows?: number;

  /** Shown instead of rows when `rows` is empty and not loading. */
  empty?: ReactNode;
  footer?: ReactNode;

  caption?: string;
  className?: string;
  style?: CSSProperties;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  sort,
  onSortChange,
  selectable = false,
  checkedKeys = [],
  onCheckedChange,
  activeKey = null,
  onRowActivate,
  loading = false,
  skeletonRows = 8,
  empty,
  footer,
  caption,
  className,
  style,
}: DataTableProps<T>) {
  const template = [selectable ? "40px" : null, ...columns.map((c) => c.width)]
    .filter(Boolean)
    .join(" ");

  const checkedSet = new Set(checkedKeys);
  const visibleKeys = rows.map(rowKey);
  const checkedVisible = visibleKeys.filter((k) => checkedSet.has(k));
  const allChecked = rows.length > 0 && checkedVisible.length === rows.length;
  const someChecked = checkedVisible.length > 0 && !allChecked;

  function toggleAll() {
    if (!onCheckedChange) return;
    // Select-all applies to what is on screen, not the whole dataset — a
    // filtered view that silently selects hidden rows is how people
    // accidentally unblock 200 visitors.
    onCheckedChange(allChecked ? [] : visibleKeys);
  }

  function toggleRow(key: string) {
    if (!onCheckedChange) return;
    onCheckedChange((current) =>
      current.includes(key) ? current.filter((k) => k !== key) : [...current, key],
    );
  }

  const showEmpty = !loading && rows.length === 0;

  return (
    <div className={cx("cg-table", className)} style={style}>
      {caption && <div className="cg-sr-only">{caption}</div>}

      <div className="cg-table__grid cg-table__head" style={{ gridTemplateColumns: template }}>
        {selectable && (
          <Checkbox
            checked={allChecked}
            indeterminate={someChecked}
            onChange={toggleAll}
            disabled={rows.length === 0}
            aria-label={allChecked ? "Clear selection" : "Select all visible visitors"}
          />
        )}
        {columns.map((col) => {
          const active = sort?.key === col.key;
          const arrow = active ? (sort!.dir === "asc" ? "↑" : "↓") : "↓";
          const content = (
            <>
              {col.label}
              <span
                className={cx("cg-table__arrow", !active && "cg-table__arrow--idle")}
                aria-hidden="true"
              >
                {arrow}
              </span>
            </>
          );
          return (
            <div
              key={col.key}
              className={cx("cg-table__th", col.align === "right" && "cg-table__th--right")}
              aria-sort={active ? (sort!.dir === "asc" ? "ascending" : "descending") : "none"}
            >
              {col.sortable && onSortChange ? (
                <button
                  type="button"
                  className={cx("cg-table__sort", active && "cg-table__sort--active")}
                  onClick={() => onSortChange(col.key)}
                >
                  {content}
                </button>
              ) : (
                <span className="cg-table__th">{col.label}</span>
              )}
            </div>
          );
        })}
      </div>

      {loading &&
        Array.from({ length: skeletonRows }).map((_, i) => (
          <div
            key={`sk-${i}`}
            className="cg-table__grid cg-table__skeleton-row"
            style={{ gridTemplateColumns: template }}
            aria-hidden="true"
          >
            {selectable && (
              <div className="cg-table__bone" style={{ width: 16, height: 16 }} />
            )}
            {columns.map((col) => (
              <Fragment key={col.key}>
                {col.skeleton ? (
                  col.skeleton(i)
                ) : (
                  <div className="cg-table__bone" style={{ height: 10, width: "60%" }} />
                )}
              </Fragment>
            ))}
          </div>
        ))}

      {!loading &&
        rows.map((row) => {
          const key = rowKey(row);
          const isActive = activeKey === key;
          const isChecked = checkedSet.has(key);
          return (
            <div
              key={key}
              role="button"
              tabIndex={0}
              aria-current={isActive ? "true" : undefined}
              data-row-key={key}
              className={cx(
                "cg-table__grid",
                "cg-table__row",
                isActive && "cg-table__row--active",
                isChecked && "cg-table__row--checked",
              )}
              style={{ gridTemplateColumns: template }}
              onClick={() => onRowActivate?.(row)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onRowActivate?.(row);
                }
              }}
            >
              {selectable && (
                <Checkbox
                  checked={isChecked}
                  onChange={() => toggleRow(key)}
                  aria-label={`Select ${key}`}
                />
              )}
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={cx(
                    "cg-table__cell",
                    col.align === "right" && "cg-table__cell--right",
                  )}
                >
                  {col.render(row)}
                </div>
              ))}
            </div>
          );
        })}

      {showEmpty && empty}
      {footer && <div className="cg-table__footer">{footer}</div>}
    </div>
  );
}
