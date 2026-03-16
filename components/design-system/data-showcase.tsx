"use client"

import { useEffect, useRef, useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  Pencil,
  Trash2,
  Eye,
  ArrowUpDown,
  ChevronUp,
  User,
  AlertCircle,
  CheckCircle2,
  Info,
  MoreVertical,
  Star,
} from "lucide-react"
import { Video } from "iconsax-reactjs"
import { TPSplitButton } from "@/components/tp-ui/button-system"

function TPCloseIcon({ size = 18, color = "#717179" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" />
    </svg>
  )
}

// ─── AI Spark Icon (appointment table) ───

function AiSparkIcon() {
  return (
    <span className="inline-flex size-[28px] items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="ds-table-ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D565EA" />
            <stop offset="45%" stopColor="#673AAC" />
            <stop offset="100%" stopColor="#1A1994" />
          </linearGradient>
        </defs>
        <path d="M18.0841 11.612C18.4509 11.6649 18.4509 12.3351 18.0841 12.388C14.1035 12.9624 12.9624 14.1035 12.388 18.0841C12.3351 18.4509 11.6649 18.4509 11.612 18.0841C11.0376 14.1035 9.89647 12.9624 5.91594 12.388C5.5491 12.3351 5.5491 11.6649 5.91594 11.612C9.89647 11.0376 11.0376 9.89647 11.612 5.91594C11.6649 5.5491 12.3351 5.5491 12.388 5.91594C12.9624 9.89647 14.1035 11.0376 18.0841 11.612Z" fill="url(#ds-table-ai-grad)" />
      </svg>
    </span>
  )
}

function ColSortArrows() {
  return (
    <span className="inline-flex flex-col items-center gap-[2px]">
      <span className="h-0 w-0 border-b-[5px] border-l-[4px] border-r-[4px] border-b-tp-slate-700 border-l-transparent border-r-transparent" />
      <span className="h-0 w-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-tp-slate-500" />
    </span>
  )
}

// ─── DATA TABLE (matches appointment queue) ───

interface QueueRow {
  id: string
  serial: number
  name: string
  gender: "M" | "F"
  age: number
  contact: string
  contactBadge?: string
  visitType: string
  visitBadge?: { text: string; tone: "warning" | "success" }
  slotTime: string
  slotDate: string
  hasVideo: boolean
  starred?: boolean
}

const queueData: QueueRow[] = [
  { id: "1", serial: 1, name: "Shyam GR", gender: "M", age: 35, contact: "+91-9812734567", visitType: "Follow-up", slotTime: "10:30 am", slotDate: "9th Oct 2024", hasVideo: true, starred: true },
  { id: "2", serial: 2, name: "Sita Menon", gender: "F", age: 30, contact: "+91-9988776655", contactBadge: "IPD", visitType: "New", slotTime: "10:35 am", slotDate: "8th Oct 2024", hasVideo: true },
  { id: "3", serial: 3, name: "Vikram Singh", gender: "M", age: 42, contact: "+91-9001234567", visitType: "New", visitBadge: { text: "Unfulfilled", tone: "warning" }, slotTime: "10:40 am", slotDate: "12th Sep 2024", hasVideo: false },
  { id: "4", serial: 4, name: "Nisha Rao", gender: "F", age: 28, contact: "+91-9876543210", visitType: "Follow-up", slotTime: "10:55 am", slotDate: "12th Sep 2024", hasVideo: false },
  { id: "5", serial: 5, name: "Rahul Verma", gender: "M", age: 55, contact: "+91-9123456789", visitType: "Routine", slotTime: "11:00 am", slotDate: "12th Sep 2024", hasVideo: true },
  { id: "6", serial: 6, name: "Anjali Patel", gender: "F", age: 38, contact: "+91-9567933357", visitType: "New", slotTime: "11:15 am", slotDate: "12th Sep 2024", hasVideo: false },
]

type SortDir = "asc" | "desc" | null

export function DataTableShowcase() {
  const tableOverflowRef = useRef<HTMLDivElement | null>(null)
  const [isActionSticky, setIsActionSticky] = useState(false)

  useEffect(() => {
    const wrapper = tableOverflowRef.current
    if (!wrapper) return
    const update = () => {
      const hasOverflow = wrapper.scrollWidth > wrapper.clientWidth + 1
      const isScrolledToEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 1
      setIsActionSticky(hasOverflow && !isScrolledToEnd)
    }
    update()
    window.addEventListener("resize", update)
    wrapper.addEventListener("scroll", update, { passive: true })
    let observer: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update)
      observer.observe(wrapper)
      const table = wrapper.querySelector("table")
      if (table) observer.observe(table)
    }
    return () => {
      window.removeEventListener("resize", update)
      wrapper.removeEventListener("scroll", update)
      observer?.disconnect()
    }
  }, [])

  const stickyActionHeaderClass = isActionSticky
    ? "border-l border-tp-slate-200/80 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)] before:pointer-events-none before:absolute before:inset-y-0 before:-left-3 before:w-3 before:content-[''] before:bg-gradient-to-l before:from-tp-slate-900/[0.06] before:to-transparent"
    : ""
  const stickyActionCellClass = isActionSticky
    ? "border-l border-tp-slate-200/80 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)] before:pointer-events-none before:absolute before:inset-y-0 before:-left-3 before:w-3 before:content-[''] before:bg-gradient-to-l before:from-tp-slate-900/[0.06] before:to-transparent"
    : ""

  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1">Data Table</h3>
      <p className="text-xs text-tp-slate-400 mb-5">
        Appointment queue table — exact pattern from the live appointment screen. Sticky action column with scroll-aware left shadow (-8px_7px_14px_-12px rgba(15,23,42,0.18)) + left border #E2E2EA/80 — shadow only appears when content overflows behind the action column. Action cell: TPSplitButton (outline/primary, VoiceRx primary + dropdown) + AI gradient icon (42px, rounded-[10px]) + MoreVertical. Header: 12px uppercase semibold, #F1F1F5 bg, sortable columns with caret arrows. Name: TP Blue 500 semibold with hover underline, clickable to patient details. Contact/Visit badges use TPTag (violet/warning/info tones). Video icon (iconsax Bulk, TP Violet 500) for teleconsult slots. Desktop (≥1280px): full table visible. Tablet (≤1024px): scroll activates, action column sticky right with shadow. Min table width: 920px.
      </p>

      <div ref={tableOverflowRef} className="overflow-x-auto rounded-[12px]">
        <table className="w-full min-w-[920px] border-collapse">
          <thead>
            <tr className="bg-tp-slate-100">
              <th className="rounded-l-[12px] px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 w-[48px]">#</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[140px]">Name</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[140px]">Contact</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[110px]">
                <span className="inline-flex items-center gap-1.5">Visit Type</span>
              </th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[110px]">
                <span className="inline-flex items-center gap-1.5">Slot <ColSortArrows /></span>
              </th>
              <th className={`sticky right-0 z-20 rounded-r-[12px] bg-tp-slate-100 px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 w-px whitespace-nowrap ${stickyActionHeaderClass}`}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {queueData.map((row) => (
              <tr key={row.id} className="h-16 border-b border-tp-slate-100 last:border-b-0 hover:bg-tp-slate-50/50">
                <td className="px-3 py-3 text-sm text-tp-slate-700">{row.serial}</td>
                <td className="px-3 py-3 align-middle">
                  <div className="max-w-[200px] overflow-hidden">
                    <p className="cursor-pointer truncate text-sm font-semibold text-tp-blue-500 hover:underline">{row.name}</p>
                    <p className="mt-1 truncate text-sm text-tp-slate-700">
                      {row.gender}, {row.age}y
                      {row.starred && (
                        <span className="ml-1 inline-flex">
                          <Star size={14} fill="var(--tp-success-500)" stroke="var(--tp-success-500)" />
                        </span>
                      )}
                    </p>
                  </div>
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="max-w-[180px] overflow-hidden">
                    <span className="block truncate text-sm text-tp-slate-700">{row.contact}</span>
                    {row.contactBadge && (
                      <div className="mt-1">
                        <span className="inline-flex items-center rounded-full bg-tp-violet-50 px-2 py-0.5 text-[11px] font-semibold text-tp-violet-600">{row.contactBadge}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3 align-middle text-sm text-tp-slate-700">
                  <div className="max-w-[160px] overflow-hidden">
                    <span className="truncate block">{row.visitType}</span>
                    {row.visitBadge && (
                      <div className="mt-1">
                        <span
                          className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold"
                          style={{
                            backgroundColor: row.visitBadge.tone === "warning" ? "#FFF7ED" : "#F0FDF4",
                            color: row.visitBadge.tone === "warning" ? "#C2410C" : "#15803D",
                          }}
                        >
                          {row.visitBadge.text}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-3 py-3 align-middle">
                  <div className="max-w-[150px] overflow-hidden">
                    <div className="text-sm text-tp-slate-700">
                      <span className="inline-flex items-center gap-1">
                        {row.slotTime}
                        {row.hasVideo && <Video size={13} variant="Bulk" color="var(--tp-violet-500)" />}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-tp-slate-600">{row.slotDate}</p>
                  </div>
                </td>
                <td className={`sticky right-0 z-10 bg-white px-3 py-3 align-middle w-px ${stickyActionCellClass}`}>
                  <div className="flex items-center gap-3 whitespace-nowrap">
                    <TPSplitButton
                      primaryAction={{ label: "VoiceRx", onClick: () => {} }}
                      secondaryActions={[
                        { id: "tab-rx", label: "TabRx", onClick: () => {} },
                        { id: "type-rx", label: "TypeRx", onClick: () => {} },
                        { id: "snap-rx", label: "SnapRx", onClick: () => {} },
                        { id: "smart-sync", label: "SmartSync", onClick: () => {} },
                      ]}
                      variant="outline"
                      theme="primary"
                      size="md"
                    />
                    <button
                      type="button"
                      aria-label="AI action"
                      className="shrink-0 inline-flex size-[42px] items-center justify-center rounded-[10px] transition-all hover:opacity-80 hover:scale-105 active:scale-[0.97]"
                      style={{ background: "linear-gradient(135deg, rgba(213,101,234,0.25) 0%, rgba(103,58,172,0.25) 45%, rgba(26,25,148,0.25) 100%)" }}
                    >
                      <AiSparkIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="More options"
                      className="flex shrink-0 items-center justify-center rounded-lg p-1 text-tp-slate-600 transition-colors hover:bg-tp-slate-100 hover:text-tp-slate-900"
                    >
                      <MoreVertical size={20} strokeWidth={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── PAGINATION ───

export function PaginationShowcase() {
  const [current, setCurrent] = useState(1)
  const [perPage, setPerPage] = useState(10)

  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1">Pagination</h3>
      <p className="text-xs text-tp-slate-400 mb-5">
        Multiple pagination styles: numbered, prev/next, compact, and per-page selector. Active page: TP Blue 500 fill, white text, shadow 0_1px_3px rgba(75,74,213,0.25). Page buttons: 32×32px, 8px radius. Per-page selector: native select in 32px bordered container. Compact: bordered page number input for direct entry. Desktop: full numbered pagination with ChevronsLeft/Right for first/last. Tablet: compact variant preferred to save horizontal space. Mobile: prev/next text buttons with page indicator only.
      </p>

      <div className="flex flex-col gap-8">
        {/* Numbered */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-3">Numbered Pagination</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-tp-slate-400 hover:bg-tp-slate-100 active:scale-[0.95] transition-all">
              <ChevronsLeft size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-tp-slate-400 hover:bg-tp-slate-100 active:scale-[0.95] transition-all">
              <ChevronLeft size={16} />
            </button>
            {[1, 2, 3, "...", 10].map((p, i) => (
              <button
                key={i}
                onClick={() => typeof p === "number" && setCurrent(p)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${current !== p && p !== "..." ? "hover:bg-tp-slate-100 active:scale-[0.95]" : ""}`}
                style={{
                  backgroundColor: current === p ? "#4B4AD5" : "transparent",
                  color: current === p ? "#FFFFFF" : p === "..." ? "#A2A2A8" : "#454551",
                  boxShadow: current === p ? "0 1px 3px rgba(75,74,213,0.25)" : "none",
                }}
              >
                {p}
              </button>
            ))}
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-tp-slate-400 hover:bg-tp-slate-100 active:scale-[0.95] transition-colors">
              <ChevronRight size={16} />
            </button>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-tp-slate-400 hover:bg-tp-slate-100 active:scale-[0.95] transition-colors">
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>

        {/* Prev/Next text style */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-3">Prev / Next with text</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-tp-slate-500 hover:bg-tp-slate-100 active:scale-[0.97] rounded-lg transition-all flex items-center gap-1">
              <ChevronLeft size={14} />
              Previous
            </button>
            {[1, 2, 3, "...", 10].map((p, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${p !== 1 && p !== "..." ? "hover:bg-tp-slate-100 active:scale-[0.95]" : ""}`}
                style={{
                  backgroundColor: p === 1 ? "#4B4AD5" : "transparent",
                  color: p === 1 ? "#FFFFFF" : p === "..." ? "#A2A2A8" : "#454551",
                  boxShadow: p === 1 ? "0 1px 3px rgba(75,74,213,0.25)" : "none",
                }}
              >
                {p}
              </button>
            ))}
            <button className="px-3 py-1.5 text-sm font-medium text-tp-slate-500 hover:bg-tp-slate-100 active:scale-[0.97] rounded-lg transition-all flex items-center gap-1">
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Per-page selector */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-3">With Per-Page Selector</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-tp-slate-600">Show</span>
              <div
                className="relative inline-flex items-center px-3 border border-tp-slate-200 bg-card"
                style={{ height: "32px", borderRadius: "8px" }}
              >
                <select
                  value={perPage}
                  onChange={(e) => setPerPage(Number(e.target.value))}
                  className="bg-transparent outline-none text-sm font-semibold text-tp-slate-800 appearance-none pr-5"
                >
                  {[10, 25, 50, 100].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 text-tp-slate-400 pointer-events-none" />
              </div>
              <span className="text-sm text-tp-slate-600">per page</span>
            </div>
            <span className="text-xs text-tp-slate-400">Page 1 of 10</span>
          </div>
        </div>

        {/* Compact */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-3">Compact</span>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-tp-slate-200 text-tp-slate-400 hover:bg-tp-slate-50 active:scale-[0.95] transition-all">
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-tp-slate-600">Page</span>
            <div
              className="w-12 h-8 rounded-lg border border-tp-slate-200 flex items-center justify-center text-sm font-semibold text-tp-slate-800 bg-card"
            >
              1
            </div>
            <span className="text-sm text-tp-slate-600">of 10</span>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center border border-tp-slate-200 text-tp-slate-400 hover:bg-tp-slate-50 active:scale-[0.95] transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── TOOLTIPS ───

function Tooltip({ text, header, dark, closable, size = "md" }: {
  text: string
  header?: string
  dark?: boolean
  closable?: boolean
  size?: "sm" | "md" | "lg"
}) {
  const bg = dark ? "#171725" : "#FFFFFF"
  const textColor = dark ? "#D0D5DD" : "#545460"
  const headerColor = dark ? "#FFFFFF" : "#171725"
  const closeColor = dark ? "#D0D5DD" : "#545460"
  const maxW = size === "sm" ? "180px" : size === "lg" ? "320px" : "240px"

  return (
    <div className="relative inline-flex flex-col items-center">
      <div
        className="px-3 py-2.5 text-xs"
        style={{
          backgroundColor: bg,
          color: textColor,
          border: "none",
          borderRadius: "8px",
          maxWidth: maxW,
          boxShadow: dark
            ? "0 12px 24px -4px rgba(23,23,37,0.30)"
            : "0 4px 16px -2px rgba(23,23,37,0.12), 0 2px 6px -2px rgba(23,23,37,0.06)",
        }}
      >
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            {header && <div className="font-bold text-[13px] mb-1" style={{ color: headerColor }}>{header}</div>}
            <div style={{ lineHeight: "1.5" }}>{text}</div>
          </div>
          {closable && (
            <button className="flex-shrink-0 mt-0.5 hover:opacity-70 transition-opacity inline-flex items-center justify-center" style={{ color: closeColor }}>
              <span className="inline-flex flex-shrink-0"><TPCloseIcon size={14} color={closeColor} /></span>
            </button>
          )}
        </div>
      </div>
      {/* Arrow */}
      <div className="flex justify-center -mt-[5px]">
        <div
          className="w-2.5 h-2.5 rotate-45"
          style={{
            backgroundColor: bg,
            boxShadow: dark ? "none" : "2px 2px 4px rgba(23,23,37,0.06)",
          }}
        />
      </div>
    </div>
  )
}

export function TooltipShowcase() {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1">Tooltips</h3>
      <p className="text-xs text-tp-slate-400 mb-5">
        Light and dark theme tooltips with simple, header+body, and closable variants. Three sizes: S (max-w 180px), M (240px), L (320px). 8px radius. Light tooltips: shadow only (no border), bg white, text #545460, header #171725. Dark tooltips: bg #171725, text #D0D5DD, header white, deeper shadow. Close icon: iconsax CloseSquare (Bulk variant), appears always on iPad/tablet for touch dismissal. On desktop, the closable tooltip shows on hover — close icon visible immediately. Arrow: 10px rotated square matching tooltip bg.
      </p>

      <div className="flex flex-col gap-8">
        {/* Light - Simple */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-4">Light Theme - Simple</span>
          <div className="flex flex-wrap gap-6 items-start">
            <Tooltip text="Here is a tooltip" size="sm" />
            <Tooltip text="Here is a tooltip" size="md" />
            <Tooltip text="Here is a tooltip" size="lg" />
          </div>
        </div>

        {/* Light - With Close */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-4">Light Theme - Closable</span>
          <div className="flex flex-wrap gap-6 items-start">
            <Tooltip text="Here is a tooltip" closable size="sm" />
            <Tooltip text="Here is a tooltip" closable size="md" />
            <Tooltip text="Here is a tooltip" closable size="lg" />
          </div>
        </div>

        {/* Light - With Header */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-4">Light Theme - Header + Body</span>
          <div className="flex flex-wrap gap-6 items-start">
            <Tooltip header="Here is a tooltip" text="Here is some helpful explainer text to assist or guide the user in understanding how a certain feature works." size="md" />
            <Tooltip header="Here is a tooltip" text="Here is some helpful explainer text to assist or guide the user in understanding how a certain feature works." closable size="md" />
            <Tooltip header="Here is a tooltip" text="Here is some helpful explainer text to assist or guide the user in understanding how a certain feature works." size="lg" />
          </div>
        </div>

        {/* Dark - Simple */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-4">Dark Theme - Simple</span>
          <div className="flex flex-wrap gap-6 items-start">
            <Tooltip text="Here is a tooltip" dark size="sm" />
            <Tooltip text="Here is a tooltip" dark size="md" />
            <Tooltip text="Here is a tooltip" dark size="lg" />
          </div>
        </div>

        {/* Dark - With Close */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-4">Dark Theme - Closable</span>
          <div className="flex flex-wrap gap-6 items-start">
            <Tooltip text="Here is a tooltip" dark closable size="sm" />
            <Tooltip text="Here is a tooltip" dark closable size="md" />
            <Tooltip text="Here is a tooltip" dark closable size="lg" />
          </div>
        </div>

        {/* Dark - With Header */}
        <div>
          <span className="text-xs font-semibold text-tp-slate-600 block mb-4">Dark Theme - Header + Body</span>
          <div className="flex flex-wrap gap-6 items-start">
            <Tooltip header="Here is a tooltip" text="Here is some helpful explainer text to assist or guide the user in understanding how a certain feature works." dark size="md" />
            <Tooltip header="Here is a tooltip" text="Here is some helpful explainer text to assist or guide the user in understanding how a certain feature works." dark closable size="md" />
            <Tooltip header="Here is a tooltip" text="Here is some helpful explainer text to assist or guide the user in understanding how a certain feature works." dark size="lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── MODAL / DIALOG ───

export function ModalShowcase() {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1">Modal / Dialog</h3>
      <p className="text-xs text-tp-slate-400 mb-5">
        Centered overlay dialogs. Confirmation (destructive), success, and info variants. 16px radius, layered shadow.
      </p>

      <div className="flex flex-wrap gap-8 items-start">
        {/* Destructive Confirmation */}
        <div
          className="bg-card border border-tp-slate-200 flex flex-col"
          style={{
            borderRadius: "16px",
            width: "380px",
            boxShadow: "0 20px 40px -8px rgba(23,23,37,0.12), 0 8px 16px -6px rgba(23,23,37,0.06)",
            overflow: "hidden",
          }}
        >
          <div className="p-6 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#FFF1F2" }}
              >
                <span className="inline-flex flex-shrink-0"><AlertCircle size={20} className="text-tp-error-500" /></span>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-tp-slate-900 font-heading">Delete Patient Record</h4>
                <p className="text-sm text-tp-slate-500 mt-1 leading-relaxed">This action cannot be undone. Are you sure you want to permanently delete this record?</p>
              </div>
              <button className="text-tp-slate-400 hover:text-tp-slate-700 transition-colors flex-shrink-0 inline-flex items-center justify-center">
                <TPCloseIcon size={18} color="#717179" />
              </button>
            </div>
          </div>
          <div className="flex gap-3 justify-end px-6 py-4 border-t border-tp-slate-100 bg-tp-slate-50/50">
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-[#E2E2EA] active:scale-[0.97]"
              style={{ backgroundColor: "#F1F1F5", color: "#454551" }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-[#BE123C] hover:shadow-md active:scale-[0.97]"
              style={{ backgroundColor: "#E11D48", color: "#FFFFFF", boxShadow: "0 1px 3px rgba(225,29,72,0.2)" }}
            >
              Delete Record
            </button>
          </div>
        </div>

        {/* Success / Info modal */}
        <div
          className="bg-card border border-tp-slate-200 flex flex-col"
          style={{
            borderRadius: "16px",
            width: "380px",
            boxShadow: "0 20px 40px -8px rgba(23,23,37,0.12), 0 8px 16px -6px rgba(23,23,37,0.06)",
            overflow: "hidden",
          }}
        >
          <div className="p-6 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#ECFDF5" }}
              >
                <span className="inline-flex flex-shrink-0"><CheckCircle2 size={20} className="text-tp-success-500" /></span>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-tp-slate-900 font-heading">Rx Saved Successfully</h4>
                <p className="text-sm text-tp-slate-500 mt-1 leading-relaxed">Prescription for Amoxicillin 500mg has been saved and sent to the pharmacy.</p>
              </div>
              <button className="text-tp-slate-400 hover:text-tp-slate-700 transition-colors flex-shrink-0 inline-flex items-center justify-center">
                <TPCloseIcon size={18} color="#717179" />
              </button>
            </div>
          </div>
          <div className="flex gap-3 justify-end px-6 py-4 border-t border-tp-slate-100 bg-tp-slate-50/50">
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-[#3F3EC0] hover:shadow-md active:scale-[0.97]"
              style={{ backgroundColor: "#4B4AD5", color: "#FFFFFF", boxShadow: "0 1px 3px rgba(75,74,213,0.25)" }}
            >
              Done
            </button>
          </div>
        </div>

        {/* Info modal */}
        <div
          className="bg-card border border-tp-slate-200 flex flex-col"
          style={{
            borderRadius: "16px",
            width: "380px",
            boxShadow: "0 20px 40px -8px rgba(23,23,37,0.12), 0 8px 16px -6px rgba(23,23,37,0.06)",
            overflow: "hidden",
          }}
        >
          <div className="p-6 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#F0F9FF" }}
              >
                <span className="inline-flex flex-shrink-0"><Info size={20} className="text-tp-blue-500" /></span>
              </div>
              <div className="flex-1">
                <h4 className="text-base font-bold text-tp-slate-900 font-heading">System Maintenance</h4>
                <p className="text-sm text-tp-slate-500 mt-1 leading-relaxed">Scheduled maintenance on Feb 20, 2026 from 2:00 AM to 4:00 AM. Service may be briefly unavailable.</p>
              </div>
              <button className="text-tp-slate-400 hover:text-tp-slate-700 transition-colors flex-shrink-0 inline-flex items-center justify-center">
                <TPCloseIcon size={18} color="#717179" />
              </button>
            </div>
          </div>
          <div className="flex gap-3 justify-end px-6 py-4 border-t border-tp-slate-100 bg-tp-slate-50/50">
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-[#E2E2EA] active:scale-[0.97]"
              style={{ backgroundColor: "#F1F1F5", color: "#454551" }}
            >
              Dismiss
            </button>
            <button
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-all hover:bg-[#3F3EC0] hover:shadow-md active:scale-[0.97]"
              style={{ backgroundColor: "#4B4AD5", color: "#FFFFFF", boxShadow: "0 1px 3px rgba(75,74,213,0.25)" }}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
