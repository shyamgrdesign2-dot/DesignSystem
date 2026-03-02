"use client"

import { useMemo, useState } from "react"
import {
  Activity,
  Bag2,
  Calendar,
  CalendarAdd,
  CalendarTick,
  CloseCircle,
  Clock,
  DocumentText,
  FolderOpen,
  Health,
  Hospital,
  MessageQuestion,
  MessageText,
  Monitor,
  More,
  Notification,
  Profile2User,
  ReceiptText,
  SearchNormal1,
  TickCircle,
  Video,
} from "iconsax-reactjs"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { SecondaryNavPanel, type NavItem } from "@/components/ui/secondary-nav-panel"

const REF_LOGO = "/assets/b38df11ad80d11b9c1d530142443a18c2f53d406.png"
const REF_AVATAR = "/assets/52cb18088c5b8a5db6a7711c9900d7d08a1bac42.png"
const REF_AI_GRADIENT = "/assets/45653018b6de55994a5e10063aed7adb826f72fd.png"
const REF_AI_INTERSECT = "/assets/30b3cc68c12f1d0465198c372c0dc9abfe19a63d.png"

type AppointmentStatus =
  | "queue"
  | "finished"
  | "cancelled"
  | "draft"
  | "pending-digitisation"

type BadgeTone = "warning" | "success"

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
    slotDate: "9th Oct 2024",
    hasVideo: true,
    status: "queue",
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
    slotDate: "9th Oct 2024",
    hasVideo: true,
    status: "queue",
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
    slotDate: "9th Oct 2024",
    hasVideo: true,
    status: "queue",
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
    slotDate: "9th Oct 2024",
    hasVideo: false,
    status: "queue",
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
  },
]

export function DrAgentPage() {
  const [activeRailItem, setActiveRailItem] = useState(navItems[0].id)
  const [activeTab, setActiveTab] = useState<AppointmentStatus>("queue")
  const [query, setQuery] = useState("")

  const visibleAppointments = useMemo(() => {
    return queueAppointments.filter((row) => {
      const tabMatch = row.status === activeTab
      const q = query.trim().toLowerCase()
      if (!tabMatch) return false
      if (!q) return true
      return (
        row.name.toLowerCase().includes(q) ||
        row.contact.toLowerCase().includes(q) ||
        row.visitType.toLowerCase().includes(q)
      )
    })
  }, [activeTab, query])

  return (
    <div className="min-h-screen bg-[#f4f4f8] text-tp-slate-900">
      <TopHeader />

      <div className="flex min-h-[calc(100vh-62px)]">
        <aside className="hidden shrink-0 md:block">
          <SecondaryNavPanel
            items={navItems}
            activeId={activeRailItem}
            onSelect={setActiveRailItem}
            variant="primary"
            renderIcon={({ item, isActive, iconSize }) => {
              const Icon = item.icon as React.ComponentType<any>
              return (
                <Icon
                  size={iconSize}
                  variant={isActive ? "Bulk" : "Linear"}
                  color={isActive ? "var(--tp-slate-0)" : "var(--tp-blue-500)"}
                />
              )
            }}
          />
        </aside>

        <main className="flex-1 overflow-hidden">
          <section className="h-full overflow-y-auto p-2 sm:p-4 lg:p-6">
            <div className="mb-3 flex items-center gap-2 overflow-x-auto md:hidden">
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

            <div className="relative overflow-hidden rounded-2xl border border-tp-slate-200 bg-white shadow-sm">
              <div className="relative h-[149px] overflow-hidden bg-[linear-gradient(123deg,#2e1a49_0%,#4f3278_48%,#7e5baa_100%)] px-4 py-6 sm:px-6 lg:px-[18px]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-45"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 16% 46%, rgba(255,255,255,0.15) 0, transparent 36%), radial-gradient(circle at 83% 22%, rgba(255,255,255,0.16) 0, transparent 38%), repeating-linear-gradient(124deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 24px)",
                  }}
                />

                <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <h1 className="font-heading text-[34px] font-extrabold leading-[1.05] text-white sm:text-[38px] lg:text-[40px]">
                    Your Appointments
                  </h1>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[10px] bg-white px-4 text-sm font-semibold text-[#4b4ad5] transition-colors hover:bg-[#f8f8fb]"
                    >
                      <Plus size={16} />
                      Add Appointment
                    </button>

                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-white text-sm font-semibold text-white transition-colors hover:bg-white/10 px-4"
                    >
                      <Activity size={18} variant="Linear" />
                      Start Walk-In
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative -mt-8 rounded-t-2xl border-t border-tp-slate-100 bg-white shadow-[0_-8px_18px_rgba(23,23,37,0.08)]">
                <div className="overflow-x-auto px-2 pt-2 sm:px-4 sm:pt-3 lg:px-[18px] lg:pt-[18px]">
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
                            "group relative flex shrink-0 flex-col gap-2 px-3 pb-2 pt-0",
                            isActive ? "text-tp-blue-500" : "text-tp-slate-700",
                          )}
                          aria-pressed={isActive}
                        >
                          <span className="flex items-center gap-1.5">
                            <Icon
                              size={20}
                              variant={isActive ? "Bulk" : "Linear"}
                              className={
                                isActive ? "text-tp-blue-500" : "text-tp-slate-600"
                              }
                            />
                            <span
                              className={cn(
                                "text-[14px] font-medium",
                                isActive && "font-semibold",
                              )}
                            >
                              {tab.label} ({tab.count})
                            </span>
                          </span>

                          <span
                            className={cn(
                              "h-[3px] w-full rounded-full transition-opacity",
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

                <div className="border-t border-tp-slate-100 px-3 py-4 sm:px-4 lg:px-[18px] lg:py-6">
                  <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <label className="relative w-full max-w-[411px]">
                      <SearchNormal1
                        size={20}
                        variant="Linear"
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-tp-slate-400"
                      />
                      <input
                        type="text"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Search by patient name"
                        className="h-[38px] w-full rounded-[10px] border border-tp-slate-200 bg-white pl-10 pr-3 text-sm text-tp-slate-700 placeholder:text-tp-slate-400 focus:border-tp-blue-300 focus:outline-none focus:ring-2 focus:ring-tp-blue-500/15"
                      />
                    </label>

                    <button
                      type="button"
                      className="inline-flex h-[38px] w-[162px] shrink-0 items-center gap-1.5 rounded-[10px] border border-tp-slate-200 bg-white px-3 text-[14px] font-medium text-tp-slate-700"
                    >
                      <Calendar size={18} variant="Linear" />
                      Today (9th Oct)
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <div className="min-w-[910px]">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="rounded-[12px] bg-tp-slate-100">
                            <th className="rounded-l-[12px] px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">
                              #
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">
                              Name
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">
                              Contact
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">
                              <span className="inline-flex items-center gap-1.5">
                                Visit Type
                                <span className="inline-flex flex-col -space-y-1 text-tp-slate-700">
                                  <ChevronUp size={10} />
                                  <ChevronDown size={10} />
                                </span>
                              </span>
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">
                              <span className="inline-flex items-center gap-1.5">
                                Slot
                                <span className="inline-flex flex-col -space-y-1 text-tp-slate-700">
                                  <ChevronUp size={10} />
                                  <ChevronDown size={10} />
                                </span>
                              </span>
                            </th>
                            <th className="px-3 py-3 text-left text-[12px] font-semibold uppercase text-tp-slate-700">
                              Action
                            </th>
                            <th
                              className="rounded-r-[12px] px-3 py-3"
                              aria-hidden="true"
                            />
                          </tr>
                        </thead>

                        <tbody>
                          {visibleAppointments.length === 0 ? (
                            <tr>
                              <td
                                colSpan={7}
                                className="px-4 py-12 text-center text-sm text-tp-slate-500"
                              >
                                No appointments found for this tab.
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
                                    {row.id === "apt-2" && (
                                      <span className="ml-1 text-[13px]">⭐</span>
                                    )}
                                  </p>
                                </td>

                                <td className="px-3 py-3 align-middle">
                                  <span className="text-sm text-tp-slate-700">
                                    {row.contact}
                                  </span>
                                  {row.contactBadge && (
                                    <span className="ml-2 inline-flex rounded-full bg-[#4b4ad5] px-1.5 py-0.5 text-[10px] font-semibold text-white">
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
                                          ? "bg-amber-100 text-amber-700"
                                          : "bg-emerald-100 text-emerald-700",
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
                                          variant="Linear"
                                          color="var(--tp-blue-500)"
                                        />
                                      )}
                                    </span>
                                  </div>
                                  <p className="mt-1 text-xs text-tp-slate-600">
                                    {row.slotDate}
                                  </p>
                                </td>

                                <td className="px-3 py-3 align-middle">
                                  <button
                                    type="button"
                                    className="inline-flex h-[38px] items-center rounded-[10px] border border-tp-blue-500 px-3 text-[14px] font-semibold text-tp-blue-500"
                                  >
                                    TabRx
                                    <span className="mx-3 h-5 w-px bg-tp-blue-500/20" />
                                    <ChevronDown size={14} />
                                  </button>
                                </td>

                                <td className="px-3 py-3 align-middle">
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      className="relative inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-[7.5px] bg-white"
                                      aria-label="AI action"
                                    >
                                      <div className="relative size-[18px]">
                                        <div className="absolute inset-0 overflow-hidden rounded-[inherit] opacity-30">
                                          <img
                                            src={REF_AI_GRADIENT}
                                            alt=""
                                            className="size-full object-cover"
                                          />
                                        </div>
                                        <img
                                          src={REF_AI_INTERSECT}
                                          alt=""
                                          className="absolute inset-0 size-[18px]"
                                        />
                                      </div>
                                    </button>

                                    <button
                                      type="button"
                                      className="inline-flex h-7 w-7 items-center justify-center rounded-md text-tp-slate-600 transition-colors hover:bg-tp-slate-100"
                                      aria-label="More options"
                                    >
                                      <More size={18} variant="Linear" />
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

function TopHeader() {
  return (
    <header className="flex h-[62px] shrink-0 items-center border-b border-[#f1f1f5] bg-white px-4 py-2.5">
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
          className="flex size-[42px] items-center justify-center rounded-full"
          aria-label="Play tutorial"
        >
          <span className="ml-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#8A4DBB]">
            <span className="h-0 w-0 border-y-[7px] border-l-[11px] border-r-0 border-y-transparent border-l-current" />
          </span>
        </button>

        <button
          type="button"
          className="relative inline-flex size-[42px] items-center justify-center rounded-xl bg-[#f1f1f5] text-[#454551]"
          aria-label="Notifications"
        >
          <Notification size={20} variant="Linear" />
          <span className="absolute -top-0.5 right-1 size-2.5 rounded-full border-2 border-white bg-red-500" />
        </button>

        <div className="h-[42px] w-px bg-[#d0d5dd] opacity-80" />

        <button
          type="button"
          className="hidden items-center gap-1.5 rounded-xl bg-[#f1f1f5] px-4 py-2 sm:inline-flex"
          aria-label="Switch clinic"
        >
          <Hospital size={20} variant="Linear" color="#454551" />
          <span className="max-w-[120px] truncate text-[14.7px] text-[#454551]">
            Rajeshwar eye cli...
          </span>
          <ChevronDown size={20} className="shrink-0 text-[#454551]" />
        </button>

        <button
          type="button"
          className="relative inline-flex size-[42px] items-center justify-center rounded-full"
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
