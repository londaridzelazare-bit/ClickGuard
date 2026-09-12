import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { cx } from "../../utils/cx";
import { Button } from "../Button/Button";
import { Icon } from "../Icon/Icon";
import {
  addDays,
  addMonths,
  buildMonthGrid,
  clampDay,
  daysBetween,
  formatMonthYear,
  formatRange,
  isAfterDay,
  isBeforeDay,
  isCompleteRange,
  isSameDay,
  isSameMonth,
  isWithin,
  orderWeekdays,
  startOfDay,
  startOfMonth,
  type DateRange,
} from "./dates";
import "./DateRangePicker.css";

export type { DateRange };

export interface DateRangePreset {
  id: string;
  label: string;
  /** Days back from today, inclusive of today. `null` means all time. */
  days: number | null;
}

export const DEFAULT_PRESETS: DateRangePreset[] = [
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "14d", label: "Last 14 days", days: 14 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "90d", label: "Last 90 days", days: 90 },
  { id: "all", label: "All time", days: null },
];

export function presetRange(preset: DateRangePreset, today: Date): DateRange {
  if (preset.days === null) return { start: null, end: null };
  const end = startOfDay(today);
  return { start: addDays(end, -(preset.days - 1)), end };
}

/** Which preset, if any, a committed range corresponds to. */
export function matchPreset(
  range: DateRange,
  presets: DateRangePreset[],
  today: Date,
): DateRangePreset | null {
  for (const preset of presets) {
    const candidate = presetRange(preset, today);
    if (isSameDay(candidate.start, range.start) && isSameDay(candidate.end, range.end)) {
      return preset;
    }
    if (preset.days === null && !range.start && !range.end) return preset;
  }
  return null;
}

export interface DateRangePickerProps {
  value: DateRange;
  /** Called only when the user applies — not on every click inside the panel. */
  onChange(next: DateRange): void;
  /** "Today" is pinned in this prototype so the screen is reproducible. */
  today: Date;
  minDate?: Date;
  presets?: DateRangePreset[];
  /** Controlled open state. Storybook uses it to document the open panel. */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?(open: boolean): void;
  align?: "start" | "end";
  /** Reset returns to this preset. Defaults to the 30-day preset if present. */
  resetPresetId?: string;
  className?: string;
  triggerLabel?: (range: DateRange, preset: DateRangePreset | null) => string;
}

export function DateRangePicker({
  value,
  onChange,
  today,
  minDate,
  presets = DEFAULT_PRESETS,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  align = "end",
  resetPresetId = "30d",
  className,
  triggerLabel,
}: DateRangePickerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const maxDate = startOfDay(today);

  /* Draft lives inside the panel. Nothing reaches the page until Apply, so a
     half-made selection can never filter the table out from under the user. */
  const [draft, setDraft] = useState<DateRange>(value);
  const [hovered, setHovered] = useState<Date | null>(null);
  /**
   * The two visible months are [anchor − 1, anchor], so the month containing
   * the range's end sits on the right. Anchoring the other way around would
   * open the picker showing a month that is entirely in the future.
   */
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    addMonths(startOfMonth(value.end ?? maxDate), -1),
  );
  const [focusedDay, setFocusedDay] = useState<Date>(() => startOfDay(value.end ?? maxDate));

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldFocusDay = useRef(false);

  /** Points the two calendars at `date`, with its month on the right. */
  const anchorView = useCallback((date: Date) => {
    setViewMonth(addMonths(startOfMonth(date), -1));
    setFocusedDay(startOfDay(date));
  }, []);

  /* Re-seed the draft each time the panel opens, so Cancel is always a true
     revert to whatever is currently applied. */
  useEffect(() => {
    if (!open) return;
    setDraft(value);
    setHovered(null);
    anchorView(value.end ?? maxDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = useCallback(
    (restoreFocus = true) => {
      setOpen(false);
      if (restoreFocus) triggerRef.current?.focus();
    },
    [setOpen],
  );

  /* Escape closes without applying; so does a click outside. */
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    }
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) close(false);
    }

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open, close]);

  /* Keep the focused day on screen. Stepping off the left edge scrolls the
     pair back by one month; stepping off the right edge scrolls forward — so
     arrow-key navigation moves the calendar the way the user is travelling
     rather than jumping a whole pair. */
  useEffect(() => {
    if (!open) return;
    const left = viewMonth;
    const right = addMonths(viewMonth, 1);
    if (isSameMonth(focusedDay, left) || isSameMonth(focusedDay, right)) return;
    setViewMonth(
      isBeforeDay(focusedDay, left)
        ? startOfMonth(focusedDay)
        : addMonths(startOfMonth(focusedDay), -1),
    );
  }, [focusedDay, viewMonth, open]);

  useEffect(() => {
    if (!open || !shouldFocusDay.current) return;
    shouldFocusDay.current = false;
    panelRef.current
      ?.querySelector<HTMLButtonElement>(`[data-day="${focusedDay.toDateString()}"]`)
      ?.focus();
  }, [focusedDay, viewMonth, open]);

  const activePreset = useMemo(
    () => matchPreset(value, presets, today),
    [value, presets, today],
  );
  const draftPreset = useMemo(
    () => matchPreset(draft, presets, today),
    [draft, presets, today],
  );

  const label = triggerLabel
    ? triggerLabel(value, activePreset)
    : activePreset && activePreset.days !== null
      ? `${activePreset.label} · ${formatRange(value)}`
      : formatRange(value);

  const isDisabledDay = useCallback(
    (day: Date) =>
      isAfterDay(day, maxDate) || (minDate ? isBeforeDay(day, minDate) : false),
    [maxDate, minDate],
  );

  /**
   * One click at a time. Picking a day before the current start restarts the
   * selection rather than producing an inverted range — invalid ranges are
   * made unreachable instead of validated after the fact.
   */
  function pickDay(day: Date) {
    if (isDisabledDay(day)) return;
    setDraft((current) => {
      if (!current.start || current.end) return { start: day, end: null };
      if (isBeforeDay(day, current.start)) return { start: day, end: null };
      return { start: current.start, end: day };
    });
    setFocusedDay(day);
  }

  function onGridKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const moves: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (event.key in moves) {
      event.preventDefault();
      shouldFocusDay.current = true;
      setFocusedDay((d) => clampDay(addDays(d, moves[event.key]), minDate, maxDate));
      return;
    }
    if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      shouldFocusDay.current = true;
      const delta = event.key === "PageUp" ? -1 : 1;
      setFocusedDay((d) =>
        clampDay(
          new Date(d.getFullYear(), d.getMonth() + delta, d.getDate()),
          minDate,
          maxDate,
        ),
      );
      return;
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      shouldFocusDay.current = true;
      setFocusedDay((d) => {
        const offset = event.key === "Home" ? -d.getDay() : 6 - d.getDay();
        return clampDay(addDays(d, offset), minDate, maxDate);
      });
    }
  }

  const complete = isCompleteRange(draft);
  const dayCount = complete ? daysBetween(draft.start, draft.end) + 1 : 0;
  const allTime = !draft.start && !draft.end;
  const canApply = complete || allTime;

  const resetPreset = presets.find((p) => p.id === resetPresetId) ?? presets[0];

  function apply() {
    onChange({ start: draft.start, end: draft.end });
    close();
  }

  const canGoBack = !minDate || isAfterDay(viewMonth, startOfMonth(minDate));
  const canGoForward = isBeforeDay(addMonths(viewMonth, 1), startOfMonth(maxDate));

  return (
    <div className={cx("cg-drp", className)} ref={rootRef}>
      <Button
        ref={triggerRef}
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Icon name="calendar" size="sm" />
        <span className="cg-drp__trigger-label">{label}</span>
        <Icon name="chevronDown" size="sm" />
      </Button>

      {open && (
        <div
          ref={panelRef}
          className={cx("cg-drp__panel", `cg-drp__panel--${align}`)}
          role="dialog"
          aria-label="Choose a date range"
        >
          <div className="cg-drp__body">
            <div className="cg-drp__presets">
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className="cg-drp__preset"
                  aria-pressed={draftPreset?.id === preset.id}
                  onClick={() => {
                    const next = presetRange(preset, today);
                    setDraft(next);
                    setHovered(null);
                    anchorView(next.end ?? maxDate);
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div
              className="cg-drp__calendars"
              onKeyDown={onGridKeyDown}
              onMouseLeave={() => setHovered(null)}
            >
              {[0, 1].map((offset) => {
                const month = addMonths(viewMonth, offset);
                return (
                  <MonthGrid
                    key={offset}
                    month={month}
                    draft={draft}
                    hovered={hovered}
                    focusedDay={focusedDay}
                    today={maxDate}
                    isDisabledDay={isDisabledDay}
                    onPick={pickDay}
                    onHover={setHovered}
                    showPrev={offset === 0}
                    showNext={offset === 1}
                    canGoBack={canGoBack}
                    canGoForward={canGoForward}
                    onPrev={() => setViewMonth((m) => addMonths(m, -1))}
                    onNext={() => setViewMonth((m) => addMonths(m, 1))}
                  />
                );
              })}
            </div>
          </div>

          <div className="cg-drp__footer">
            <span
              className={cx(
                "cg-drp__summary",
                draft.start && !draft.end && "cg-drp__summary--pending",
              )}
            >
              {allTime ? (
                <strong>All time</strong>
              ) : draft.start && !draft.end ? (
                "Now pick an end date"
              ) : complete ? (
                <>
                  <strong>{formatRange(draft)}</strong> · {dayCount}{" "}
                  {dayCount === 1 ? "day" : "days"}
                </>
              ) : (
                "Pick a start date"
              )}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const next = presetRange(resetPreset, today);
                setDraft(next);
                setHovered(null);
                anchorView(next.end ?? maxDate);
              }}
            >
              Reset
            </Button>
            <Button size="sm" onClick={() => close()}>
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              disabled={!canApply}
              onClick={apply}
              title={canApply ? undefined : "Pick an end date first"}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface MonthGridProps {
  month: Date;
  draft: DateRange;
  hovered: Date | null;
  focusedDay: Date;
  today: Date;
  isDisabledDay(day: Date): boolean;
  onPick(day: Date): void;
  onHover(day: Date | null): void;
  showPrev: boolean;
  showNext: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  onPrev(): void;
  onNext(): void;
}

function MonthGrid({
  month,
  draft,
  hovered,
  focusedDay,
  today,
  isDisabledDay,
  onPick,
  onHover,
  showPrev,
  showNext,
  canGoBack,
  canGoForward,
  onPrev,
  onNext,
}: MonthGridProps) {
  const cells = buildMonthGrid(month, 0);

  /* While only a start is chosen, the hovered day stands in for the end so
     the band previews the range you are about to make. */
  const previewEnd = draft.start && !draft.end && hovered ? hovered : null;
  const bandStart = draft.start;
  const bandEnd = draft.end ?? previewEnd;
  const isPreview = Boolean(previewEnd);

  return (
    <div className="cg-drp__month">
      <div className="cg-drp__month-head">
        <button
          type="button"
          className={cx("cg-drp__nav", !showPrev && "cg-drp__nav--hidden")}
          onClick={onPrev}
          disabled={!showPrev || !canGoBack}
          aria-label="Previous month"
          tabIndex={showPrev ? 0 : -1}
        >
          <Icon name="chevronLeft" size="sm" />
        </button>
        <span className="cg-drp__month-title">{formatMonthYear(month)}</span>
        <button
          type="button"
          className={cx("cg-drp__nav", !showNext && "cg-drp__nav--hidden")}
          onClick={onNext}
          disabled={!showNext || !canGoForward}
          aria-label="Next month"
          tabIndex={showNext ? 0 : -1}
        >
          <Icon name="chevronRight" size="sm" />
        </button>
      </div>

      <div className="cg-drp__weekdays" aria-hidden="true">
        {orderWeekdays(0).map((d, i) => (
          <span className="cg-drp__weekday" key={`${d}-${i}`}>
            {d}
          </span>
        ))}
      </div>

      <div className="cg-drp__grid" role="grid">
        {cells.map((day) => {
          const outside = !isSameMonth(day, month);
          const disabled = isDisabledDay(day);
          const isStart = isSameDay(day, draft.start);
          const isEnd = isSameDay(day, bandEnd);
          const inBand =
            bandStart && bandEnd ? isWithin(day, bandStart, bandEnd) : false;
          const single = Boolean(bandStart && bandEnd && isSameDay(bandStart, bandEnd));
          const edge = isStart || isEnd;

          return (
            <div
              key={day.toISOString()}
              className={cx(
                "cg-drp__cell",
                inBand && !edge && (isPreview ? "cg-drp__cell--preview" : "cg-drp__cell--in-range"),
                edge && !single && (isPreview ? "cg-drp__cell--preview" : "cg-drp__cell--edge"),
                edge && !single && isStart && "cg-drp__cell--start",
                edge && !single && isEnd && "cg-drp__cell--end",
                single && "cg-drp__cell--single",
              )}
            >
              <button
                type="button"
                data-day={day.toDateString()}
                className={cx(
                  "cg-drp__day",
                  outside && "cg-drp__day--outside",
                  isSameDay(day, today) && "cg-drp__day--today",
                  (isStart || isSameDay(day, draft.end)) && "cg-drp__day--selected",
                )}
                disabled={disabled}
                tabIndex={isSameDay(day, focusedDay) ? 0 : -1}
                aria-current={isSameDay(day, today) ? "date" : undefined}
                aria-pressed={isStart || isSameDay(day, draft.end)}
                aria-label={day.toDateString()}
                onClick={() => onPick(day)}
                onMouseEnter={() => onHover(day)}
              >
                {day.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
