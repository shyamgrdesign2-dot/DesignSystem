"use client"

import { Copy } from "iconsax-react"
import type { SemanticToken } from "@/lib/design-tokens"

interface SwatchProps {
  token: number | string
  value: string
  usage?: string
  onCopy: (text: string, message: string) => void
}

export function ColorSwatch({ token, value, usage, onCopy }: SwatchProps) {
  const isDark = typeof token === "number" ? token >= 500 : true

  return (
    <button
      className="group relative flex flex-col gap-2 cursor-pointer text-left"
      onClick={() => onCopy(value, `Copied ${value} (${token})`)}
      aria-label={`Copy color ${value}, token ${token}`}
    >
      <div
        className="h-24 w-full rounded-xl shadow-sm border border-foreground/5 transition-transform group-hover:scale-105 flex items-end justify-between p-3"
        style={{ backgroundColor: value }}
      >
        <span
          className={`text-xs font-bold font-mono ${isDark ? "text-primary-foreground/90" : "text-tp-slate-900/70"}`}
        >
          {token}
        </span>
        <div
          className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${isDark ? "bg-primary-foreground/20 text-primary-foreground" : "bg-foreground/10 text-tp-slate-900"}`}
        >
          <span className="inline-flex flex-shrink-0"><Copy size={14} variant="Linear" /></span>
        </div>
      </div>
      <div className="flex flex-col px-1">
        <span className="text-xs font-mono text-tp-slate-500 uppercase">{value}</span>
        {usage && (
          <span className="text-xs text-tp-slate-700 leading-tight mt-1">{usage}</span>
        )}
      </div>
    </button>
  )
}

interface SemanticSwatchProps {
  token: SemanticToken
  onCopy: (text: string, message: string) => void
}

export function SemanticSwatch({ token, onCopy }: SemanticSwatchProps) {
  const isGradient = token.value === "AI Gradient" || token.value.startsWith("rgba")
  const previewBg = isGradient
    ? "linear-gradient(91deg, #D565EA 3.04%, #673AAC 66.74%, #1A1994 130.45%)"
    : token.value

  return (
    <button
      className="group flex items-start gap-4 p-4 rounded-xl border border-tp-slate-200 hover:border-tp-slate-300 hover:bg-tp-slate-50 transition-all cursor-pointer bg-card text-left w-full"
      onClick={() => onCopy(token.token, `Copied ${token.token}`)}
      aria-label={`Copy ${token.token}`}
    >
      <div
        className="w-14 h-14 rounded-lg shadow-inner border border-foreground/5 flex-shrink-0"
        style={{ background: previewBg }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <code className="font-bold text-tp-slate-900 text-sm font-mono truncate">
            {token.token}
          </code>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium text-tp-slate-500 bg-tp-slate-100 px-2 py-0.5 rounded-full">
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: previewBg }}
            />
            {token.source}
          </span>
          {!isGradient && (
            <code className="text-xs font-mono text-tp-slate-400">
              {token.value}
            </code>
          )}
        </div>
        <p className="text-xs text-tp-slate-600 leading-relaxed">{token.usage}</p>
      </div>
      <div className="opacity-0 group-hover:opacity-100 text-tp-slate-400 self-center inline-flex flex-shrink-0">
        <span className="inline-flex flex-shrink-0"><Copy size={16} variant="Linear" /></span>
      </div>
    </button>
  )
}
