"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  Activity,
  Bag2,
  Calendar,
  CalendarAdd,
  CalendarTick,
  CloseCircle,
  Clock,
  DocumentText,
  Hospital,
  MessageQuestion,
  MessageText,
  Monitor,
  Notification,
  Profile2User,
  ReceiptText,
  SearchNormal1,
  TickCircle,
  Video,
} from "iconsax-reactjs"
import { ChevronDown, MoreVertical, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { SecondaryNavPanel, type NavItem } from "@/components/ui/secondary-nav-panel"
import {
  TPButton as Button,
  TPSplitButton,
} from "@/components/tp-ui/button-system"
import { AppointmentBanner } from "@/components/appointments/AppointmentBanner"
import { DateRangePicker, type DatePresetId } from "@/components/ui/date-range-picker"

const REF_LOGO = "/assets/b38df11ad80d11b9c1d530142443a18c2f53d406.png"
const REF_AVATAR = "/assets/52cb18088c5b8a5db6a7711c9900d7d08a1bac42.png"

type AppointmentStatus =
  | "queue"
  | "finished"
  | "cancelled"
  | "draft"
  | "pending-digitisation"

type BadgeTone = "warning" | "success"
type DateRangeKey = "today" | "yesterday" | "past-3-months" | "past-4-months"

interface AppointmentTab {
  id: AppointmentStatus
  label: string
  count: number
  icon: React.ComponentType<any>
}

interface AppointmentRow {
  id: string
  serial: number
  name: string
  gender: "M" | "F"
  age: number
  contact: string
  visitType: string
  visitBadge?: {
    text: string
    tone: BadgeTone
  }
  contactBadge?: string
  slotTime: string
  slotDate: string
  hasVideo: boolean
  status: AppointmentStatus
  dateKey: DateRangeKey
  starred?: boolean
}

const navItems: NavItem[] = [
  { id: "appointments", label: "Appointm...", icon: Calendar },
  {
    id: "ask-tatva",
    label: "Ask Tatva",
    icon: MessageQuestion,
    badge: {
      text: "New",
      gradient:
        "linear-gradient(257.32deg, rgb(22, 163, 74) 0%, rgb(68, 207, 119) 47.222%, rgb(22, 163, 74) 94.444%)",
    },
  },
  {
    id: "opd-billing",
    label: "OPD Billing",
    icon: ReceiptText,
    badge: {
      text: "Trial",
      gradient:
        "linear-gradient(257.32deg, rgb(241, 82, 35) 0%, rgb(255, 152, 122) 47.222%, rgb(241, 82, 35) 94.444%)",
    },
  },
  { id: "all-patients", label: "All Patients", icon: Profile2User },
  { id: "follow-ups", label: "Follow-ups", icon: CalendarAdd },
  { id: "follow-ups-2", label: "Follow-ups", icon: CalendarTick },
  { id: "pharmacy", label: "Pharmacy", icon: Bag2 },
  { id: "ipd", label: "IPD", icon: Monitor },
  { id: "daycare", label: "Daycare", icon: Hospital },
  { id: "bulk-messages", label: "Bulk Messages", icon: MessageText },
]

const appointmentTabs: AppointmentTab[] = [
  { id: "queue", label: "Queue", count: 20, icon: Clock },
  { id: "finished", label: "Finished", count: 0, icon: TickCircle },
  { id: "cancelled", label: "Cancelled", count: 0, icon: CloseCircle },
  { id: "draft", label: "Draft", count: 0, icon: DocumentText },
  {
    id: "pending-digitisation",
    label: "Pending Digitisation",
    count: 0,
    icon: Activity,
  },
]


const queueAppointments: AppointmentRow[] = [
  {
    id: "apt-1",
    serial: 1,
    name: "Shyam GR",
    gender: "M",
    age: 35,
    contact: "+91-9812734567",
    visitType: "Follow-up",
    visitBadge: { text: "Unfulfilled", tone: "warning" },
    slotTime: "10:30 am",
    slotDate: "9th Oct 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "today",
  },
  {
    id: "apt-2",
    serial: 2,
    name: "Sita Menon",
    gender: "F",
    age: 30,
    contact: "+91-9988776655",
    contactBadge: "IPD",
    visitType: "New",
    slotTime: "10:35 am",
    slotDate: "8th Oct 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "yesterday",
    starred: true,
  },
  {
    id: "apt-3",
    serial: 3,
    name: "Vikram Singh",
    gender: "M",
    age: 42,
    contact: "+91-9001234567",
    visitType: "New",
    slotTime: "10:40 am",
    slotDate: "12th Sep 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "past-3-months",
  },
  {
    id: "apt-4",
    serial: 4,
    name: "Nisha Rao",
    gender: "F",
    age: 26,
    contact: "+91-9876543210",
    visitType: "Routine",
    slotTime: "10:45 am",
    slotDate: "18th Aug 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "past-4-months",
  },
  {
    id: "apt-5",
    serial: 5,
    name: "Rahul Verma",
    gender: "M",
    age: 50,
    contact: "+91-9123456789",
    visitType: "Follow-up",
    slotTime: "10:50 am",
    slotDate: "2nd Jul 2024",
    hasVideo: false,
    status: "queue",
    dateKey: "past-4-months",
  },
  {
    id: "apt-6",
    serial: 6,
    name: "Anjali Patel",
    gender: "F",
    age: 28,
    contact: "+91-9988771122",
    visitType: "New",
    slotTime: "10:55 am",
    slotDate: "9th Oct 2024",
    hasVideo: true,
    status: "queue",
    dateKey: "today",
  },
]

function matchesDateFilter(rowDateKey: DateRangeKey, selected: DatePresetId) {
  if (selected === "today") return rowDateKey === "today"
  if (selected === "yesterday") return rowDateKey === "yesterday"
  if (selected === "past-3-months" || selected === "next-3-months") {
    return rowDateKey === "today" || rowDateKey === "yesterday" || rowDateKey === "past-3-months"
  }
  // past-4-months, next-4-months, or custom → show all
  return true
}

export function DrAgentPage() {
  const [activeRailItem, setActiveRailItem] = useState(navItems[0].id)
  const [activeTab, setActiveTab] = useState<AppointmentStatus>("queue")
  const [query, setQuery] = useState("")
  const [dateFilter, setDateFilter] = useState<DatePresetId>("today")
  const tableOverflowRef = useRef<HTMLDivElement | null>(null)
  const [isTableScrolled, setIsTableScrolled] = useState(false)

  useEffect(() => {
    const el = tableOverflowRef.current
    if (!el) return
    const handler = () => setIsTableScrolled(el.scrollLeft > 0)
    el.addEventListener("scroll", handler, { passive: true })
    return () => el.removeEventListener("scroll", handler)
  }, [])

  const visibleAppointments = useMemo(() => {
    return queueAppointments.filter((row) => {
      const tabMatch = row.status === activeTab
      const dateMatch = matchesDateFilter(row.dateKey, dateFilter)
      const q = query.trim().toLowerCase()

      if (!tabMatch || !dateMatch) return false
      if (!q) return true

      return (
        row.name.toLowerCase().includes(q) ||
        row.contact.toLowerCase().includes(q) ||
        row.visitType.toLowerCase().includes(q)
      )
    })
  }, [activeTab, dateFilter, query])

  return (
    <div className="min-h-screen bg-tp-slate-100 font-sans text-tp-slate-900">
      <TopHeader />

      <div className="flex h-[calc(100vh-62px)]">
        <aside className="hidden h-full shrink-0 md:block">
          <SecondaryNavPanel
            items={navItems}
            activeId={activeRailItem}
            onSelect={setActiveRailItem}
            variant="primary"
            height="100%"
            bottomSpacerPx={56}
            renderIcon={({ item, isActive, iconSize }) => {
              const Icon = item.icon as React.ComponentType<any>
              return (
                <Icon
                  size={iconSize}
                  variant={isActive ? "Bulk" : "Linear"}
                  strokeWidth={isActive ? undefined : 1.5}
                  color={isActive ? "var(--tp-slate-0)" : "var(--tp-slate-700)"}
                />
              )
            }}
          />
        </aside>

        <main className="flex-1 overflow-hidden">
          <section className="h-full overflow-y-auto">
            <div className="px-3 py-3 md:hidden">
              <div className="flex items-center gap-2 overflow-x-auto">
                {navItems.map((item) => {
                  const isActive = item.id === activeRailItem
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveRailItem(item.id)}
                      className={cn(
                        "whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        isActive
                          ? "border-tp-blue-500 bg-tp-blue-50 text-tp-blue-700"
                          : "border-tp-slate-200 bg-white text-tp-slate-600",
                      )}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <AppointmentBanner
              title="Your Appointments"
              actions={
                <>
                  <Button
                    variant="outline"
                    theme="primary"
                    size="md"
                    surface="dark"
                    className="whitespace-nowrap !bg-[rgba(255,255,255,0.13)] backdrop-blur-sm"
                    leftIcon={<Plus size={20} strokeWidth={1.5} />}
                  >
                    Add Appointment
                  </Button>
                  <Button
                    variant="solid"
                    theme="primary"
                    size="md"
                    surface="dark"
                    className="whitespace-nowrap"
                    leftIcon={<TickCircle size={24} variant="Linear" strokeWidth={1.5} />}
                  >
                    Start Walk-In
                  </Button>
                </>
              }
            />

            <div className="relative z-10 -mt-[60px] px-3 pb-6 sm:px-4 lg:px-6">
              <div className="rounded-2xl border border-tp-slate-200 bg-white">
                <div className="overflow-x-auto border-b border-tp-slate-100 px-2 pt-2 sm:px-4 sm:pt-3 lg:px-[18px] lg:pt-[18px]">
                  <div className="flex min-w-max items-center gap-0">
                    {appointmentTabs.map((tab) => {
                      const isActive = activeTab === tab.id
                      const Icon = tab.icon

                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setActiveTab(tab.id)}
                          className={cn(
                            "group relative flex shrink-0 flex-col gap-2 rounded-t-lg px-3 pb-0 pt-1 transition-colors",
                            isActive ? "text-tp-blue-500" : "text-tp-slate-700 hover:text-tp-blue-400",
                          )}
                          aria-pressed={isActive}
                        >
                          <span className="flex items-center gap-1.5 text-[14px] font-medium">
                            <Icon
                              size={20}
                              variant={isActive ? "Bulk" : "Linear"}
                              strokeWidth={isActive ? undefined : 1.5}
                              color={isActive ? "var(--tp-blue-500)" : "var(--tp-slate-600)"}
                            />
                            <span className={cn(isActive && "font-semibold")}>
                              {tab.label} ({tab.count})
                            </span>
                          </span>

                          <span
                            className={cn(
                              "h-[3px] w-full translate-y-px rounded-full transition-opacity",
                              isActive
                                ? "bg-tp-blue-500 opacity-100"
                                : "bg-tp-blue-500 opacity-0",
                            )}
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="px-3 py-4 sm:px-4 lg:px-[18px] lg:py-6">
                  <div className="mb-4 flex flex-row flex-nowrap items-center justify-between gap-[60px]">
                    <label className="relative w-[420px] min-w-[250px]">
                      <SearchNormal1
                        size={20}
                        variant="Linear"
                        strokeWidth={1.5}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-tp-slate-400"
                      />
                      <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by patient name / ID / mobile number"
                        className="h-[38px] w-full rounded-[10px] border border-tp-slate-200 bg-white pl-10 pr-3 text-sm text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/15"
                      />
                    </label>

                    <DateRangePicker
                      value={dateFilter}
                      onChange={(sel) => setDateFilter(sel.presetId)}
                      className="w-[180px] min-w-[150px] max-w-[180px]"
                    />
                  </div>

                  <div ref={tableOverflowRef} className="overflow-x-auto pb-1">
                    <div className="min-w-[920px]">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="rounded-[12px] bg-tp-slate-100">
                            <th className="rounded-l-[12px] px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[40px] max-w-[56px] w-[48px]">
                              #
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[140px] max-w-[220px]">
                              Name
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[140px] max-w-[200px]">
                              Contact
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[110px] max-w-[180px]">
                              <span className="inline-flex items-center gap-1.5">
                                Visit Type
                                <SortIndicators />
                              </span>
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 min-w-[110px] max-w-[160px]">
                              <span className="inline-flex items-center gap-1.5">
                                Slot
                                <SortIndicators />
                              </span>
                            </th>
                            <th className={cn(
                              "sticky right-0 z-20 w-px rounded-r-[12px] bg-tp-slate-100 px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700 xl:static",
                              isTableScrolled && "shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.10)]",
                            )}>
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {visibleAppointments.length === 0 ? (
                            <tr>
                              <td
                                colSpan={6}
                                className="px-4 py-12 text-center text-sm text-tp-slate-500"
                              >
                                No appointments found for this selection.
                              </td>
                            </tr>
                          ) : (
                            visibleAppointments.map((row) => (
                              <tr
                                key={row.id}
                                className="h-16 border-b border-tp-slate-100 last:border-b-0 hover:bg-tp-slate-50/50"
                              >
                                <td className="px-3 py-3 text-sm text-tp-slate-700">
                                  {row.serial}
                                </td>

                                <td className="px-3 py-3 align-middle">
                                  <p className="text-sm font-semibold text-tp-blue-500">
                                    {row.name}
                                  </p>
                                  <p className="mt-1 text-sm text-tp-slate-700">
                                    {row.gender}, {row.age}y
                                    {row.starred && (
                                      <span className="ml-1 text-[13px]">⭐</span>
                                    )}
                                  </p>
                                </td>

                                <td className="px-3 py-3 align-middle">
                                  <span className="text-sm text-tp-slate-700">
                                    {row.contact}
                                  </span>
                                  {row.contactBadge && (
                                    <span className="ml-2 inline-flex rounded-full bg-tp-blue-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                                      {row.contactBadge}
                                    </span>
                                  )}
                                </td>

                                <td className="px-3 py-3 align-middle text-sm text-tp-slate-700">
                                  <span>{row.visitType}</span>
                                  {row.visitBadge && (
                                    <span
                                      className={cn(
                                        "ml-2 inline-flex rounded-full px-2 py-[2px] text-[10px] font-semibold",
                                        row.visitBadge.tone === "warning"
                                          ? "border border-tp-warning-200 bg-tp-warning-50 text-tp-warning-700"
                                          : "bg-tp-success-100 text-tp-success-700",
                                      )}
                                    >
                                      {row.visitBadge.text}
                                    </span>
                                  )}
                                </td>

                                <td className="px-3 py-3 align-middle">
                                  <div className="text-sm text-tp-slate-700">
                                    <span className="inline-flex items-center gap-1">
                                      {row.slotTime}
                                      {row.hasVideo && (
                                        <Video
                                          size={13}
                                          variant="Bulk"
                                          color="var(--tp-blue-500)"
                                        />
                                      )}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs text-tp-slate-600">
                                    {row.slotDate}
                                  </p>
                                </td>

                                <td className={cn(
                                  "sticky right-0 z-10 w-px bg-white px-3 py-3 align-middle xl:static",
                                  isTableScrolled && "shadow-[-4px_0_8px_-2px_rgba(0,0,0,0.10)]",
                                )}>
                                  <div className="flex items-center gap-3 whitespace-nowrap">
                                    <TPSplitButton
                                      primaryAction={{
                                        label: "VoiceRx",
                                        onClick: () => {},
                                      }}
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
                                      style={{
                                        background: "linear-gradient(135deg, rgba(213,101,234,0.25) 0%, rgba(103,58,172,0.25) 45%, rgba(26,25,148,0.25) 100%)",
                                      }}
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
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

function AiSparkIcon() {
  return (
    <span className="inline-flex size-[28px] items-center justify-center">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ai-spark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D565EA" />
            <stop offset="45%" stopColor="#673AAC" />
            <stop offset="100%" stopColor="#1A1994" />
          </linearGradient>
        </defs>
        <path
          d="M18.0841 11.612C18.4509 11.6649 18.4509 12.3351 18.0841 12.388C14.1035 12.9624 12.9624 14.1035 12.388 18.0841C12.3351 18.4509 11.6649 18.4509 11.612 18.0841C11.0376 14.1035 9.89647 12.9624 5.91594 12.388C5.5491 12.3351 5.5491 11.6649 5.91594 11.612C9.89647 11.0376 11.0376 9.89647 11.612 5.91594C11.6649 5.5491 12.3351 5.5491 12.388 5.91594C12.9624 9.89647 14.1035 11.0376 18.0841 11.612Z"
          fill="url(#ai-spark-gradient)"
        />
      </svg>
    </span>
  )
}

function SortIndicators() {
  return (
    <span className="inline-flex flex-col items-center gap-[2px]">
      <span className="h-0 w-0 border-b-[5px] border-l-[4px] border-r-[4px] border-b-tp-slate-700 border-l-transparent border-r-transparent" />
      <span className="h-0 w-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent border-t-tp-slate-500" />
    </span>
  )
}

const DUMMY_CLINICS = [
  { id: "rajeshwar", name: "Rajeshwar Eye Clinic", selected: true },
  { id: "city", name: "City Medical Centre" },
  { id: "sunrise", name: "Sunrise Hospital" },
  { id: "apollo", name: "Apollo Clinic, Banjara Hills" },
  { id: "care", name: "Care Diagnostics" },
]

function TopHeader() {
  const [isClinicMenuOpen, setClinicMenuOpen] = useState(false)
  const [activeClinic, setActiveClinic] = useState(DUMMY_CLINICS[0].id)
  const clinicMenuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!clinicMenuRef.current?.contains(event.target as Node)) {
        setClinicMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [])

  const activeClinicName = DUMMY_CLINICS.find((c) => c.id === activeClinic)?.name ?? "Clinic"

  return (
    <header className="flex h-[62px] shrink-0 items-center border-b border-tp-slate-100 bg-tp-slate-0 px-4 py-2.5">
      <div className="flex min-w-0 flex-1 items-center">
        <img
          src={REF_LOGO}
          alt="TatvaPractice"
          className="h-8 w-auto object-contain"
        />
      </div>

      <div className="flex items-center gap-3.5">
        <button
          type="button"
          className="flex size-[42px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-600 transition-colors hover:bg-tp-slate-200"
          aria-label="Play tutorial"
        >
          <Video size={20} variant="Linear" strokeWidth={1.5} color="#BA7DE9" />
        </button>

        <button
          type="button"
          className="relative inline-flex size-[42px] items-center justify-center rounded-[10px] bg-tp-slate-100 text-tp-slate-700 transition-colors hover:bg-tp-slate-200"
          aria-label="Notifications"
        >
          <Notification size={20} variant="Linear" strokeWidth={1.5} />
          <span className="absolute -top-0.5 right-1 size-2.5 rounded-full border-2 border-white bg-red-500" />
        </button>

        <div className="h-[42px] w-px bg-tp-slate-300 opacity-80" />

        <div className="relative hidden sm:block" ref={clinicMenuRef}>
          <button
            type="button"
            onClick={() => setClinicMenuOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-tp-slate-100 px-4 py-2 transition-colors hover:bg-tp-slate-200"
            aria-label="Switch clinic"
            aria-expanded={isClinicMenuOpen}
          >
            <Hospital size={20} variant="Linear" strokeWidth={1.5} color="var(--tp-slate-700)" />
            <span className="max-w-[120px] truncate text-[14.7px] text-tp-slate-700">
              {activeClinicName.length > 18 ? activeClinicName.substring(0, 18) + "…" : activeClinicName}
            </span>
            <ChevronDown
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-200"
              style={{ transform: isClinicMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          {isClinicMenuOpen && (
            <div className="absolute right-0 top-[46px] z-50 min-w-[220px] overflow-hidden rounded-[12px] border border-tp-slate-200 bg-white shadow-[0_12px_24px_-4px_rgba(23,23,37,0.10)]">
              <p className="px-3 pb-1 pt-2.5 text-[11px] font-semibold uppercase tracking-wide text-tp-slate-400">
                Your Clinics
              </p>
              {DUMMY_CLINICS.map((clinic) => (
                <button
                  key={clinic.id}
                  type="button"
                  onClick={() => {
                    setActiveClinic(clinic.id)
                    setClinicMenuOpen(false)
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors",
                    clinic.id === activeClinic
                      ? "bg-tp-blue-50 text-tp-blue-700"
                      : "text-tp-slate-700 hover:bg-tp-slate-50",
                  )}
                >
                  <Hospital
                    size={16}
                    variant={clinic.id === activeClinic ? "Bulk" : "Linear"}
                    strokeWidth={1.5}
                    color={clinic.id === activeClinic ? "var(--tp-blue-500)" : "var(--tp-slate-500)"}
                  />
                  <span className="flex-1 truncate">{clinic.name}</span>
                  {clinic.id === activeClinic && (
                    <TickCircle size={14} variant="Bold" color="var(--tp-blue-500)" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          className="relative inline-flex size-[42px] items-center justify-center rounded-full transition-opacity hover:opacity-80"
          aria-label="Profile"
        >
          <span
            className="inline-flex size-full items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, #FFDE00, #FD5900) padding-box, linear-gradient(to bottom, #FFDE00, #FD5900) border-box",
            }}
          >
            <span className="inline-flex size-full overflow-hidden rounded-full border border-white">
              <img src={REF_AVATAR} alt="User" className="size-full object-cover" />
            </span>
          </span>
        </button>
      </div>
    </header>
  )
}

