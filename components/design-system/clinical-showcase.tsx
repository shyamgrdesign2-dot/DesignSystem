"use client"

import { useState } from "react"
import {
  People,
  TickCircle,
  CloseCircle,
  Edit2,
  Clock,
  Eye,
  Notification,
  Setting2,
  Calendar,
  Trash,
  Edit,
} from "iconsax-react"

import { TPTopNavBar, defaultNavActions } from "@/components/tp-ui/tp-top-nav-bar"
import { TPAppointmentBanner } from "@/components/tp-ui/tp-appointment-banner"
import { TPClinicalTabs } from "@/components/tp-ui/tp-clinical-tabs"
import { TPSearchFilterBar } from "@/components/tp-ui/tp-search-filter-bar"
import { TPStatusBadge } from "@/components/tp-ui/tp-status-badge"
import { TPClinicalTable } from "@/components/tp-ui/tp-clinical-table"
import { TPPatientInfoHeader } from "@/components/tp-ui/tp-patient-info-header"

// ═════════════════════════════════════════════════════════════
// 1. Top Nav Bar Showcase
// ═════════════════════════════════════════════════════════════

export function TopNavBarShowcase() {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-tp-slate-400">
        Top Navigation Bar
      </h3>
      <p className="mb-4 text-xs text-tp-slate-400">
        56px height, white bg, TP Slate 200 bottom border. Action icons: 20px Iconsax, 32px hover target. Profile avatar: 32px.
      </p>

      <div className="space-y-4">
        {/* Default variant */}
        <div className="overflow-hidden rounded-xl border border-tp-slate-200">
          <TPTopNavBar
            title="TatvaPractice"
            subtitle="Clinical Management"
            actions={defaultNavActions()}
            profile={{ name: "Dr. Ananya Sharma", initials: "AS" }}
          />
        </div>

        {/* Clinical variant with patient info */}
        <div className="overflow-hidden rounded-xl border border-tp-slate-200">
          <TPTopNavBar
            variant="clinical"
            title="RX Workspace"
            subtitle="Prescription Pad"
            patient={{
              name: "Rajesh Kumar",
              age: 34,
              gender: "Male",
              bloodGroup: "B+",
              uhid: "TP-2024-00142",
            }}
            actions={[
              { icon: <Notification size={18} variant="Linear" />, label: "Notifications", badge: 3 },
              { icon: <Setting2 size={18} variant="Linear" />, label: "Settings" },
            ]}
            profile={{ name: "Dr. Ananya Sharma" }}
          />
        </div>
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
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-tp-slate-400">
        Appointment Banner
      </h3>
      <p className="mb-4 text-xs text-tp-slate-400">
        Gradient hero banner (Blue 600→Violet 500), 16px radius, SVG dot texture at 6% opacity. CTA: white bg, Blue 600 text, 10px radius.
      </p>

      <div className="space-y-4">
        <TPAppointmentBanner
          title="Your Appointments"
          subtitle="Manage today's schedule, track patient queue, and stay on top."
          ctaLabel="New Appointment"
          stats={[
            { label: "In Queue", value: 5 },
            { label: "Finished", value: 3 },
            { label: "Total", value: 16 },
          ]}
        />

        <TPAppointmentBanner
          title="Weekly Schedule"
          subtitle="Plan ahead with your full weekly view."
          ctaLabel="View Calendar"
          variant="schedule"
        />

        <TPAppointmentBanner
          title="Clinic Analytics"
          subtitle="Track performance metrics and patient trends."
          ctaLabel="View Report"
          variant="analytics"
          stats={[
            { label: "This Week", value: 87 },
            { label: "Avg Wait", value: "12min" },
          ]}
        />
      </div>
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
      count: 5,
      iconActive: <People size={18} variant="Bulk" />,
      iconInactive: <People size={18} variant="Linear" />,
    },
    {
      id: "finished",
      label: "Finished",
      count: 3,
      iconActive: <TickCircle size={18} variant="Bulk" />,
      iconInactive: <TickCircle size={18} variant="Linear" />,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      count: 2,
      iconActive: <CloseCircle size={18} variant="Bulk" />,
      iconInactive: <CloseCircle size={18} variant="Linear" />,
    },
    {
      id: "draft",
      label: "Draft",
      count: 2,
      iconActive: <Edit2 size={18} variant="Bulk" />,
      iconInactive: <Edit2 size={18} variant="Linear" />,
    },
    {
      id: "pending",
      label: "Pending",
      count: 3,
      iconActive: <Clock size={18} variant="Bulk" />,
      iconInactive: <Clock size={18} variant="Linear" />,
    },
  ]

  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-tp-slate-400">
        Clinical Tabs
      </h3>
      <p className="mb-4 text-xs text-tp-slate-400">
        Active: Bulk icon + Blue 50 bg + Blue 700 text + 2px bottom border. Inactive: Linear icon + Slate 500 text. Count badge: Blue 100/600 active, Slate 200/600 inactive.
      </p>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-[11px] font-medium text-tp-slate-500">Underline variant</p>
          <TPClinicalTabs
            tabs={tabs}
            activeTab={activeUnderline}
            onTabChange={setActiveUnderline}
            variant="underline"
          />
        </div>

        <div>
          <p className="mb-2 text-[11px] font-medium text-tp-slate-500">Pill variant</p>
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
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-tp-slate-400">
        Search & Filter Bar
      </h3>
      <p className="mb-4 text-xs text-tp-slate-400">
        Search: Slate 50 bg, Slate 200 border, 10px radius, 42px height. Filters: white bg, 10px radius, 36px height. Gap: 8px.
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
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-tp-slate-400">
        Status Badges
      </h3>
      <p className="mb-4 text-xs text-tp-slate-400">
        Pill-shaped (9999px radius). SM: 22px/10px, MD: 26px/12px. Leading 6px dot. Color-coded per status.
      </p>

      <div className="space-y-4">
        <div>
          <p className="mb-2 text-[11px] font-medium text-tp-slate-500">Medium (default)</p>
          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => (
              <TPStatusBadge key={status} status={status} />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-medium text-tp-slate-500">Small</p>
          <div className="flex flex-wrap gap-2">
            {allStatuses.map((status) => (
              <TPStatusBadge key={status} status={status} size="sm" />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-[11px] font-medium text-tp-slate-500">Without dot</p>
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

export function ClinicalTableShowcase() {
  const [selected, setSelected] = useState<string[]>([])

  type SampleRow = {
    id: string
    patient: string
    age: number
    time: string
    status: "queue" | "finished" | "cancelled" | "pending"
    doctor: string
  }

  const data: SampleRow[] = [
    { id: "1", patient: "Rajesh Kumar", age: 34, time: "09:00 AM", status: "queue", doctor: "Dr. Sharma" },
    { id: "2", patient: "Priya Patel", age: 28, time: "09:15 AM", status: "queue", doctor: "Dr. Sharma" },
    { id: "3", patient: "Mohammed Ali", age: 52, time: "09:30 AM", status: "finished", doctor: "Dr. Sharma" },
    { id: "4", patient: "Lakshmi Devi", age: 45, time: "10:00 AM", status: "pending", doctor: "Dr. Mehta" },
    { id: "5", patient: "Arjun Singh", age: 19, time: "10:15 AM", status: "cancelled", doctor: "Dr. Desai" },
  ]

  const columns = [
    {
      id: "patient",
      header: "Patient",
      sortable: true,
      sortValue: (row: SampleRow) => row.patient,
      accessor: (row: SampleRow) => (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tp-blue-100 text-tp-blue-600 text-[10px] font-semibold">
            {row.patient.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-medium text-tp-slate-900">{row.patient}</p>
            <p className="text-[11px] text-tp-slate-500">{row.age}y</p>
          </div>
        </div>
      ),
    },
    {
      id: "time",
      header: "Time",
      width: 100,
      sortable: true,
      sortValue: (row: SampleRow) => row.time,
      accessor: (row: SampleRow) => <span className="text-sm">{row.time}</span>,
    },
    {
      id: "doctor",
      header: "Doctor",
      accessor: (row: SampleRow) => <span className="text-sm">{row.doctor}</span>,
    },
    {
      id: "status",
      header: "Status",
      width: 130,
      accessor: (row: SampleRow) => <TPStatusBadge status={row.status} size="sm" />,
    },
    {
      id: "actions",
      header: "Actions",
      width: 80,
      align: "center" as const,
      sticky: true,
      accessor: (row: SampleRow) => (
        <div className="flex justify-center gap-1">
          <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200">
            <Eye size={14} variant="Linear" />
          </button>
          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-tp-error-500 hover:bg-tp-error-50">
            <Trash size={14} variant="Linear" />
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-tp-slate-400">
        Clinical Data Table
      </h3>
      <p className="mb-4 text-xs text-tp-slate-400">
        Header: Slate 50, 11px uppercase. Rows: white, hover Slate 50, 1px Slate 100 border. Selected: Blue 50. Checkbox: 20px, 6px radius, Blue 500.
      </p>

      <TPClinicalTable
        columns={columns}
        data={data}
        rowKey={(row) => row.id}
        selectedRows={selected}
        onRowSelect={setSelected}
        selectable
      />
    </div>
  )
}

// ═════════════════════════════════════════════════════════════
// 7. Patient Info Header Showcase
// ═════════════════════════════════════════════════════════════

export function PatientInfoHeaderShowcase() {
  return (
    <div>
      <h3 className="mb-1 text-xs font-semibold uppercase tracking-wider text-tp-slate-400">
        Patient Info Header
      </h3>
      <p className="mb-4 text-xs text-tp-slate-400">
        48px height, white bg. Name: Inter 600 14px. Demographics: Inter 400 12px, Slate 500. Blood group: Error 50/600 pill. UHID: Mono 11px.
      </p>

      <div className="space-y-3">
        <div className="overflow-hidden rounded-xl border border-tp-slate-200">
          <TPPatientInfoHeader
            patient={{
              name: "Rajesh Kumar",
              age: 34,
              gender: "Male",
              bloodGroup: "B+",
              uhid: "TP-2024-00142",
              phone: "+91 98765 43210",
            }}
            visitInfo={{
              type: "OPD",
              date: "24 Jun 2025",
              tokenNumber: 3,
            }}
          />
        </div>

        <div className="overflow-hidden rounded-xl border border-tp-slate-200">
          <TPPatientInfoHeader
            patient={{
              name: "Priya Patel",
              age: 28,
              gender: "Female",
              bloodGroup: "O+",
              uhid: "TP-2024-00298",
            }}
            visitInfo={{
              type: "Teleconsult",
              date: "24 Jun 2025",
            }}
          />
        </div>
      </div>
    </div>
  )
}
