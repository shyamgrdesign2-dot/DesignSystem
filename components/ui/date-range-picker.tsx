"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export type DatePresetId =
  | "today"
  | "yesterday"
  | "past-3-months"
  | "past-4-months"
  | "next-3-months"
  | "next-4-months"

export interface DateRange {
  start: Date
  end: Date
}

export interface DateSelection {
  type: "preset"
  presetId: DatePresetId
  range: DateRange
  label: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function addDays(d: Date, n: number) {
  const r = new Date(d)
  r.setDate(r.getDate() + n)
  return r
}

function addMonths(d: Date, n: number) {
  const r = new Date(d)
  r.setMonth(r.getMonth() + n)
  return r
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

function formatMonthYear(d: Date) {
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" })
}

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: Array<{ id: DatePresetId; label: string; getRange: () => DateRange }> = [
  {
    id: "today",
    label: "Today",
    getRange: () => {
      const t = startOfDay(new Date())
      return { start: t, end: t }
    },
  },
  {
    id: "yesterday",
    label: "Yesterday",
    getRange: () => {
      const y = addDays(startOfDay(new Date()), -1)
      return { start: y, end: y }
    },
  },
  {
    id: "past-3-months",
    label: "Past 3 Months",
    getRange: () => ({
      start: addMonths(startOfDay(new Date()), -3),
      end: startOfDay(new Date()),
    }),
  },
  {
    id: "past-4-months",
    label: "Past 4 Months",
    getRange: () => ({
      start: addMonths(startOfDay(new Date()), -4),
      end: startOfDay(new Date()),
    }),
  },
  {
    id: "next-3-months",
    label: "Next 3 Months",
    getRange: () => ({
      start: startOfDay(new Date()),
      end: addMonths(startOfDay(new Date()), 3),
    }),
  },
  {
    id: "next-4-months",
    label: "Next 4 Months",
    getRange: () => ({
      start: startOfDay(new Date()),
      end: addMonths(startOfDay(new Date()), 4),
    }),
  },
]

// ─── Calendar Grid ────────────────────────────────────────────────────────────

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

function buildCalendarDays(viewDate: Date): Array<Date | null> {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1)
  // Monday-based: Sunday = 6, Monday = 0
  let startOffset = firstDay.getDay() - 1
  if (startOffset < 0) startOffset = 6
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: Array<Date | null> = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface DateRangePickerProps {
  value: DatePresetId
  onChange: (selection: DateSelection) => void
  className?: string
}

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
  const triggerLabel = PRESETS.find((p) => p.id === value)?.label ?? "Select date"
  const [open, setOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => startOfDay(new Date()))
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [pendingStart, setPendingStart] = useState<Date | null>(null)
  const [activePreset, setActivePreset] = useState<DatePresetId>(value)
  const [customRange, setCustomRange] = useState<DateRange | null>(null)

  const containerRef = useRef<HTMLDivElement | null>(null)

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  // When preset changes externally, reset
  useEffect(() => {
    setActivePreset(value)
    setCustomRange(null)
    setPendingStart(null)
  }, [value])

  // Derived: what range is currently highlighted in the calendar
  const displayRange: DateRange | null = (() => {
    if (pendingStart && hoverDate) {
      const [s, e] = pendingStart <= hoverDate
        ? [pendingStart, hoverDate]
        : [hoverDate, pendingStart]
      return { start: s, end: e }
    }
    if (customRange) return customRange
    const preset = PRESETS.find((p) => p.id === activePreset)
    return preset ? preset.getRange() : null
  })()

  function handleDayClick(day: Date) {
    if (!pendingStart) {
      // First click — start of range
      setPendingStart(day)
    } else {
      // Second click — complete range
      const [start, end] = pendingStart <= day
        ? [pendingStart, day]
        : [day, pendingStart]
      const range = { start, end }
      setCustomRange(range)
      setPendingStart(null)
      setActivePreset("today") // clear preset highlight

      // Fire onChange with custom preset-like shape
      onChange({
        type: "preset",
        presetId: "today", // placeholder; caller can check range
        range,
        label: `${formatDate(start)} – ${formatDate(end)}`,
      })
      setOpen(false)
    }
  }

  function handlePresetClick(preset: (typeof PRESETS)[number]) {
    setActivePreset(preset.id)
    setCustomRange(null)
    setPendingStart(null)
    const range = preset.getRange()
    onChange({ type: "preset", presetId: preset.id, range, label: preset.label })
    setOpen(false)
  }

  function isDayInRange(day: Date) {
    if (!displayRange) return false
    return day >= displayRange.start && day <= displayRange.end
  }
  function isDayStart(day: Date) {
    return displayRange ? isSameDay(day, displayRange.start) : false
  }
  function isDayEnd(day: Date) {
    return displayRange ? isSameDay(day, displayRange.end) : false
  }
  function isToday(day: Date) {
    return isSameDay(day, new Date())
  }
  const isSingleDay =
    displayRange ? isSameDay(displayRange.start, displayRange.end) : false

  const calendarDays = buildCalendarDays(viewDate)

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-[38px] w-full items-center justify-between gap-1.5 rounded-[10px] border border-tp-slate-200 bg-white px-3 text-[14px] font-medium text-tp-slate-700 transition-colors hover:border-tp-slate-300 hover:bg-tp-slate-50"
      >
        <span className="inline-flex min-w-0 items-center gap-1.5 truncate">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-tp-slate-500">
            <rect x="3" y="4" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 2v4M16 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="truncate">{triggerLabel}</span>
        </span>
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={cn(
            "shrink-0 text-tp-slate-500 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Popover */}
      {open && (
        <div className="absolute right-0 top-[44px] z-40 flex overflow-hidden rounded-[14px] border border-tp-slate-200 bg-white shadow-[0_16px_32px_-8px_rgba(23,23,37,0.12)]">
          {/* Left: Presets */}
          <div className="flex w-[160px] shrink-0 flex-col gap-0.5 border-r border-tp-slate-100 p-2">
            <p className="px-2 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-wide text-tp-slate-400">
              Quick Select
            </p>
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetClick(preset)}
                className={cn(
                  "flex w-full items-center rounded-[8px] px-2 py-2 text-left text-[13px] font-medium transition-colors",
                  preset.id === activePreset && !customRange
                    ? "bg-tp-blue-500 text-white"
                    : "text-tp-slate-700 hover:bg-tp-slate-100",
                )}
              >
                {preset.label}
              </button>
            ))}
            {pendingStart && (
              <p className="mt-2 rounded-[8px] bg-tp-amber-50 px-2 py-1.5 text-[11px] text-tp-warning-700">
                Click a second date to complete the range
              </p>
            )}
          </div>

          {/* Right: Calendar */}
          <div className="flex w-[272px] flex-col p-3">
            {/* Month nav */}
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setViewDate((d) => addMonths(d, -1))}
                className="flex size-7 items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100"
                aria-label="Previous month"
              >
                <ChevronLeft size={16} strokeWidth={1.5} />
              </button>
              <span className="text-[13px] font-semibold text-tp-slate-800">
                {formatMonthYear(viewDate)}
              </span>
              <button
                type="button"
                onClick={() => setViewDate((d) => addMonths(d, 1))}
                className="flex size-7 items-center justify-center rounded-[8px] text-tp-slate-600 transition-colors hover:bg-tp-slate-100"
                aria-label="Next month"
              >
                <ChevronRight size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="mb-1 grid grid-cols-7">
              {WEEKDAYS.map((w) => (
                <div key={w} className="py-1 text-center text-[11px] font-semibold text-tp-slate-400">
                  {w}
                </div>
              ))}
            </div>

            {/* Day cells */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, i) => {
                if (!day) return <div key={i} />

                const inRange = isDayInRange(day)
                const isStart = isDayStart(day)
                const isEnd = isDayEnd(day)
                const today = isToday(day)
                const isEdge = isStart || isEnd
                const isSingle = isSingleDay && isStart

                return (
                  <div
                    key={i}
                    className={cn(
                      "relative flex h-8 items-center justify-center",
                      // Range band (not for single-day)
                      inRange && !isSingle && "bg-tp-blue-50",
                      // Clip left/right corners of range band at edges
                      isStart && !isSingle && "rounded-l-full",
                      isEnd && !isSingle && "rounded-r-full",
                    )}
                    onMouseEnter={() => pendingStart && setHoverDate(day)}
                    onMouseLeave={() => pendingStart && setHoverDate(null)}
                  >
                    <button
                      type="button"
                      onClick={() => handleDayClick(day)}
                      className={cn(
                        "relative z-10 flex h-7 w-7 items-center justify-center rounded-full text-[13px] font-medium transition-colors",
                        isEdge || isSingle
                          ? "bg-tp-blue-500 text-white"
                          : inRange
                            ? "text-tp-blue-700 hover:bg-tp-blue-100"
                            : "text-tp-slate-700 hover:bg-tp-slate-100",
                        today && !isEdge && !inRange && "font-bold text-tp-blue-500",
                      )}
                    >
                      {day.getDate()}
                      {today && !isEdge && (
                        <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-tp-blue-400" />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

