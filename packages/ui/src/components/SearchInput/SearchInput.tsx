import { useId, type CSSProperties } from "react";
import { cx } from "../../utils/cx";
import { Icon } from "../Icon/Icon";
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
      <Icon name="search" size="sm" className="cg-search__icon" />
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
          <Icon name="close" size="sm" />
        </button>
      )}
    </div>
  );
}
