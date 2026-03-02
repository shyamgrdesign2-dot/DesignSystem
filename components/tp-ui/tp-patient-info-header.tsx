"use client"

import * as React from "react"
import { Call, Calendar, More } from "iconsax-react"
import { cn } from "@/lib/utils"

/**
 * TPPatientInfoHeader — Patient context bar for the RxPad.
 *
 * Tokens:
 *   Height         48px
 *   Background     TP Slate 0 (white)
 *   Name           Inter 600, 14px, TP Slate 900
 *   Demographics   Inter 400, 12px, TP Slate 500, middle-dot separated
 *   Blood group    pill badge TP Error 50/600
 *   UHID           JetBrains Mono 11px, TP Slate 400
 *   Avatar         36px rounded-full
 *   Padding        0 16px
 */

interface TPPatientInfoHeaderProps {
  patient: {
    name: string
    age: number
    gender: "Male" | "Female" | "Other"
    bloodGroup?: string
    uhid?: string
    phone?: string
    avatarUrl?: string
  }
  visitInfo?: {
    type: string
    date: string
    tokenNumber?: number
  }
  actions?: React.ReactNode
  className?: string
}

export function TPPatientInfoHeader({
  patient,
  visitInfo,
  actions,
  className,
}: TPPatientInfoHeaderProps) {
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      className={cn(
        "flex h-12 items-center gap-3 border-b border-tp-slate-200 bg-white px-4",
        className,
      )}
    >
      {/* Avatar */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-tp-blue-100 text-tp-blue-600">
        {patient.avatarUrl ? (
          <img
            src={patient.avatarUrl}
            alt={patient.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-xs font-semibold">{initials}</span>
        )}
      </div>

      {/* Patient info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-tp-slate-900 truncate">
            {patient.name}
          </h3>
          {patient.bloodGroup && (
            <span className="inline-flex items-center rounded-full bg-tp-error-50 px-2 py-0.5 text-[10px] font-semibold text-tp-error-600">
              {patient.bloodGroup}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-tp-slate-500">
          <span>
            {patient.age}y, {patient.gender}
          </span>
          {patient.uhid && (
            <>
              <span className="text-tp-slate-300">|</span>
              <span className="font-mono text-[11px] text-tp-slate-400">{patient.uhid}</span>
            </>
          )}
          {patient.phone && (
            <>
              <span className="text-tp-slate-300">|</span>
              <span className="hidden sm:inline">{patient.phone}</span>
            </>
          )}
        </div>
      </div>

      {/* Visit info */}
      {visitInfo && (
        <div className="hidden items-center gap-2 md:flex">
          {visitInfo.tokenNumber != null && (
            <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-lg bg-tp-blue-50 px-2 text-xs font-bold text-tp-blue-600">
              #{visitInfo.tokenNumber}
            </span>
          )}
          <span className="inline-flex items-center gap-1 rounded-lg bg-tp-slate-50 px-2.5 py-1 text-[11px] font-medium text-tp-slate-600">
            <Calendar size={12} variant="Linear" />
            {visitInfo.date}
          </span>
          <span className="inline-flex items-center rounded-lg bg-tp-blue-50 px-2.5 py-1 text-[11px] font-semibold text-tp-blue-600">
            {visitInfo.type}
          </span>
        </div>
      )}

      {/* Quick actions */}
      {patient.phone && (
        <button
          type="button"
          className="hidden h-8 w-8 items-center justify-center rounded-lg text-tp-slate-400 hover:bg-tp-slate-100 hover:text-tp-slate-600 transition-colors sm:flex"
          aria-label="Call patient"
        >
          <Call size={16} variant="Linear" />
        </button>
      )}

      {/* Custom actions */}
      {actions}

      {/* More options */}
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-tp-slate-400 hover:bg-tp-slate-100 hover:text-tp-slate-600 transition-colors"
        aria-label="More options"
      >
        <More size={16} variant="Linear" />
      </button>
    </div>
  )
}
