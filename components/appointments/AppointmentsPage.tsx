"use client"

import { useState, useMemo, useCallback } from "react"
import {
  People,
  TickCircle,
  CloseCircle,
  Edit2,
  Clock,
  Notification,
  Setting2,
  Add,
  Calendar,
  Eye,
  Trash,
  Edit,
  Call,
} from "iconsax-react"

import { TPTopNavBar, defaultNavActions } from "@/components/tp-ui/tp-top-nav-bar"
import { TPAppointmentBanner } from "@/components/tp-ui/tp-appointment-banner"
import { TPClinicalTabs } from "@/components/tp-ui/tp-clinical-tabs"
import { TPSearchFilterBar } from "@/components/tp-ui/tp-search-filter-bar"
import { TPClinicalTable } from "@/components/tp-ui/tp-clinical-table"
import { TPStatusBadge } from "@/components/tp-ui/tp-status-badge"

import type { Appointment, AppointmentStatus, FilterOption } from "./types"
import { APPOINTMENT_TYPE_RULES } from "./types"
import {
  sampleAppointments,
  appointmentTabs,
  appointmentFilters,
} from "./sample-data"

/**
 * AppointmentsPage — Full appointments management page.
 * ─────────────────────────────────────────────────────
 * Composition: TopNavBar → Banner → Tabs → Search+Filter → Table
 *
 * State management:
 *   activeTab       → Tab filter (queue, finished, cancelled, draft, pending)
 *   searchQuery     → Text search across patient name, doctor, UHID
 *   filters         → Department, Doctor, Type filter dropdowns
 *   selectedRows    → Multi-select for bulk actions
 */

// ─── Tab icon configurations ────────────────────────────────

const tabIcons = {
  queue: {
    active: <People size={18} variant="Bulk" />,
    inactive: <People size={18} variant="Linear" />,
  },
  finished: {
    active: <TickCircle size={18} variant="Bulk" />,
    inactive: <TickCircle size={18} variant="Linear" />,
  },
  cancelled: {
    active: <CloseCircle size={18} variant="Bulk" />,
    inactive: <CloseCircle size={18} variant="Linear" />,
  },
  draft: {
    active: <Edit2 size={18} variant="Bulk" />,
    inactive: <Edit2 size={18} variant="Linear" />,
  },
  pending: {
    active: <Clock size={18} variant="Bulk" />,
    inactive: <Clock size={18} variant="Linear" />,
  },
}

// ─── Table columns ──────────────────────────────────────────

function getTableColumns() {
  return [
    {
      id: "token",
      header: "#",
      width: 50,
      accessor: (row: Appointment) => (
        <span className="text-xs font-mono text-tp-slate-400">
          {row.tokenNumber != null ? `#${row.tokenNumber}` : "—"}
        </span>
      ),
    },
    {
      id: "patient",
      header: "Patient",
      minWidth: 200,
      sortable: true,
      sortValue: (row: Appointment) => row.patient.name,
      accessor: (row: Appointment) => (
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-tp-blue-100 text-tp-blue-600">
            <span className="text-[11px] font-semibold">
              {row.patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-tp-slate-900 truncate">{row.patient.name}</p>
            <p className="text-[11px] text-tp-slate-500">
              {row.patient.age}y, {row.patient.gender}
              {row.patient.uhid && (
                <span className="ml-1 font-mono text-tp-slate-400">{row.patient.uhid}</span>
              )}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "time",
      header: "Time",
      width: 100,
      sortable: true,
      sortValue: (row: Appointment) => row.scheduledTime,
      accessor: (row: Appointment) => (
        <div>
          <p className="text-sm font-medium text-tp-slate-900">{row.scheduledTime}</p>
          <p className="text-[11px] text-tp-slate-400">{row.duration} min</p>
        </div>
      ),
    },
    {
      id: "type",
      header: "Type",
      width: 120,
      accessor: (row: Appointment) => {
        const typeRule = APPOINTMENT_TYPE_RULES[row.type]
        return (
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${typeRule.bg} ${typeRule.text}`}>
            {row.type}
          </span>
        )
      },
    },
    {
      id: "doctor",
      header: "Doctor",
      minWidth: 160,
      sortable: true,
      sortValue: (row: Appointment) => row.doctor,
      accessor: (row: Appointment) => (
        <div>
          <p className="text-sm text-tp-slate-900">{row.doctor}</p>
          <p className="text-[11px] text-tp-slate-400">{row.department}</p>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      width: 130,
      accessor: (row: Appointment) => (
        <TPStatusBadge status={row.status} size="sm" />
      ),
    },
    {
      id: "payment",
      header: "Payment",
      width: 100,
      accessor: (row: Appointment) => (
        <div>
          <p className="text-sm font-medium text-tp-slate-900">
            {row.fee ? `\u20B9${row.fee}` : "—"}
          </p>
          {row.paymentStatus && (
            <p className={`text-[11px] font-medium ${
              row.paymentStatus === "paid" ? "text-tp-success-600" :
              row.paymentStatus === "pending" ? "text-tp-warning-600" :
              "text-tp-slate-400"
            }`}>
              {row.paymentStatus.charAt(0).toUpperCase() + row.paymentStatus.slice(1)}
            </p>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      width: 100,
      sticky: true,
      align: "center" as const,
      accessor: (row: Appointment) => (
        <div className="flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200 transition-colors"
            aria-label="View details"
          >
            <Eye size={14} variant="Linear" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200 transition-colors"
            aria-label="Edit"
          >
            <Edit size={14} variant="Linear" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-tp-error-500 hover:bg-tp-error-50 transition-colors"
            aria-label="Cancel"
          >
            <Trash size={14} variant="Linear" />
          </button>
        </div>
      ),
    },
  ]
}

// ─── Main Component ─────────────────────────────────────────

export function AppointmentsPage() {
  // ── State ──
  const [activeTab, setActiveTab] = useState<AppointmentStatus | "all">("queue")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    department: "all",
    doctor: "all",
    type: "all",
  })

  // ── Filter chain ──
  const filteredAppointments = useMemo(() => {
    let result = [...sampleAppointments]

    // Tab filter
    if (activeTab !== "all") {
      result = result.filter((a) => a.status === activeTab)
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.patient.name.toLowerCase().includes(q) ||
          a.doctor.toLowerCase().includes(q) ||
          a.patient.uhid?.toLowerCase().includes(q) ||
          a.department.toLowerCase().includes(q),
      )
    }

    // Dropdown filters
    if (filterValues.department && filterValues.department !== "all") {
      result = result.filter((a) => a.department === filterValues.department)
    }
    if (filterValues.doctor && filterValues.doctor !== "all") {
      result = result.filter((a) => a.doctor === filterValues.doctor)
    }
    if (filterValues.type && filterValues.type !== "all") {
      result = result.filter((a) => a.type === filterValues.type)
    }

    return result
  }, [activeTab, searchQuery, filterValues])

  // ── Tabs with dynamic counts ──
  const tabs = useMemo(() => {
    return appointmentTabs.map((tab) => ({
      id: tab.id,
      label: tab.label,
      count: sampleAppointments.filter((a) => a.status === tab.id).length,
      iconActive: tabIcons[tab.id as keyof typeof tabIcons]?.active || <Clock size={18} variant="Bulk" />,
      iconInactive: tabIcons[tab.id as keyof typeof tabIcons]?.inactive || <Clock size={18} variant="Linear" />,
    }))
  }, [])

  // ── Filters with current values ──
  const filters: FilterOption[] = useMemo(
    () =>
      appointmentFilters.map((f) => ({
        ...f,
        selectedValue: filterValues[f.id] || "all",
      })),
    [filterValues],
  )

  const handleFilterChange = useCallback((filterId: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [filterId]: value }))
  }, [])

  // ── Banner stats ──
  const bannerStats = useMemo(() => [
    { label: "In Queue", value: sampleAppointments.filter((a) => a.status === "queue").length },
    { label: "Finished", value: sampleAppointments.filter((a) => a.status === "finished").length },
    { label: "Total Today", value: sampleAppointments.length },
  ], [])

  const columns = useMemo(() => getTableColumns(), [])

  return (
    <div className="flex h-screen flex-col bg-tp-slate-50">
      {/* ── Top Nav Bar ── */}
      <TPTopNavBar
        title="TatvaPractice"
        subtitle="Clinical Management"
        actions={defaultNavActions()}
        profile={{
          name: "Dr. Ananya Sharma",
          initials: "AS",
        }}
      />

      {/* ── Content ── */}
      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-[1400px] px-4 py-5 lg:px-6">
          {/* Banner */}
          <TPAppointmentBanner
            title="Your Appointments"
            subtitle="Manage today's schedule, track patient queue, and stay on top of your clinical workflow."
            ctaLabel="New Appointment"
            onCtaClick={() => {}}
            stats={bannerStats}
            className="mb-5"
          />

          {/* Tabs */}
          <TPClinicalTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={(id) => {
              setActiveTab(id as AppointmentStatus | "all")
              setSelectedRows([])
            }}
            variant="underline"
            className="mb-4"
          />

          {/* Search + Filters */}
          <TPSearchFilterBar
            searchPlaceholder="Search patients, doctors, UHID..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFilterChange={handleFilterChange}
            actions={
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-tp-blue-500 px-4 text-xs font-semibold text-white shadow-sm transition-all hover:bg-tp-blue-600 active:scale-[0.98]"
              >
                <Add size={16} />
                <span className="hidden sm:inline">Add Appointment</span>
              </button>
            }
            className="mb-4"
          />

          {/* Data Table */}
          <TPClinicalTable
            columns={columns}
            data={filteredAppointments}
            rowKey={(row) => row.id}
            selectedRows={selectedRows}
            onRowSelect={setSelectedRows}
            selectable
            emptyMessage="No appointments found for the selected filters."
          />

          {/* Footer info */}
          <div className="mt-3 flex items-center justify-between text-xs text-tp-slate-400">
            <p>
              Showing {filteredAppointments.length} of {sampleAppointments.length} appointments
            </p>
            {selectedRows.length > 0 && (
              <p className="font-medium text-tp-blue-600">
                {selectedRows.length} selected
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
