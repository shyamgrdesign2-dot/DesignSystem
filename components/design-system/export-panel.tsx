"use client"

import { useState, useRef, useEffect } from "react"
import {
  Import,
  DocumentText,
  ArrowDown2,
  Export,
  TickCircle,
  Star1,
} from "iconsax-react"
import {
  exportForFigma,
  exportFormats,
  type FigmaExportFormat,
} from "@/lib/export-figma"

export function ExportPanel({
  onExport,
}: {
  onExport?: (msg: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [exported, setExported] = useState<FigmaExportFormat | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleExport(format: FigmaExportFormat) {
    exportForFigma(format)
    setExported(format)
    const fmt = exportFormats.find((f) => f.id === format)
    onExport?.(`Exported ${fmt?.name} JSON`)
    setTimeout(() => setExported(null), 2000)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all shadow-sm text-white"
        style={{
          backgroundColor: "#4B4AD5",
          borderRadius: "12px",
          fontSize: "14px",
        }}
      >
        <span className="inline-flex flex-shrink-0"><Import size={18} variant="Linear" /></span>
        <span className="hidden sm:inline">Export Library</span>
        <span className="inline-flex flex-shrink-0"><ArrowDown2
          size={14}
          variant="Linear"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        /></span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[460px] rounded-xl border border-tp-slate-200 bg-card shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-4 border-b border-tp-slate-100 bg-tp-slate-50">
            <h3 className="text-sm font-bold text-tp-slate-900">
              Export Design System Library
            </h3>
            <p className="text-xs text-tp-slate-500 mt-1">
              Download in any format. The <strong>Complete Library</strong> is a
              single unified JSON with every token, spec, and guideline.
            </p>
          </div>

          <div className="p-3 flex flex-col gap-2">
            {exportFormats.map((fmt) => {
              const isRecommended = fmt.recommended
              return (
                <button
                  key={fmt.id}
                  onClick={() => handleExport(fmt.id)}
                  className={`group w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left ${
                    isRecommended
                      ? "border-tp-blue-200 bg-tp-blue-50/40 hover:bg-tp-blue-50"
                      : "border-tp-slate-100 hover:border-tp-blue-200 hover:bg-tp-blue-50"
                  }`}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor:
                        exported === fmt.id
                          ? "#ECFDF5"
                          : isRecommended
                            ? "#4B4AD5"
                            : "#EEEEFF",
                    }}
                  >
                    {exported === fmt.id ? (
                      <span className="inline-flex flex-shrink-0"><TickCircle size={18} variant="Bulk" style={{ color: "#10B981" }} /></span>
                    ) : isRecommended ? (
                      <span className="inline-flex flex-shrink-0"><Star1 size={18} variant="Bulk" style={{ color: "#FFFFFF" }} /></span>
                    ) : (
                      <span className="inline-flex flex-shrink-0"><DocumentText size={18} variant="Linear" style={{ color: "#4B4AD5" }} /></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-tp-slate-900">
                        {fmt.name}
                      </span>
                      {isRecommended && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full text-white"
                          style={{ backgroundColor: "#4B4AD5" }}
                        >
                          Recommended
                        </span>
                      )}
                      <code className="text-[10px] font-mono text-tp-slate-400 bg-tp-slate-100 px-1.5 py-0.5 rounded">
                        .json
                      </code>
                    </div>
                    <p className="text-xs text-tp-slate-500 mt-0.5 leading-relaxed">
                      {fmt.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-mono text-tp-slate-400">
                      {fmt.filename}
                    </span>
                  </div>
                  <Export
                    size={14}
                    variant="Linear"
                    className="text-tp-slate-300 group-hover:text-tp-blue-400 transition-colors flex-shrink-0 mt-1"
                  />
                </button>
              )
            })}
          </div>

          <div className="px-5 py-3 border-t border-tp-slate-100 bg-tp-slate-50">
            <p className="text-[11px] text-tp-slate-400 leading-relaxed">
              <strong>v2.2.0</strong> — Includes {" "}
              color primitives, semantic tokens, typography, spacing, radius,
              shadows, gradients, grid, and CTA component specs. For Figma
              plugin import, use{" "}
              <a
                href="https://tokens.studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-tp-blue-500 underline underline-offset-2 hover:text-tp-blue-600"
              >
                Tokens Studio
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
