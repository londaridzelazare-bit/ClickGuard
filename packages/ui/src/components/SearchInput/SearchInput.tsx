import { useId, type CSSProperties } from "react";
import { cx } from "../../utils/cx";
import "./SearchInput.css";

export interface SearchInputProps {
  value: string;
  onValueChange(next: string): void;
  placeholder?: string;
  label?: string;
  width?: number | string;
  className?: string;
  style?: CSSProperties;
}

export function SearchInput({
  value,
  onValueChange,
  placeholder = "Search",
  label = "Search",
  width = 280,
  className,
  style,
}: SearchInputProps) {
  const id = useId();
  return (
    <div className={cx("cg-search", className)} style={{ width, ...style }}>
      <svg className="cg-search__icon" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="4.4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9.4 9.4 12.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <label className="cg-sr-only" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="cg-search__input"
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onValueChange(event.target.value)}
      />
      {value && (
        <button
          type="button"
          className="cg-search__clear"
          aria-label="Clear search"
          onClick={() => onValueChange("")}
        >
          <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" width="8" height="8">
            <path
              d="M2 2 8 8M8 2 2 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
