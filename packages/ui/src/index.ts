/**
 * @clickguard/ui — the ClickGuard design system.
 *
 * Importing this module pulls in the token layer and every component
 * stylesheet, so a consumer only ever needs:
 *
 *   import { DataTable, StatusPill } from "@clickguard/ui";
 *   import "@clickguard/ui/styles.css";
 */

import "./styles/tokens.css";
import "./styles/base.css";

export * from "./tokens";
export { cx } from "./utils/cx";

export { Icon, IconBadge, ICON_NAMES } from "./components/Icon/Icon";
export type {
  IconProps,
  IconBadgeProps,
  IconName,
  IconSize,
  IconTone,
} from "./components/Icon/Icon";

export { Button } from "./components/Button/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button/Button";

export { StatusPill } from "./components/StatusPill/StatusPill";
export type { StatusPillProps } from "./components/StatusPill/StatusPill";

export { ThreatBar } from "./components/ThreatBar/ThreatBar";
export type { ThreatBarProps } from "./components/ThreatBar/ThreatBar";

export { FilterChip } from "./components/FilterChip/FilterChip";
export type { FilterChipProps } from "./components/FilterChip/FilterChip";

export { MetricCard } from "./components/MetricCard/MetricCard";
export type { MetricCardProps } from "./components/MetricCard/MetricCard";

export { Checkbox } from "./components/Checkbox/Checkbox";
export type { CheckboxProps } from "./components/Checkbox/Checkbox";

export { SearchInput } from "./components/SearchInput/SearchInput";
export type { SearchInputProps } from "./components/SearchInput/SearchInput";

export { DataTable } from "./components/DataTable/DataTable";
export type {
  DataTableProps,
  DataTableColumn,
  SortState,
  SortDirection,
} from "./components/DataTable/DataTable";

export { VerdictBox } from "./components/VerdictBox/VerdictBox";
export type { VerdictBoxProps } from "./components/VerdictBox/VerdictBox";

export { JourneyTimeline } from "./components/JourneyTimeline/JourneyTimeline";
export type {
  JourneyTimelineProps,
  JourneyOrder,
  JourneyItem,
  JourneyVisit,
  JourneyGap,
} from "./components/JourneyTimeline/JourneyTimeline";

export { SignalTable } from "./components/SignalTable/SignalTable";
export type { SignalTableProps, Signal } from "./components/SignalTable/SignalTable";

export { PlatformSyncStatus, SYNC_LABEL } from "./components/PlatformSyncStatus/PlatformSyncStatus";
export type {
  PlatformSyncStatusProps,
  PlatformSync,
  SyncState,
} from "./components/PlatformSyncStatus/PlatformSyncStatus";

export { Drawer, DrawerCloseButton } from "./components/Drawer/Drawer";
export type { DrawerProps } from "./components/Drawer/Drawer";

export { Modal, ModalSuccess } from "./components/Modal/Modal";
export type { ModalProps, ModalSuccessProps } from "./components/Modal/Modal";

export { ConfirmDialog } from "./components/ConfirmDialog/ConfirmDialog";
export type { ConfirmDialogProps } from "./components/ConfirmDialog/ConfirmDialog";

export { TextArea } from "./components/TextArea/TextArea";
export type { TextAreaProps } from "./components/TextArea/TextArea";

export { ReportDialog } from "./components/ReportDialog/ReportDialog";
export type { ReportDialogProps, ReportPhase } from "./components/ReportDialog/ReportDialog";

export {
  DateRangePicker,
  DEFAULT_PRESETS,
  presetRange,
  matchPreset,
} from "./components/DateRangePicker/DateRangePicker";
export type {
  DateRangePickerProps,
  DateRangePreset,
  DateRange,
} from "./components/DateRangePicker/DateRangePicker";
export {
  addDays,
  addMonths,
  daysBetween,
  formatDay,
  formatDayLong,
  formatRange,
  isCompleteRange,
  isSameDay,
  isWithin,
  rangesOverlap,
  startOfDay,
} from "./components/DateRangePicker/dates";

export { EmptyState } from "./components/EmptyState/EmptyState";
export type { EmptyStateProps } from "./components/EmptyState/EmptyState";

export { ToastRegion } from "./components/Toast/Toast";
export type { ToastRegionProps, ToastItem } from "./components/Toast/Toast";
