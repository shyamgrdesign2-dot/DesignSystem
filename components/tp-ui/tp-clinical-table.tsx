"use client"

import * as React from "react"
import { useState, useMemo, useCallback, useEffect, useRef } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * TPClinicalTable — Generic data table for clinical listings.
 *
 * Figma reference specs:
 *   Header bg       #F1F1F5 (TP Slate 100)
 *   Header text     Inter Semi Bold 12px, uppercase, #454551
 *   Row bg          white
 *   Row hover       TP Slate 50
 *   Row border      1px TP Slate 100 bottom
 *   Selected bg     TP Blue 50
 *   Checkbox        20px, radius 6px, TP Blue 500 checked
 *   Container       1px TP Slate 200 border, 12px radius
 *   Sort arrows     TP Blue 500 active, TP Slate 300 inactive
 *   Action column   sticky right, floating shadow
 */

// ─── Types ──────────────────────────────────────────────────

interface ClinicalTableColumn<T> {
  id: string
  header: string
  accessor: (row: T) => React.ReactNode
  sortable?: boolean
  sortValue?: (row: T) => string | number
  width?: string | number
  minWidth?: number
  align?: "left" | "center" | "right"
  /** Mark as the sticky action column */
  sticky?: boolean
}

interface TPClinicalTableProps<T> {
  columns: ClinicalTableColumn<T>[]
  data: T[]
  selectedRows?: string[]
  onRowSelect?: (ids: string[]) => void
  onRowClick?: (row: T) => void
  rowKey: (row: T) => string
  emptyMessage?: string
  emptyIcon?: React.ReactNode
  loading?: boolean
  /** Show row selection checkboxes */
  selectable?: boolean
  className?: string
}

// ─── Component ──────────────────────────────────────────────

export function TPClinicalTable<T>({
  columns,
  data,
  selectedRows = [],
  onRowSelect,
  onRowClick,
  rowKey,
  emptyMessage = "No records found",
  emptyIcon,
  loading = false,
  selectable = false,
  className,
}: TPClinicalTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [isTableOverflowing, setIsTableOverflowing] = useState(false)
  const [showStickyShadow, setShowStickyShadow] = useState(false)

  // Sorting
  const handleSort = useCallback(
    (colId: string) => {
      if (sortColumn === colId) {
        if (sortDirection === "asc") {
          setSortDirection("desc")
        } else {
          setSortColumn(null)
          setSortDirection("asc")
        }
      } else {
        setSortColumn(colId)
        setSortDirection("asc")
      }
    },
    [sortColumn, sortDirection],
  )

  const sortedData = useMemo(() => {
    if (!sortColumn) return data
    const col = columns.find((c) => c.id === sortColumn)
    if (!col?.sortValue) return data
    const sorted = [...data].sort((a, b) => {
      const aVal = col.sortValue!(a)
      const bVal = col.sortValue!(b)
      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal)
      }
      return Number(aVal) - Number(bVal)
    })
    return sortDirection === "desc" ? sorted.reverse() : sorted
  }, [data, sortColumn, sortDirection, columns])

  // Selection
  const allSelected = selectable && sortedData.length > 0 && selectedRows.length === sortedData.length
  const someSelected = selectable && selectedRows.length > 0 && !allSelected

  const toggleAll = () => {
    if (allSelected) {
      onRowSelect?.([])
    } else {
      onRowSelect?.(sortedData.map(rowKey))
    }
  }

  const toggleRow = (id: string) => {
    if (selectedRows.includes(id)) {
      onRowSelect?.(selectedRows.filter((r) => r !== id))
    } else {
      onRowSelect?.([...selectedRows, id])
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const updateStickyState = () => {
      const hasOverflow = el.scrollWidth > el.clientWidth + 1
      const maxScrollLeft = Math.max(0, el.scrollWidth - el.clientWidth)
      setIsTableOverflowing(hasOverflow)
      setShowStickyShadow(hasOverflow && el.scrollLeft < maxScrollLeft - 1)
    }

    updateStickyState()
    el.addEventListener("scroll", updateStickyState, { passive: true })
    window.addEventListener("resize", updateStickyState)

    let observer: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateStickyState)
      observer.observe(el)
      if (el.firstElementChild instanceof HTMLElement) {
        observer.observe(el.firstElementChild)
      }
    }

    return () => {
      el.removeEventListener("scroll", updateStickyState)
      window.removeEventListener("resize", updateStickyState)
      observer?.disconnect()
    }
  }, [columns.length, data.length, loading])

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-[#e2e2ea] bg-white",
        className,
      )}
    >
      <div ref={scrollRef} className="relative overflow-x-auto">
        <table className="w-full min-w-full table-fixed border-separate border-spacing-0 text-sm">
          {/* ── Header ── */}
          <thead>
            <tr className="bg-[#f1f1f5]">
              {/* Selection checkbox */}
              {selectable && (
                <th className="w-12 px-3 py-3 text-center">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected}
                    onChange={toggleAll}
                    aria-label="Select all"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={cn(
                    "px-3 py-3 text-left text-[#454551]",
                    col.align === "center" && "text-center",
                    col.align === "right" && "text-right",
                    col.sortable && "cursor-pointer select-none hover:text-[#454551]",
                    col.sticky && "sticky right-0 z-20 overflow-visible border-l border-tp-slate-200/80 bg-tp-slate-50",
                    col.sticky && isTableOverflowing && showStickyShadow && "relative shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)] before:pointer-events-none before:absolute before:inset-y-0 before:-left-2 before:w-2 before:content-[''] before:bg-gradient-to-l before:from-tp-slate-900/6 before:to-transparent",
                  )}
                  style={{
                    width: col.width,
                    minWidth: col.minWidth,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                  onClick={() => col.sortable && handleSort(col.id)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <span className="inline-flex flex-col -space-y-1">
                        <ArrowUp
                          size={10}
                          className={cn(
                            sortColumn === col.id && sortDirection === "asc"
                              ? "text-[#4b4ad5]"
                              : "text-[#a2a2a8]",
                          )}
                        />
                        <ArrowDown
                          size={10}
                          className={cn(
                            sortColumn === col.id && sortDirection === "desc"
                              ? "text-[#4b4ad5]"
                              : "text-[#a2a2a8]",
                          )}
                        />
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          {/* ── Body ── */}
          <tbody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {selectable && <td className="px-3 py-3"><div className="mx-auto h-5 w-5 animate-pulse rounded bg-[#f1f1f5]" /></td>}
                  {columns.map((col) => (
                    <td key={col.id} className="px-3 py-3">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-[#f1f1f5]" />
                    </td>
                  ))}
                </tr>
              ))
            ) : sortedData.length === 0 ? (
              // Empty state
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-6 py-12 text-center"
                >
                  {emptyIcon && <div className="mb-3 flex justify-center text-[#a2a2a8]">{emptyIcon}</div>}
                  <p className="text-sm text-[#a2a2a8]">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              sortedData.map((row) => {
                const id = rowKey(row)
                const isSelected = selectedRows.includes(id)
                return (
                  <tr
                    key={id}
                    className={cn(
                      "border-t border-[#e2e2ea] transition-colors",
                      isSelected ? "bg-[#eef]" : "hover:bg-[#f1f1f5]/60",
                      onRowClick && "cursor-pointer",
                    )}
                    onClick={() => onRowClick?.(row)}
                  >
                    {selectable && (
                      <td
                        className="w-12 px-3 py-3 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(id)}
                          aria-label={`Select row ${id}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          "px-3 py-3 text-[#454551]",
                          col.align === "center" && "text-center",
                          col.align === "right" && "text-right",
                          col.sticky && "sticky right-0 z-10 overflow-visible border-l border-tp-slate-200/80 bg-white",
                          col.sticky && isTableOverflowing && showStickyShadow && "relative shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)] before:pointer-events-none before:absolute before:inset-y-0 before:-left-2 before:w-2 before:content-[''] before:bg-gradient-to-l before:from-tp-slate-900/6 before:to-transparent",
                          col.sticky && isSelected && "bg-tp-blue-50",
                        )}
                        style={{ width: col.width, minWidth: col.minWidth }}
                      >
                        {col.accessor(row)}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Checkbox sub-component ─────────────────────────────────

function Checkbox({
  checked,
  indeterminate,
  onChange,
  ...props
}: {
  checked: boolean
  indeterminate?: boolean
  onChange: () => void
} & React.AriaAttributes) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      onClick={(e) => {
        e.stopPropagation()
        onChange()
      }}
      className={cn(
        "inline-flex h-5 w-5 items-center justify-center rounded-[6px] border-[1.5px] transition-all",
        checked || indeterminate
          ? "border-[#4b4ad5] bg-[#4b4ad5] shadow-[0_1px_2px_rgba(75,74,213,0.2)]"
          : "border-[#a2a2a8] bg-white hover:border-[#454551]",
      )}
      {...props}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {indeterminate && !checked && (
        <div className="h-0.5 w-2.5 rounded-full bg-white" />
      )}
    </button>
  )
}
