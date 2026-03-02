"use client"

import * as React from "react"
import { Notification, Setting2, SearchNormal1, HambergerMenu } from "iconsax-react"
import { cn } from "@/lib/utils"

/**
 * TPTopNavBar — Clinical application header bar.
 *
 * Tokens:
 *   Height        56px
 *   Background    TP Slate 0 (white)
 *   Border        1px TP Slate 200 (bottom)
 *   Action icon   20px, TP Slate 500 → TP Slate 700 hover, 32px circle bg
 *   Badge dot     8px, TP Error 500
 *   Avatar        32px, rounded-full
 *   Padding       0 24px (desktop), 0 16px (mobile)
 */

interface NavAction {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  badge?: number
}

interface TPTopNavBarProps {
  variant?: "default" | "clinical"
  /** Left section content */
  leftContent?: React.ReactNode
  /** App title */
  title?: string
  subtitle?: string
  /** Action icons in the right area */
  actions?: NavAction[]
  /** Profile display */
  profile?: {
    name: string
    avatarUrl?: string
    initials?: string
  }
  /** Patient context — shown in clinical variant */
  patient?: {
    name: string
    age: number
    gender: string
    bloodGroup?: string
    uhid?: string
  }
  /** Optional search area */
  showSearch?: boolean
  onSearchClick?: () => void
  /** Mobile hamburger */
  onMenuClick?: () => void
  className?: string
}

export function TPTopNavBar({
  variant = "default",
  leftContent,
  title,
  subtitle,
  actions = [],
  profile,
  patient,
  showSearch = false,
  onSearchClick,
  onMenuClick,
  className,
}: TPTopNavBarProps) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between border-b border-tp-slate-200 bg-white px-4 lg:px-6",
        className,
      )}
    >
      {/* ── Left Section ── */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger */}
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700 transition-colors lg:hidden"
            aria-label="Open menu"
          >
            <HambergerMenu size={20} variant="Linear" />
          </button>
        )}

        {leftContent ? (
          leftContent
        ) : (
          <div className="flex items-center gap-2 min-w-0">
            {/* Logo / brand mark */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tp-blue-500">
              <span className="text-xs font-bold text-white font-heading">TP</span>
            </div>
            {title && (
              <div className="min-w-0">
                <h1 className="text-sm font-semibold text-tp-slate-900 truncate font-heading">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-[11px] text-tp-slate-500 truncate">{subtitle}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Patient info (clinical variant) */}
        {variant === "clinical" && patient && (
          <div className="ml-4 hidden items-center gap-2 rounded-lg bg-tp-slate-50 px-3 py-1.5 lg:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-tp-blue-100 text-tp-blue-600">
              <span className="text-[10px] font-semibold">
                {patient.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-tp-slate-900 truncate">{patient.name}</p>
              <p className="text-[10px] text-tp-slate-500">
                {patient.age}y {patient.gender}
                {patient.bloodGroup && (
                  <span className="ml-1.5 inline-flex items-center rounded-full bg-tp-error-50 px-1.5 text-[9px] font-medium text-tp-error-600">
                    {patient.bloodGroup}
                  </span>
                )}
                {patient.uhid && (
                  <span className="ml-1.5 font-mono text-tp-slate-400">{patient.uhid}</span>
                )}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Right Section ── */}
      <div className="flex items-center gap-1">
        {/* Search trigger */}
        {showSearch && (
          <button
            type="button"
            onClick={onSearchClick}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700 transition-colors"
            aria-label="Search"
          >
            <SearchNormal1 size={18} variant="Linear" />
          </button>
        )}

        {/* Action icons */}
        {actions.map((action, index) => (
          <button
            key={index}
            type="button"
            onClick={action.onClick}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700 transition-colors"
            aria-label={action.label}
          >
            {action.icon}
            {action.badge != null && action.badge > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-tp-error-500 px-1 text-[9px] font-bold text-white">
                {action.badge > 9 ? "9+" : action.badge}
              </span>
            )}
          </button>
        ))}

        {/* Divider */}
        {actions.length > 0 && profile && (
          <div className="mx-1 h-6 w-px bg-tp-slate-200" />
        )}

        {/* Profile */}
        {profile && (
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-tp-slate-50 transition-colors"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-tp-blue-100 text-tp-blue-600">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold">
                  {profile.initials || profile.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              )}
            </div>
            <span className="hidden text-xs font-medium text-tp-slate-700 lg:block">
              {profile.name}
            </span>
          </button>
        )}
      </div>
    </header>
  )
}

/**
 * Default action configurations for common use cases.
 */
export function defaultNavActions(): NavAction[] {
  return [
    {
      icon: <Notification size={18} variant="Linear" />,
      label: "Notifications",
      badge: 3,
    },
    {
      icon: <Setting2 size={18} variant="Linear" />,
      label: "Settings",
    },
  ]
}
