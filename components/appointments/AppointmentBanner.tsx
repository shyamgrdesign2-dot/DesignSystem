"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AppointmentBannerProps {
  title: string
  /** Two action buttons rendered on the right */
  actions?: ReactNode
  className?: string
}

/**
 * AppointmentBanner — The dark radial-gradient hero banner used on the
 * Appointments page. Rounded bottom corners (16px), 149px tall.
 *
 * Background: radial-gradient purple (#46286C → #25113E → #372153 → #6C4F90)
 * The card below should use -mt-[60px] so it overlaps this banner.
 */
export function AppointmentBanner({ title, actions, className }: AppointmentBannerProps) {
  return (
    <div
      className={cn(
        "relative h-[149px] w-full overflow-hidden rounded-b-[16px]",
        className,
      )}
      style={{
        background:
          "radial-gradient(99.09% 59.99% at 50% 55.44%, #46286C 0%, #25113E 39.08%, #372153 78.16%, #6C4F90 100%)",
      }}
    >
      {/* Geometric pattern — right-aligned, scales with banner height, aspect-ratio preserved */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 149"
        preserveAspectRatio="xMaxYMid meet"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-auto"
      >
        {/* Angular fill facets */}
        <polygon points="320,0 60,149 320,149" fill="white" fillOpacity="0.04" />
        <polygon points="320,0 140,149 320,149" fill="white" fillOpacity="0.045" />
        <polygon points="320,0 210,149 320,149" fill="white" fillOpacity="0.05" />
        <polygon points="320,0 265,149 320,149" fill="white" fillOpacity="0.055" />
        {/* Radiating stroke lines from top-right corner */}
        <g stroke="white" strokeWidth="0.8" fill="none">
          <line x1="320" y1="0" x2="0" y2="149" strokeOpacity="0.14" />
          <line x1="320" y1="0" x2="60" y2="149" strokeOpacity="0.13" />
          <line x1="320" y1="0" x2="120" y2="149" strokeOpacity="0.12" />
          <line x1="320" y1="0" x2="180" y2="149" strokeOpacity="0.11" />
          <line x1="320" y1="0" x2="240" y2="149" strokeOpacity="0.10" />
          <line x1="320" y1="0" x2="295" y2="149" strokeOpacity="0.09" />
        </g>
        {/* Horizontal edge lines */}
        <line x1="60" y1="149" x2="320" y2="149" stroke="white" strokeWidth="0.6" strokeOpacity="0.10" />
        <line x1="0" y1="0" x2="320" y2="0" stroke="white" strokeWidth="0.6" strokeOpacity="0.08" />
        {/* Cross diagonal for depth */}
        <line x1="320" y1="149" x2="120" y2="0" stroke="white" strokeWidth="0.6" strokeOpacity="0.07" />
        <line x1="320" y1="149" x2="200" y2="0" stroke="white" strokeWidth="0.6" strokeOpacity="0.06" />
      </svg>

      {/* Content */}
      <div className="relative h-full px-3 pt-6 sm:px-6 lg:px-[18px]">
        <div className="flex items-center justify-between gap-3">
          <h1 className="min-w-0 flex-1 font-heading text-[24px] font-bold leading-[1.15] text-white">
            {title}
          </h1>
          {actions && (
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
