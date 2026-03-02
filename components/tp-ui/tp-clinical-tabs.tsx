"use client"

import * as React from "react"
import { useRef, useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

/**
 * TPClinicalTabs — Tab system with icon state switching.
 *
 * Active  tab: Bulk (filled) icon, TP Blue 50 bg, TP Blue 700 text, bottom border
 * Inactive tab: Linear (outline) icon, transparent bg, TP Slate 500 text
 *
 * Tokens:
 *   Height (md)       42px
 *   Height (sm)       36px
 *   Icon size         18px
 *   Icon-label gap    6px
 *   Font              Inter 600, 13px
 *   Active bg         TP Blue 50
 *   Active text       TP Blue 700
 *   Active border     2px TP Blue 500
 *   Inactive text     TP Slate 500
 *   Count (active)    TP Blue 100 bg, TP Blue 600 text
 *   Count (inactive)  TP Slate 200 bg, TP Slate 600 text
 *   Transition        150ms ease
 */

interface ClinicalTab {
  id: string
  label: string
  count?: number
  /** Icon element for active (Bulk/filled) state */
  iconActive: React.ReactNode
  /** Icon element for inactive (Linear/outline) state */
  iconInactive: React.ReactNode
}

interface TPClinicalTabsProps {
  tabs: ClinicalTab[]
  activeTab: string
  onTabChange: (id: string) => void
  variant?: "underline" | "pill"
  size?: "sm" | "md"
  className?: string
}

export function TPClinicalTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = "underline",
  size = "md",
  className,
}: TPClinicalTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({})

  const updateIndicator = useCallback(() => {
    if (variant !== "underline" || !containerRef.current) return
    const activeEl = containerRef.current.querySelector<HTMLElement>(
      `[data-tab-id="${activeTab}"]`,
    )
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      })
    }
  }, [activeTab, variant])

  useEffect(() => {
    updateIndicator()
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [updateIndicator])

  if (variant === "pill") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg px-3 font-semibold transition-all duration-150",
                size === "sm" ? "h-9 text-xs" : "h-[42px] text-[13px]",
                isActive
                  ? "bg-tp-blue-50 text-tp-blue-700"
                  : "text-tp-slate-500 hover:bg-tp-slate-50 hover:text-tp-slate-700",
              )}
            >
              <span className="shrink-0">{isActive ? tab.iconActive : tab.iconInactive}</span>
              <span>{tab.label}</span>
              {tab.count != null && (
                <span
                  className={cn(
                    "ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                    isActive
                      ? "bg-tp-blue-100 text-tp-blue-600"
                      : "bg-tp-slate-200 text-tp-slate-600",
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  // Underline variant
  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="flex items-center gap-0 overflow-x-auto scrollbar-none"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              data-tab-id={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative inline-flex items-center gap-1.5 whitespace-nowrap px-4 font-semibold transition-colors duration-150",
                size === "sm" ? "h-9 text-xs" : "h-[42px] text-[13px]",
                isActive
                  ? "text-tp-blue-700"
                  : "text-tp-slate-500 hover:text-tp-slate-700",
              )}
            >
              <span className="shrink-0">{isActive ? tab.iconActive : tab.iconInactive}</span>
              <span>{tab.label}</span>
              {tab.count != null && (
                <span
                  className={cn(
                    "ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                    isActive
                      ? "bg-tp-blue-100 text-tp-blue-600"
                      : "bg-tp-slate-200 text-tp-slate-600",
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Bottom border line */}
      <div className="h-px bg-tp-slate-200" />

      {/* Animated indicator */}
      <div
        className="absolute bottom-0 h-0.5 bg-tp-blue-500 transition-all duration-200 ease-out rounded-full"
        style={indicatorStyle}
      />
    </div>
  )
}
