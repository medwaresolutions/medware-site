"use client";

/* Medware Design System — Material Design 3 primitives, ported to TSX.
 * Markup mirrors _ds_bundle.js; styling lives in src/styles/m3/components.css. */

import React, { useEffect, useId, useState } from "react";

/* ---------- Icon ---------- */
export function Icon({
  name,
  filled = false,
  size,
  className = "",
  style,
}: {
  name: string;
  filled?: boolean;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`material-symbols-rounded ${filled ? "msr--fill" : ""} ${className}`.trim()}
      style={{ ...(size ? { fontSize: size } : null), ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

/* ---------- Button ---------- */
type ButtonVariant = "filled" | "tonal" | "elevated" | "outlined" | "text";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  trailingIcon?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({
  variant = "filled",
  size = "medium",
  icon,
  trailingIcon,
  disabled = false,
  href,
  target,
  rel,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  const sizeClass = size === "small" ? "mdc-btn--sm" : size === "large" ? "mdc-btn--lg" : "";
  const cls = `mdc-btn mdc-btn--${variant} ${sizeClass} ${className}`.trim();
  const content = (
    <>
      {icon ? <span className="mdc-btn__icon material-symbols-rounded">{icon}</span> : null}
      {children ? <span className="mdc-btn__label">{children}</span> : null}
      {trailingIcon ? <span className="mdc-btn__icon material-symbols-rounded">{trailingIcon}</span> : null}
    </>
  );
  if (href && !disabled) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={cls}
        {...(rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }
  return (
    <button className={cls} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}

/* ---------- Icon button ---------- */
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: "standard" | "filled" | "tonal" | "outlined";
  selected?: boolean;
}

export function IconButton({
  icon,
  variant = "standard",
  selected = false,
  disabled = false,
  className = "",
  ...rest
}: IconButtonProps) {
  const cls = `mdc-iconbtn mdc-iconbtn--${variant} ${selected ? "mdc-iconbtn--on" : ""} ${className}`.trim();
  return (
    <button className={cls} disabled={disabled} aria-pressed={selected} {...rest}>
      <span className="material-symbols-rounded">{icon}</span>
    </button>
  );
}

/* ---------- Chip ---------- */
interface ChipProps {
  label?: React.ReactNode;
  children?: React.ReactNode;
  leadingIcon?: string;
  trailingIcon?: string;
  selected?: boolean;
  elevated?: boolean;
  onRemove?: () => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
}

export function Chip({
  label,
  children,
  leadingIcon,
  trailingIcon,
  selected = false,
  elevated = false,
  onRemove,
  onClick,
  className = "",
  style,
}: ChipProps) {
  const cls = `mdc-chip ${elevated ? "mdc-chip--elevated" : ""} ${selected ? "mdc-chip--on" : ""} ${className}`.trim();
  return (
    <button className={cls} onClick={onClick} aria-pressed={selected} style={style}>
      {selected ? (
        <span className="mdc-chip__lead material-symbols-rounded">check</span>
      ) : leadingIcon ? (
        <span className="mdc-chip__lead material-symbols-rounded">{leadingIcon}</span>
      ) : null}
      <span>{label || children}</span>
      {onRemove ? (
        <span
          className="mdc-chip__trail material-symbols-rounded"
          role="button"
          aria-label="Remove"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          close
        </span>
      ) : trailingIcon ? (
        <span className="mdc-chip__trail material-symbols-rounded">{trailingIcon}</span>
      ) : null}
    </button>
  );
}

/* ---------- Card ---------- */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "elevated" | "filled" | "outlined";
  interactive?: boolean;
}

export function Card({ variant = "elevated", interactive = false, children, className = "", ...rest }: CardProps) {
  const cls = `mdc-card mdc-card--${variant} ${interactive ? "mdc-card--interactive" : ""} ${className}`.trim();
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  );
}

/* ---------- List ---------- */
export function List({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mdc-list ${className}`.trim()} role="list">
      {children}
    </div>
  );
}

interface ListItemProps {
  headline: React.ReactNode;
  supportingText?: React.ReactNode;
  leadingIcon?: string;
  avatar?: string;
  trailing?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ListItem({ headline, supportingText, leadingIcon, avatar, trailing, onClick, className = "" }: ListItemProps) {
  const cls = `mdc-li ${onClick ? "mdc-li--button" : ""} ${supportingText ? "mdc-li--two" : ""} ${className}`.trim();
  const inner = (
    <>
      {avatar ? (
        <span className="mdc-li__avatar">
          {typeof avatar === "string" && avatar.length <= 2 ? avatar : <img src={avatar} alt="" />}
        </span>
      ) : null}
      {leadingIcon ? <span className="mdc-li__lead material-symbols-rounded">{leadingIcon}</span> : null}
      <span className="mdc-li__text">
        <span className="mdc-li__headline" style={{ display: "block" }}>
          {headline}
        </span>
        {supportingText ? (
          <span className="mdc-li__support" style={{ display: "block" }}>
            {supportingText}
          </span>
        ) : null}
      </span>
      {trailing ? <span className="mdc-li__trail">{trailing}</span> : null}
    </>
  );
  if (onClick) {
    return (
      <button className={cls} onClick={onClick} role="listitem">
        {inner}
      </button>
    );
  }
  return (
    <div className={cls} role="listitem">
      {inner}
    </div>
  );
}

export function ListDivider() {
  return <hr className="mdc-list__divider" />;
}

/* ---------- Tabs ---------- */
interface TabDef {
  value: string;
  label: string;
  icon?: string;
}

export function Tabs({
  tabs = [],
  value,
  onChange,
  variant = "primary",
  inlineIcon = false,
  className = "",
}: {
  tabs: TabDef[];
  value: string;
  onChange?: (v: string) => void;
  variant?: "primary" | "secondary";
  inlineIcon?: boolean;
  className?: string;
}) {
  const idx = Math.max(
    0,
    tabs.findIndex((t) => t.value === value),
  );
  const w = tabs.length ? 100 / tabs.length : 100;
  return (
    <div className={`mdc-tabs mdc-tabs--${variant} ${className}`.trim()} role="tablist">
      {tabs.map((t) => {
        const on = t.value === value;
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={on}
            className={`mdc-tab ${inlineIcon ? "mdc-tab--row" : ""} ${on ? "mdc-tab--on" : ""}`.trim()}
            onClick={() => onChange && onChange(t.value)}
          >
            {t.icon ? <span className="material-symbols-rounded">{t.icon}</span> : null}
            <span>{t.label}</span>
          </button>
        );
      })}
      <span className="mdc-tab__rail" style={{ width: `${w}%`, transform: `translateX(${idx * 100}%)` }} />
    </div>
  );
}

/* ---------- Linear progress ---------- */
export function LinearProgress({ value, className = "" }: { value?: number; className?: string }) {
  const indet = value === undefined || value === null;
  return (
    <div className={`mdc-linear ${indet ? "mdc-linear--indet" : ""} ${className}`.trim()} role="progressbar">
      <div className="mdc-linear__bar" style={indet ? undefined : { width: `${value}%` }} />
    </div>
  );
}

/* ---------- Badge ---------- */
export function Badge({
  count,
  max = 999,
  children,
  className = "",
}: {
  count?: number;
  max?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const dot = count === undefined || count === null;
  const display = !dot && count! > max ? `${max}+` : count;
  const badge = (
    <span
      className={`mdc-badge ${dot ? "mdc-badge--dot" : "mdc-badge--num"} ${children ? "" : "mdc-badge--inline"} ${className}`.trim()}
    >
      {!dot && display}
    </span>
  );
  if (!children) return badge;
  return (
    <span className="mdc-badge-anchor">
      {children}
      {badge}
    </span>
  );
}

/* ---------- Dialog ---------- */
export function Dialog({
  open,
  onClose,
  icon,
  headline,
  children,
  actions,
  className = "",
}: {
  open: boolean;
  onClose?: () => void;
  icon?: string;
  headline?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <>
      <div className="mdc-scrim" onClick={onClose} />
      <div className={`mdc-dialog ${icon ? "mdc-dialog--icon" : ""} ${className}`.trim()} role="dialog" aria-modal="true">
        {icon ? (
          <div className="mdc-dialog__icon">
            <span className="material-symbols-rounded">{icon}</span>
          </div>
        ) : null}
        {headline ? <h2 className="mdc-dialog__headline">{headline}</h2> : null}
        <div className="mdc-dialog__body">{children}</div>
        {actions ? <div className="mdc-dialog__actions">{actions}</div> : null}
      </div>
    </>
  );
}

/* ---------- Text field ---------- */
interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  variant?: "filled" | "outlined";
  label?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leadingIcon?: string;
  trailingIcon?: string;
  supportingText?: string;
  error?: boolean;
  type?: string;
}

export function TextField({
  variant = "filled",
  label,
  value,
  defaultValue,
  onChange,
  leadingIcon,
  trailingIcon,
  supportingText,
  error = false,
  type = "text",
  className = "",
  ...rest
}: TextFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const [inner, setInner] = useState(defaultValue || "");
  const val = value !== undefined ? value : inner;
  const float = focused || (val !== undefined && String(val).length > 0);
  const cls = `mdc-tf mdc-tf--${variant} ${leadingIcon ? "mdc-tf--lead" : ""} ${float ? "is-float" : ""} ${focused ? "is-focus" : ""} ${error ? "is-error" : ""} ${className}`.trim();
  return (
    <div className={cls}>
      <div className="mdc-tf__box">
        {leadingIcon ? <span className="mdc-tf__icon material-symbols-rounded">{leadingIcon}</span> : null}
        {label ? (
          <label className="mdc-tf__label" htmlFor={id}>
            {label}
          </label>
        ) : null}
        <input
          id={id}
          className="mdc-tf__input"
          type={type}
          value={val}
          onChange={(e) => {
            setInner(e.target.value);
            onChange && onChange(e);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {trailingIcon ? <span className="mdc-tf__icon material-symbols-rounded">{trailingIcon}</span> : null}
      </div>
      {supportingText ? (
        <div className="mdc-tf__support">
          <span>{supportingText}</span>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Snackbar ---------- */
export function Snackbar({
  open = true,
  message,
  action,
  onAction,
  onClose,
  showClose = false,
  className = "",
}: {
  open?: boolean;
  message: React.ReactNode;
  action?: string;
  onAction?: () => void;
  onClose?: () => void;
  showClose?: boolean;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div className={`mdc-snackbar ${className}`.trim()} role="status">
      <span className="mdc-snackbar__label">{message}</span>
      {action ? (
        <button className="mdc-snackbar__action" onClick={onAction}>
          {action}
        </button>
      ) : null}
      {showClose ? (
        <button className="mdc-snackbar__close" aria-label="Dismiss" onClick={onClose}>
          <span className="material-symbols-rounded">close</span>
        </button>
      ) : null}
    </div>
  );
}

/* ---------- Status pill (marketing) ---------- */
const STATUS_ROLE: Record<string, "primary" | "secondary" | "tertiary" | "neutral"> = {
  live: "primary",
  rollout: "secondary",
  soon: "secondary",
  final: "tertiary",
  building: "tertiary",
  internal: "tertiary",
  projected: "neutral",
  tba: "neutral",
};

export function StatusPill({ type, label }: { type: string; label: string }) {
  const role = STATUS_ROLE[type] ?? "neutral";
  const neutral = role === "neutral";
  const bg = neutral ? "var(--md-sys-color-surface-container-highest)" : `var(--md-sys-color-${role}-container)`;
  const fg = neutral ? "var(--md-sys-color-on-surface-variant)" : `var(--md-sys-color-on-${role}-container)`;
  const dot = neutral ? "var(--md-sys-color-outline)" : `var(--md-sys-color-${role})`;
  return (
    <span className="mw-status-pill" style={{ background: bg, color: fg }}>
      <span className="mw-status-pill__dot" style={{ background: dot }} />
      {label}
    </span>
  );
}
