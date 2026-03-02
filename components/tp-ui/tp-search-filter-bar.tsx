"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { SearchNormal1, ArrowDown2, CloseCircle } from "iconsax-react"
import { cn } from "@/lib/utils"

/**
 * TPSearchFilterBar — Combined search input + filter dropdowns.
 *
 * Tokens:
 *   Search input     TP Slate 50 bg, TP Slate 200 border, 10px radius, 42px height
 *   Filter button    TP Slate 0 bg, TP Slate 200 border, 10px radius, 36px height
 *   Search icon      20px, TP Slate 400
 *   Chevron icon     16px, TP Slate 400
 *   Gap              8px between elements
 *   Focus border     2px TP Blue 500 + 3px ring TP Blue 500/20
 *   Responsive       Filters stack below search on < 1024px
 */

interface FilterOption {
  id: string
  label: string
  options: Array<{ value: string; label: string }>
  selectedValue?: string
}

interface TPSearchFilterBarProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  filters?: FilterOption[]
  onFilterChange?: (filterId: string, value: string) => void
  /** Right-side actions (e.g., "Add Appointment" button) */
  actions?: React.ReactNode
  className?: string
}

export function TPSearchFilterBar({
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  filters = [],
  onFilterChange,
  actions,
  className,
}: TPSearchFilterBarProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* Search input */}
      <div className="relative flex-1 min-w-[200px]">
        <SearchNormal1
          size={18}
          variant="Linear"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-tp-slate-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className={cn(
            "h-[42px] w-full rounded-[10px] border border-tp-slate-200 bg-tp-slate-50 pl-10 pr-9 text-sm text-tp-slate-900",
            "placeholder:text-tp-slate-400",
            "focus:border-tp-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20",
            "transition-colors",
          )}
        />
        {searchValue && (
          <button
            type="button"
            onClick={() => onSearchChange?.("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-tp-slate-400 hover:text-tp-slate-600 transition-colors"
            aria-label="Clear search"
          >
            <CloseCircle size={16} variant="Bold" />
          </button>
        )}
      </div>

      {/* Filter dropdowns */}
      {filters.map((filter) => (
        <FilterDropdown
          key={filter.id}
          filter={filter}
          onFilterChange={onFilterChange}
        />
      ))}

      {/* Actions */}
      {actions && <div className="ml-auto shrink-0">{actions}</div>}
    </div>
  )
}

// ─── Filter Dropdown ────────────────────────────────────────

function FilterDropdown({
  filter,
  onFilterChange,
}: {
  filter: FilterOption
  onFilterChange?: (filterId: string, value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  const selectedOption = filter.options.find((o) => o.value === filter.selectedValue)
  const displayLabel = selectedOption?.value && selectedOption.value !== "all"
    ? selectedOption.label
    : filter.label

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-tp-slate-200 bg-white px-3 text-xs font-medium transition-colors",
          filter.selectedValue && filter.selectedValue !== "all"
            ? "text-tp-blue-600 border-tp-blue-200 bg-tp-blue-50"
            : "text-tp-slate-600 hover:border-tp-slate-300 hover:bg-tp-slate-50",
        )}
      >
        <span className="truncate max-w-[120px]">{displayLabel}</span>
        <ArrowDown2
          size={14}
          variant="Linear"
          className={cn("shrink-0 text-tp-slate-400 transition-transform", open && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 min-w-[180px] overflow-hidden rounded-xl border border-tp-slate-200 bg-white py-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          {filter.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onFilterChange?.(filter.id, option.value)
                setOpen(false)
              }}
              className={cn(
                "flex w-full items-center px-3 py-2 text-xs transition-colors",
                filter.selectedValue === option.value
                  ? "bg-tp-blue-50 text-tp-blue-700 font-semibold"
                  : "text-tp-slate-600 hover:bg-tp-slate-50",
              )}
            >
              <span className="flex-1 text-left">{option.label}</span>
              {filter.selectedValue === option.value && (
                <svg className="h-3.5 w-3.5 text-tp-blue-500" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
