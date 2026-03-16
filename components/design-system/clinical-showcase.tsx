"use client"

import { useEffect, useRef, useState } from "react"
import {
  Users,
  CheckCircle,
  Pencil,
  Clock,
  Eye,
  Bell,
  Trash2,
  MoreVertical,
  Video,
} from "lucide-react"

import { ChevronDown } from "lucide-react"
import { Notification, Hospital } from "iconsax-reactjs"
import { AppointmentBanner } from "@/components/appointments/AppointmentBanner"
import { TPSplitButton } from "@/components/tp-ui/button-system"
import { TPClinicalTabs } from "@/components/tp-ui/tp-clinical-tabs"
import { TPSearchFilterBar } from "@/components/tp-ui/tp-search-filter-bar"
import { TPStatusBadge } from "@/components/tp-ui/tp-status-badge"
import RxpadHeader from "@/components/tp-rxpad/imports/RxpadHeader"

// ═════════════════════════════════════════════════════════════
// 1. Top Nav Bar Showcase
// ═════════════════════════════════════════════════════════════

export function TopNavBarShowcase() {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#a2a2a8]">
        Top Navigation Bar
      </h3>
      <p className="mb-4 text-xs text-[#a2a2a8]">
        62px fixed height, white bg, 0.5px bottom border #F1F1F5. Left section: logo image (min-w 280px flex area). Toolbar right: 42px icon buttons (bg #F1F1F5, rounded-[10.5px], 8.4px inner padding), gradient divider (1.05px × 42px), clinic selector dropdown with ChevronDown, profile avatar (42px) with gradient ring (gold→orange, 0.93px white inner border). Desktop: full toolbar. Tablet (≤1024px): hides clinic text, compact icons. Mobile (≤768px): hamburger menu replaces toolbar.
      </p>

      <div className="overflow-hidden rounded-xl">
        {/* Exact appointment screen header — matches DrAgentPage TopHeader */}
        <header className="flex h-[62px] shrink-0 items-center border-b border-tp-slate-100 bg-tp-slate-0 px-4 py-2.5">
          {/* Logo */}
          <div className="flex min-w-0 flex-1 items-center">
            <img alt="TatvaPractice" className="h-8 w-auto object-contain" src="/assets/b38df11ad80d11b9c1d530142443a18c2f53d406.png" />
          </div>
          {/* Toolbar */}
          <div className="flex items-center gap-3.5">
            {/* Tutorial icon — hexagonal play button */}
            <button type="button" className="flex size-[42px] items-center justify-center rounded-[10px] bg-tp-slate-100 transition-colors hover:bg-tp-slate-200" aria-label="Play tutorial">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ color: "#BA7DE9" }}>
                <path d="M19.5099 5.85L13.5699 2.42C12.5999 1.86 11.3999 1.86 10.4199 2.42L4.48992 5.85C3.51992 6.41 2.91992 7.45 2.91992 8.58V15.42C2.91992 16.54 3.51992 17.58 4.48992 18.15L10.4299 21.58C11.3999 22.14 12.5999 22.14 13.5799 21.58L19.5199 18.15C20.4899 17.59 21.0899 16.55 21.0899 15.42V8.58C21.0799 7.45 20.4799 6.42 19.5099 5.85ZM14.2499 13.4L13.2099 14L12.1699 14.6C10.8399 15.37 9.74992 14.74 9.74992 13.2V12V10.8C9.74992 9.26 10.8399 8.63 12.1699 9.4L13.2099 10L14.2499 10.6C15.5799 11.37 15.5799 12.63 14.2499 13.4Z" />
              </svg>
            </button>
            {/* Notifications — iconsax Notification icon */}
            <button type="button" className="relative inline-flex size-[42px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200" aria-label="Notifications">
              <Notification size={20} variant="Linear" strokeWidth={1.5} />
              <span className="absolute -top-0.5 right-1 size-2.5 rounded-full border-2 border-white bg-red-500" />
            </button>
            {/* Divider */}
            <div className="h-[42px] w-px bg-tp-slate-300 opacity-80" />
            {/* Clinic selector — iconsax Hospital icon */}
            <button type="button" className="inline-flex items-center gap-1.5 rounded-[10px] bg-tp-slate-100 px-4 py-2 transition-colors hover:bg-tp-slate-200" aria-label="Switch clinic">
              <Hospital size={20} variant="Linear" strokeWidth={1.5} color="var(--tp-slate-700)" />
              <span className="max-w-[120px] truncate text-[14.7px] text-tp-slate-700">Rajeshwar Eye Clinic</span>
              <ChevronDown size={18} strokeWidth={1.5} className="text-tp-slate-500" />
            </button>
            {/* Avatar — gradient ring with actual image */}
            <button type="button" className="relative inline-flex size-[42px] items-center justify-center rounded-full transition-opacity hover:opacity-80" aria-label="Profile">
              <span className="inline-flex size-full items-center justify-center rounded-full" style={{ background: "linear-gradient(to bottom, #FFDE00, #FD5900) padding-box, linear-gradient(to bottom, #FFDE00, #FD5900) border-box" }}>
                <span className="inline-flex size-full overflow-hidden rounded-full border border-white">
                  <img src="/assets/52cb18088c5b8a5db6a7711c9900d7d08a1bac42.png" alt="User" className="size-full object-cover" />
                </span>
              </span>
            </button>
          </div>
        </header>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════
// 2. Appointment Banner Showcase
// ═════════════════════════════════════════════════════════════

export function AppointmentBannerShowcase() {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#a2a2a8]">
        Banner
      </h3>
      <p className="mb-4 text-xs text-[#a2a2a8]">
        Dark radial-gradient hero banner (purple: #46286C → #25113E → #372153 → #6C4F90). 149px height, 16px bottom radius. Geometric SVG pattern right-aligned (opacity 75%, mix-blend-mode: screen, scales with height). Noise grain overlay at 6% opacity. White title: Poppins Bold 24px. Primary CTA (solid white, text #4B4AD5) + secondary CTA (ghost, bg white/12%). Desktop: side-by-side title + CTAs (px-[18px]). Tablet: stacks CTAs below title (px-6). Mobile: single CTA visible (px-3). The card below uses -mt-[60px] to overlap the banner bottom.
      </p>

      <AppointmentBanner
        title="Your Appointments"
        actions={
          <>
            {/* Outline CTA on dark surface — uses CTA system tokens:
                bg: rgba(255,255,255,0.07), border: 1.5px solid rgba(255,255,255,0.40),
                backdrop-filter: blur(8px), color: white, height: 42px, radius: 10px */}
            <button
              type="button"
              className="inline-flex items-center justify-center"
              style={{
                height: 42,
                padding: "8px 14px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                backgroundColor: "rgba(255,255,255,0.07)",
                color: "#FFFFFF",
                border: "1.5px solid rgba(255,255,255,0.40)",
                backdropFilter: "blur(8px)",
                gap: 6,
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              View All
            </button>
            {/* Solid CTA on dark surface — uses CTA system tokens:
                bg: #FFFFFF, color: #161558, border: none, height: 42px, radius: 10px */}
            <button
              type="button"
              className="inline-flex items-center justify-center"
              style={{
                height: 42,
                padding: "8px 14px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "Inter, sans-serif",
                backgroundColor: "#FFFFFF",
                color: "#161558",
                border: "none",
                gap: 6,
                cursor: "pointer",
                transition: "all 150ms ease",
              }}
            >
              + New Appointment
            </button>
          </>
        }
      />
    </div>
  )
}

// ═════════════════════════════════════════════════════════════
// 3. Clinical Tabs Showcase
// ═════════════════════════════════════════════════════════════

export function ClinicalTabsShowcase() {
  const [activeUnderline, setActiveUnderline] = useState("queue")
  const [activePill, setActivePill] = useState("queue")

  const tabs = [
    {
      id: "queue",
      label: "Queue",
      iconActive: <Users size={18} color="#4b4ad5" />,
      iconInactive: <Users size={18} color="#454551" className="opacity-60" />,
    },
    {
      id: "finished",
      label: "Finished",
      iconActive: <CheckCircle size={18} color="#4b4ad5" />,
      iconInactive: <CheckCircle size={18} color="#454551" className="opacity-60" />,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      iconActive: <Clock size={18} color="#4b4ad5" />,
      iconInactive: <Clock size={18} color="#454551" className="opacity-60" />,
    },
    {
      id: "draft",
      label: "Draft",
      iconActive: <Pencil size={18} color="#4b4ad5" />,
      iconInactive: <Pencil size={18} color="#454551" className="opacity-60" />,
    },
    {
      id: "pending",
      label: "Pending Digitisation",
      iconActive: <Bell size={18} color="#4b4ad5" />,
      iconInactive: <Bell size={18} color="#454551" className="opacity-60" />,
    },
  ]

  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#a2a2a8]">
        Clinical Tabs
      </h3>
      <p className="mb-4 text-xs text-[#a2a2a8]">
        Active: 3px bottom bar #4b4ad5. Active text: #4b4ad5, Inter Semi Bold 12px. Inactive: #454551/60. Icon container: bg-[#eef] when active.
      </p>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-[11px] font-medium text-[#454551]/60">Underline variant</p>
          <TPClinicalTabs
            tabs={tabs}
            activeTab={activeUnderline}
            onTabChange={setActiveUnderline}
            variant="underline"
          />
        </div>

        <div>
          <p className="mb-2 text-[11px] font-medium text-[#454551]/60">Pill variant</p>
          <TPClinicalTabs
            tabs={tabs}
            activeTab={activePill}
            onTabChange={setActivePill}
            variant="pill"
          />
        </div>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════
// 4. Search & Filter Bar Showcase
// ═════════════════════════════════════════════════════════════

export function SearchFilterBarShowcase() {
  const [search, setSearch] = useState("")

  const filters = [
    {
      id: "department",
      label: "Department",
      options: [
        { value: "all", label: "All Departments" },
        { value: "General Medicine", label: "General Medicine" },
        { value: "Ophthalmology", label: "Ophthalmology" },
      ],
      selectedValue: "all",
    },
    {
      id: "doctor",
      label: "Doctor",
      options: [
        { value: "all", label: "All Doctors" },
        { value: "Dr. Sharma", label: "Dr. Sharma" },
        { value: "Dr. Mehta", label: "Dr. Mehta" },
      ],
      selectedValue: "all",
    },
  ]

  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#a2a2a8]">
        Search & Filter Bar
      </h3>
      <p className="mb-4 text-xs text-[#a2a2a8]">
        Search: white bg, #E2E2EA border, 10px radius, 38px height. Filters: white bg, 10px radius, 38px height. Focus: #4b4ad5 border + ring.
      </p>

      <TPSearchFilterBar
        searchPlaceholder="Search patients, doctors, UHID..."
        searchValue={search}
        onSearchChange={setSearch}
        filters={filters}
      />
    </div>
  )
}

// ═════════════════════════════════════════════════════════════
// 5. Status Badge Showcase
// ═════════════════════════════════════════════════════════════

export function StatusBadgeShowcase() {
  const allStatuses = [
    "queue", "in-progress", "finished", "cancelled", "draft", "pending",
    "active", "inactive", "scheduled", "completed", "overdue",
  ] as const

  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#a2a2a8]">
        Status Badges
      </h3>
      <p className="mb-4 text-xs text-[#a2a2a8]">
        Pill-shaped (9999px radius). SM: 22px/10px, MD: 26px/12px. Leading 6px dot. Color-coded per status.
      </p>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-[11px] font-medium text-[#454551]/60">Medium (default)</p>
          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => (
              <TPStatusBadge key={status} status={status} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-medium text-[#454551]/60">Small</p>
          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => (
              <TPStatusBadge key={status} status={status} size="sm" />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-medium text-[#454551]/60">Without dot</p>
          <div className="flex flex-wrap gap-2">
            {allStatuses.slice(0, 6).map((status) => (
              <TPStatusBadge key={status} status={status} showDot={false} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════
// 6. Clinical Table Showcase
// ═════════════════════════════════════════════════════════════

type AppointmentRow = {
  id: string
  serial: number
  name: string
  gender: string
  age: number
  contact: string
  visitType: string
  slotTime: string
  slotDate: string
  hasVideo: boolean
}

const TABLE_ROWS: AppointmentRow[] = [
  { id: "1", serial: 1, name: "Shyam GR", gender: "M", age: 35, contact: "+91-9812734567", visitType: "Follow-up", slotTime: "10:30 am", slotDate: "9th Oct 2024", hasVideo: true },
  { id: "2", serial: 2, name: "Priya Patel", gender: "F", age: 28, contact: "+91-9988776655", visitType: "New", slotTime: "10:35 am", slotDate: "8th Oct 2024", hasVideo: true },
  { id: "3", serial: 3, name: "Mohammed Ali", gender: "M", age: 52, contact: "+91-9001234567", visitType: "New", slotTime: "10:40 am", slotDate: "12th Sep 2024", hasVideo: false },
  { id: "4", serial: 4, name: "Lakshmi Devi", gender: "F", age: 45, contact: "+91-9876543210", visitType: "Follow-up", slotTime: "11:00 am", slotDate: "12th Sep 2024", hasVideo: false },
]

export function ClinicalTableShowcase() {
  const clinicalTableRef = useRef<HTMLDivElement | null>(null)
  const [isClinicalActionSticky, setIsClinicalActionSticky] = useState(false)

  useEffect(() => {
    const wrapper = clinicalTableRef.current
    if (!wrapper) return
    const update = () => {
      const hasOverflow = wrapper.scrollWidth > wrapper.clientWidth + 1
      const isScrolledToEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 1
      setIsClinicalActionSticky(hasOverflow && !isScrolledToEnd)
    }
    update()
    window.addEventListener("resize", update)
    wrapper.addEventListener("scroll", update, { passive: true })
    let observer: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update)
      observer.observe(wrapper)
    }
    return () => {
      window.removeEventListener("resize", update)
      wrapper.removeEventListener("scroll", update)
      observer?.disconnect()
    }
  }, [])

  const clinicalStickyHeader = isClinicalActionSticky
    ? "border-l border-tp-slate-200/80 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]"
    : ""
  const clinicalStickyCell = isClinicalActionSticky
    ? "border-l border-tp-slate-200/80 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]"
    : ""

  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#a2a2a8]">
        Clinical Data Table
      </h3>
      <p className="mb-4 text-xs text-[#a2a2a8]">
        Sticky action column with scroll-aware left shadow (-8px_7px_14px_-12px rgba(15,23,42,0.18)) — shadow only appears when content overflows behind the action column. Header: #F1F1F5 bg, 12px uppercase semibold, sortable columns with up/down caret arrows. Name: TP Blue 500 semibold with hover underline. Rows: white bg, hover #F1F1F5/50, 1px #E2E2EA bottom border. Row height: 64px. Desktop: full table visible (min-w 700px). Tablet (≤1024px): horizontal scroll activates, action column becomes sticky right with shadow. iPad: touch-friendly 42px action buttons.
      </p>

      <div ref={clinicalTableRef} className="overflow-x-auto rounded-[12px]">
        <table className="w-full min-w-[700px] border-collapse">
          <thead>
            <tr className="bg-tp-slate-100">
              <th className="rounded-l-[12px] px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 w-[48px]">#</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[140px]">
                <span className="inline-flex items-center gap-1.5">Name <ColSortArrows /></span>
              </th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[130px]">Contact</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">Visit Type</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">
                <span className="inline-flex items-center gap-1.5">Slot <ColSortArrows /></span>
              </th>
              <th className={`sticky right-0 z-20 rounded-r-[12px] bg-tp-slate-100 px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 w-px whitespace-nowrap ${clinicalStickyHeader}`}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row) => (
              <tr key={row.id} className="h-16 border-b border-tp-slate-100 last:border-b-0 hover:bg-tp-slate-50/50">
                <td className="px-3 py-3 text-sm text-tp-slate-700">{row.serial}</td>
                <td className="px-3 py-3 align-middle">
                  <p className="cursor-pointer text-sm font-semibold text-tp-blue-500 hover:underline">{row.name}</p>
                  <p className="mt-1 text-sm text-tp-slate-700">{row.gender}, {row.age}y</p>
                </td>
                <td className="px-3 py-3 align-middle text-sm text-tp-slate-700">{row.contact}</td>
                <td className="px-3 py-3 align-middle text-sm text-tp-slate-700">{row.visitType}</td>
                <td className="px-3 py-3 align-middle">
                  <div className="text-sm text-tp-slate-700">
                    <span className="inline-flex items-center gap-1">
                      {row.slotTime}
                      {row.hasVideo && <Video size={13} strokeWidth={1.5} color="var(--tp-blue-500, #3BAFDA)" />}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-tp-slate-600">{row.slotDate}</p>
                </td>
                <td className={`sticky right-0 z-10 bg-white px-3 py-3 align-middle w-px ${clinicalStickyCell}`}>
                  <div className="flex items-center gap-1">
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f1f1f5] text-[#454551] hover:bg-[#e2e2ea]">
                      <Eye size={14} />
                    </button>
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg text-[#E11D48] hover:bg-red-50">
                      <Trash2 size={14} />
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

// ═════════════════════════════════════════════════════════════
// 7. Patient Info Header Showcase
// ═════════════════════════════════════════════════════════════

export function PatientInfoHeaderShowcase() {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#a2a2a8]">
        Patient Info Header (RxPad)
      </h3>
      <p className="mb-4 text-xs text-[#a2a2a8]">
        62px fixed height, white bg. Back button: 80px panel with ArrowLeft, right + bottom border 0.5px #F1F1F5. Patient avatar (40px circle, bg #F1F1F5) + name (Poppins SemiBold 14px, max-w 150px) + demographics (Roboto 12px, pipe separator #E2E2EA). Toolbar: 42px action buttons — Template, Save, Customisation (bg #F1F1F5, rounded-[10.5px]), Custom Canvas with badge dot, Preview (text+icon bg), Draft (outline #4B4AD5 1.05px), End Visit (solid #4B4AD5), MoreVertical. Desktop: all buttons visible. Tablet (≤1024px): icon-only mode for Template/Save/Customisation. Mobile: collapses into overflow menu.
      </p>

      <div className="overflow-hidden rounded-xl">
        <RxpadHeader />
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════
// 8. Dr. Agent Appointments Table Showcase
// ═════════════════════════════════════════════════════════════

function AiSparkIcon() {
  return (
    <span className="inline-flex size-[28px] items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="ds-ai-spark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D565EA" />
            <stop offset="45%" stopColor="#673AAC" />
            <stop offset="100%" stopColor="#1A1994" />
          </linearGradient>
        </defs>
        <path d="M18.0841 11.612C18.4509 11.6649 18.4509 12.3351 18.0841 12.388C14.1035 12.9624 12.9624 14.1035 12.388 18.0841C12.3351 18.4509 11.6649 18.4509 11.612 18.0841C11.0376 14.1035 9.89647 12.9624 5.91594 12.388C5.5491 12.3351 5.5491 11.6649 5.91594 11.612C9.89647 11.0376 11.0376 9.89647 11.612 5.91594C11.6649 5.5491 12.3351 5.5491 12.388 5.91594C12.9624 9.89647 14.1035 11.0376 18.0841 11.612Z" fill="url(#ds-ai-spark-gradient)" />
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

const SAMPLE_ROWS = [
  { id: "1", serial: 1, name: "Shyam GR", gender: "M", age: 35, contact: "+91-9812734567", visitType: "Follow-up", slotTime: "10:30 am", slotDate: "9th Oct 2024", hasVideo: true },
  { id: "2", serial: 2, name: "Sita Menon", gender: "F", age: 30, contact: "+91-9988776655", visitType: "New", slotTime: "10:35 am", slotDate: "8th Oct 2024", hasVideo: true },
  { id: "3", serial: 3, name: "Vikram Singh", gender: "M", age: 42, contact: "+91-9001234567", visitType: "New", slotTime: "10:40 am", slotDate: "12th Sep 2024", hasVideo: false },
]

export function DrAgentAppointmentsShowcase() {
  const drAgentTableRef = useRef<HTMLDivElement | null>(null)
  const [isDrAgentActionSticky, setIsDrAgentActionSticky] = useState(false)

  useEffect(() => {
    const wrapper = drAgentTableRef.current
    if (!wrapper) return
    const update = () => {
      const hasOverflow = wrapper.scrollWidth > wrapper.clientWidth + 1
      const isScrolledToEnd = wrapper.scrollLeft + wrapper.clientWidth >= wrapper.scrollWidth - 1
      setIsDrAgentActionSticky(hasOverflow && !isScrolledToEnd)
    }
    update()
    window.addEventListener("resize", update)
    wrapper.addEventListener("scroll", update, { passive: true })
    let observer: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(update)
      observer.observe(wrapper)
    }
    return () => {
      window.removeEventListener("resize", update)
      wrapper.removeEventListener("scroll", update)
      observer?.disconnect()
    }
  }, [])

  const drAgentStickyHeader = isDrAgentActionSticky
    ? "border-l border-tp-slate-200/80 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]"
    : ""
  const drAgentStickyCell = isDrAgentActionSticky
    ? "border-l border-tp-slate-200/80 shadow-[-8px_7px_14px_-12px_rgba(15,23,42,0.18)]"
    : ""

  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#a2a2a8]">
        Appointments Table (Dr. Agent)
      </h3>
      <p className="mb-4 text-xs text-[#a2a2a8]">
        Appointment queue table with sticky action column. Action cell: TPSplitButton (outline/primary, TypeRx primary + dropdown secondaries) + AI gradient icon button (42px, rounded-[10px]) + MoreVertical. Header: 12px uppercase semibold, #F1F1F5 bg, 12px top radius. Sticky action column: scroll-aware shadow (-8px_7px_14px_-12px rgba(15,23,42,0.18)) — only appears when content overflows. Desktop (≥1280px): all columns visible, no scroll. Tablet (1024px): horizontal scroll activates, action column sticks right. iPad portrait: action column shadow visible.
      </p>

      <div ref={drAgentTableRef} className="overflow-x-auto rounded-[12px]">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-tp-slate-100">
              <th className="rounded-l-[12px] px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 w-[48px]">#</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[140px]">Name</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[140px]">Contact</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">Visit Type</th>
              <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">
                <span className="inline-flex items-center gap-1.5">Slot <ColSortArrows /></span>
              </th>
              <th className={`sticky right-0 z-20 rounded-r-[12px] bg-tp-slate-100 px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 w-px whitespace-nowrap ${drAgentStickyHeader}`}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_ROWS.map((row) => (
              <tr key={row.id} className="h-16 border-b border-tp-slate-100 last:border-b-0 hover:bg-tp-slate-50/50">
                <td className="px-3 py-3 text-sm text-tp-slate-700">{row.serial}</td>
                <td className="px-3 py-3 align-middle">
                  <p className="cursor-pointer text-sm font-semibold text-tp-blue-500 hover:underline">{row.name}</p>
                  <p className="mt-1 text-sm text-tp-slate-700">{row.gender}, {row.age}y</p>
                </td>
                <td className="px-3 py-3 align-middle text-sm text-tp-slate-700">{row.contact}</td>
                <td className="px-3 py-3 align-middle text-sm text-tp-slate-700">{row.visitType}</td>
                <td className="px-3 py-3 align-middle">
                  <div className="text-sm text-tp-slate-700">
                    <span className="inline-flex items-center gap-1">
                      {row.slotTime}
                      {row.hasVideo && <Video size={13} strokeWidth={1.5} color="var(--tp-blue-500)" />}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-tp-slate-600">{row.slotDate}</p>
                </td>
                <td className={`sticky right-0 z-10 bg-white px-3 py-3 align-middle w-px ${drAgentStickyCell}`}>
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
                      className="shrink-0 inline-flex size-[42px] items-center justify-center rounded-[10px] transition-opacity hover:opacity-90"
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
