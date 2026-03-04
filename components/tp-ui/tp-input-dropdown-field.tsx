"use client"

import React from "react"
import { ChevronDown } from "lucide-react"

import { TPTooltip } from "./tp-tooltip"

export interface TPInputDropdownFieldProps {
  value: string
  title?: string
  placeholder?: string
  active?: boolean
  hasDropdown?: boolean
  showDropdownToggle?: boolean
  menuOpen?: boolean
  multiline?: boolean
  maxLines?: 1 | 2 | 3
  onToggleMenu?: () => void
  onFocus?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onClick?: (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  inputRef?: (node: HTMLInputElement | HTMLTextAreaElement | null) => void
}

export function TPInputDropdownField({
  value,
  title,
  placeholder,
  active = false,
  hasDropdown = false,
  showDropdownToggle = true,
  menuOpen = false,
  multiline = false,
  maxLines = 2,
  onToggleMenu,
  onFocus,
  onClick,
  onChange,
  onBlur,
  onKeyDown,
  inputRef,
}: TPInputDropdownFieldProps) {
  const fieldClass = [
    "h-[52px] w-full border-0 bg-transparent px-3 py-0",
    "font-['Inter',sans-serif] text-[14px] leading-[20px] text-[#454551]",
    "focus:bg-tp-blue-50/30 focus:outline-none focus:ring-0",
    "relative z-20 rounded-none",
    hasDropdown ? "pr-8" : "",
    multiline
      ? "overflow-hidden whitespace-normal break-words py-[10px] leading-[18px]"
      : "overflow-hidden text-ellipsis whitespace-nowrap",
  ].join(" ")

  return (
    <div className="relative h-[52px]">
      {active ? (
        <span className="pointer-events-none absolute inset-[2px] z-10 rounded-[6px] border border-tp-blue-500 shadow-[0_0_0_2px_rgba(75,74,213,0.16)]" />
      ) : null}

      {multiline ? (
        <textarea
          data-rx-cell-input="true"
          ref={inputRef as React.Ref<HTMLTextAreaElement>}
          value={value}
          title={title}
          rows={maxLines}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          className={fieldClass}
          style={{ maxHeight: `${maxLines * 18 + 20}px`, resize: "none" }}
          onFocus={onFocus}
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      ) : (
        <input
          data-rx-cell-input="true"
          ref={inputRef as React.Ref<HTMLInputElement>}
          value={value}
          title={title}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck={false}
          className={fieldClass}
          onFocus={onFocus}
          onClick={onClick}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      )}

      {hasDropdown && showDropdownToggle ? (
        <TPTooltip title="Use ↑ ↓ to navigate options, press Enter to select" placement="top" arrow>
          <button
            type="button"
            aria-label="Toggle options"
            className="absolute right-[6px] top-1/2 z-10 inline-flex h-[20px] w-[20px] -translate-y-1/2 items-center justify-center text-tp-slate-500"
            onMouseDown={(event) => event.preventDefault()}
            onClick={onToggleMenu}
          >
            <ChevronDown
              size={14}
              strokeWidth={1.5}
              className={`transition-transform duration-150 ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>
        </TPTooltip>
      ) : null}
    </div>
  )
}
