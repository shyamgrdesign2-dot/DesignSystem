"use client"

import { useState } from "react"
import { IconFamilyShowcase } from "@/components/design-system/icon-family-showcase"

// ─── SHADOWS (improved with layered, natural depth) ───

const shadowScale = [
  { token: "TP.shadow.xs", name: "shadow-xs", value: "0 1px 2px 0 rgba(23,23,37,0.04)", usage: "Subtle lift for inputs, small cards", cssClass: "shadow-xs" },
  { token: "TP.shadow.sm", name: "shadow-sm", value: "0 1px 3px 0 rgba(23,23,37,0.08), 0 1px 2px -1px rgba(23,23,37,0.06)", usage: "Default card shadow, dropdowns", cssClass: "shadow-sm" },
  { token: "TP.shadow.md", name: "shadow-md", value: "0 4px 8px -2px rgba(23,23,37,0.08), 0 2px 4px -2px rgba(23,23,37,0.06)", usage: "Elevated cards, modals, popovers", cssClass: "shadow-md" },
  { token: "TP.shadow.lg", name: "shadow-lg", value: "0 12px 24px -4px rgba(23,23,37,0.08), 0 4px 8px -4px rgba(23,23,37,0.04)", usage: "Floating elements, prominent modals", cssClass: "shadow-lg" },
  { token: "TP.shadow.xl", name: "shadow-xl", value: "0 20px 40px -8px rgba(23,23,37,0.12), 0 8px 16px -6px rgba(23,23,37,0.06)", usage: "Hero overlays, command palettes", cssClass: "shadow-xl" },
  { token: "TP.shadow.2xl", name: "shadow-2xl", value: "0 32px 64px -12px rgba(23,23,37,0.20)", usage: "Maximum elevation, full-screen overlays", cssClass: "shadow-2xl" },
]

// ─── CORNER RADIUS ───

const radiusScale = [
  { token: "TP.radius.2", name: "radius-2", px: 2, usage: "Micro elements, inline tags" },
  { token: "TP.radius.4", name: "radius-4", px: 4, usage: "Small chips, badges" },
  { token: "TP.radius.6", name: "radius-6", px: 6, usage: "Compact inputs, toggles" },
  { token: "TP.radius.8", name: "radius-8", px: 8, usage: "Standard inputs, small cards" },
  { token: "TP.radius.10", name: "radius-10", px: 10, usage: "Buttons (small)" },
  { token: "TP.radius.12", name: "radius-12", px: 12, usage: "CTA default, medium cards" },
  { token: "TP.radius.14", name: "radius-14", px: 14, usage: "Large inputs" },
  { token: "TP.radius.16", name: "radius-16", px: 16, usage: "Cards, dialogs" },
  { token: "TP.radius.18", name: "radius-18", px: 18, usage: "Large cards" },
  { token: "TP.radius.20", name: "radius-20", px: 20, usage: "Feature cards, modals" },
  { token: "TP.radius.24", name: "radius-24", px: 24, usage: "Hero cards, banners" },
  { token: "TP.radius.42", name: "radius-42", px: 42, usage: "Pill shapes, full-round buttons" },
  { token: "TP.radius.84", name: "radius-84", px: 84, usage: "Circle elements, avatars" },
  { token: "TP.radius.full", name: "radius-full", px: 9999, usage: "Perfect circle, status dots" },
]

// ─── BORDER WIDTHS + COLORS ───

const borderWidths = [
  { name: "border-1", px: 1, usage: "Default borders, dividers, table lines" },
  { name: "border-1.5", px: 1.5, usage: "CTA outlines, emphasis borders" },
  { name: "border-2", px: 2, usage: "Focus rings, selected states" },
  { name: "border-3", px: 3, usage: "Active tab indicator, heavy emphasis" },
  { name: "border-4", px: 4, usage: "Section dividers, hero accents" },
]

const borderColors = [
  { name: "TP.border.default", token: "tp-slate-200", hex: "#E2E2EA", usage: "Default borders, card outlines, table rules" },
  { name: "TP.border.subtle", token: "tp-slate-100", hex: "#F1F1F5", usage: "Inner dividers, row separators" },
  { name: "TP.border.strong", token: "tp-slate-300", hex: "#D0D5DD", usage: "Emphasized borders, input hover" },
  { name: "TP.border.focus", token: "tp-blue-500", hex: "#4B4AD5", usage: "Focus state, active inputs" },
  { name: "TP.border.error", token: "tp-error-500", hex: "#E11D48", usage: "Error state inputs" },
  { name: "TP.border.success", token: "tp-success-500", hex: "#10B981", usage: "Success state inputs" },
  { name: "TP.border.disabled", token: "tp-slate-100", hex: "#F1F1F5", usage: "Disabled input borders" },
]

// ─── TYPOGRAPHY TOKENS (tokenized names) ───

const typographyTokens = [
  { token: "TP.text.display", element: "h1", family: "Mulish", size: "48px", weight: "700", lineHeight: "56px", tracking: "-0.02em", usage: "Hero titles, major page headers" },
  { token: "TP.text.h1", element: "h1", family: "Mulish", size: "36px", weight: "700", lineHeight: "44px", tracking: "-0.02em", usage: "Page titles, section headers" },
  { token: "TP.text.h2", element: "h2", family: "Mulish", size: "30px", weight: "600", lineHeight: "38px", tracking: "-0.01em", usage: "Section titles, card headers" },
  { token: "TP.text.h3", element: "h3", family: "Mulish", size: "24px", weight: "600", lineHeight: "32px", tracking: "-0.01em", usage: "Sub-section headers" },
  { token: "TP.text.h4", element: "h4", family: "Mulish", size: "20px", weight: "600", lineHeight: "28px", tracking: "0", usage: "Card titles, widget headers" },
  { token: "TP.text.h5", element: "h5", family: "Mulish", size: "16px", weight: "600", lineHeight: "24px", tracking: "0", usage: "Small section titles, labels" },
  { token: "TP.text.h6", element: "h6", family: "Mulish", size: "14px", weight: "600", lineHeight: "20px", tracking: "0.01em", usage: "Overlines, uppercase labels" },
  { token: "TP.text.body.lg", element: "p", family: "Inter", size: "18px", weight: "400", lineHeight: "28px", tracking: "0", usage: "Intro text, feature descriptions" },
  { token: "TP.text.body.base", element: "p", family: "Inter", size: "16px", weight: "400", lineHeight: "24px", tracking: "0", usage: "Default body text, paragraphs" },
  { token: "TP.text.body.sm", element: "p", family: "Inter", size: "14px", weight: "400", lineHeight: "20px", tracking: "0", usage: "Secondary text, captions, table cells" },
  { token: "TP.text.body.xs", element: "span", family: "Inter", size: "12px", weight: "500", lineHeight: "16px", tracking: "0.01em", usage: "Badges, timestamps, micro-text" },
  { token: "TP.text.label.lg", element: "label", family: "Inter", size: "16px", weight: "600", lineHeight: "24px", tracking: "0", usage: "Large form labels, section controls" },
  { token: "TP.text.label.md", element: "label", family: "Inter", size: "14px", weight: "600", lineHeight: "20px", tracking: "0", usage: "Default form labels, CTA text" },
  { token: "TP.text.label.sm", element: "label", family: "Inter", size: "12px", weight: "600", lineHeight: "16px", tracking: "0.01em", usage: "Small labels, tag text" },
  { token: "TP.text.overline", element: "span", family: "Inter", size: "11px", weight: "700", lineHeight: "14px", tracking: "0.08em", usage: "Section overlines, category labels" },
]

// ─── EXPORTS ───

const hoverStyles = [
  { token: "TP.hover.primary", name: "Primary", borderColor: "#4B4AD5", bg: "#FFFFFF" },
  { token: "TP.hover.secondary", name: "Secondary", borderColor: "#717179", bg: "#FFFFFF" },
  { token: "TP.hover.error", name: "Error", borderColor: "#E11D48", bg: "#FFFFFF" },
  { token: "TP.hover.warning", name: "Warning", borderColor: "#F59E0B", bg: "#FFFFFF" },
  { token: "TP.hover.success", name: "Success", borderColor: "#10B981", bg: "#FFFFFF" },
]

const focusedStyles = [
  { token: "TP.focus.primary", name: "Primary", borderColor: "#4B4AD5", bg: "#EEEEFF" },
  { token: "TP.focus.secondary", name: "Secondary", borderColor: "#717179", bg: "#F1F1F5" },
  { token: "TP.focus.error", name: "Error", borderColor: "#E11D48", bg: "#FFF1F2" },
  { token: "TP.focus.warning", name: "Warning", borderColor: "#F59E0B", bg: "#FFFBEB" },
  { token: "TP.focus.success", name: "Success", borderColor: "#10B981", bg: "#ECFDF5" },
]

export function ShadowShowcase() {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1">
        Box Shadows
      </h3>
      <p className="text-xs text-tp-slate-400 mb-6">
        Layered elevation scale using TP Slate 900 alpha values. Natural depth with ambient + direct light layers.
      </p>

      {/* Normal Styles */}
      <h4 className="text-xs font-semibold uppercase tracking-wider text-tp-slate-600 mb-4">Normal Styles</h4>
      <p className="text-xs text-tp-slate-400 mb-4">Regular usage for components on the screen like buttons, cards, images and dropdowns.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {shadowScale.map((s) => (
          <div key={s.name} className="flex flex-col gap-3">
            <div
              className="h-24 rounded-xl bg-card flex items-center justify-center border border-tp-slate-100"
              style={{ boxShadow: s.value }}
            >
              <span className="text-sm font-mono font-semibold text-tp-slate-700">{s.name}</span>
            </div>
            <div className="px-1">
              <code className="text-[10px] font-mono font-semibold text-tp-blue-600">{s.token}</code>
              <p className="text-xs font-medium text-tp-slate-600 mt-0.5">{s.usage}</p>
              <code className="text-[10px] font-mono text-tp-slate-400 break-all leading-tight block mt-1">
                {s.value}
              </code>
            </div>
          </div>
        ))}
      </div>

      {/* Hover Styles */}
      <h4 className="text-xs font-semibold uppercase tracking-wider text-tp-slate-600 mb-4">Hover Styles</h4>
      <p className="text-xs text-tp-slate-400 mb-4">
        Used for hover effects when the user&apos;s cursor is inside the area of the component. Primarily used for hover variants inside atomic components.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {hoverStyles.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-2">
            <div
              className="w-full h-28 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: s.bg,
                border: `2px solid ${s.borderColor}`,
                boxShadow: `0 4px 12px -2px ${s.borderColor}20, 0 2px 4px -2px ${s.borderColor}10`,
              }}
            />
            <code className="text-[10px] font-mono font-semibold text-tp-blue-600">{s.token}</code>
            <span className="text-xs font-semibold text-tp-slate-700">{s.name}</span>
          </div>
        ))}
      </div>

      {/* Focused Styles */}
      <h4 className="text-xs font-semibold uppercase tracking-wider text-tp-slate-600 mb-4">Focused Styles</h4>
      <p className="text-xs text-tp-slate-400 mb-4">
        Used for focused effects for drawing user attention and occasionally on sub-components when user is performing nested activity inside parent component.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {focusedStyles.map((s) => (
          <div key={s.name} className="flex flex-col items-center gap-2">
            <div
              className="w-full h-28 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: s.bg,
                border: `2px solid ${s.borderColor}`,
                boxShadow: `0 0 0 4px ${s.borderColor}15, 0 4px 12px -2px ${s.borderColor}20`,
              }}
            />
            <code className="text-[10px] font-mono font-semibold text-tp-blue-600">{s.token}</code>
            <span className="text-xs font-semibold text-tp-slate-700">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RadiusShowcase() {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1">
        Corner Radius
      </h3>
      <p className="text-xs text-tp-slate-400 mb-6">
        Scale from 2px to full-round. CTA default is 12px. Increases in 2px steps up to 24px, then jumps to pill (42px) and circle (84px+).
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {radiusScale.map((r) => (
          <div key={r.name} className="flex flex-col items-center gap-2">
            <div
              className="w-16 h-16 flex items-center justify-center"
              style={{
                border: "2px solid #4B4AD5",
                borderRadius: `${r.px === 9999 ? "9999" : r.px}px`,
                backgroundColor: "#EEEEFF",
              }}
            >
              <span className="text-xs font-mono font-bold text-tp-blue-700">{r.px === 9999 ? "Full" : r.px}</span>
            </div>
            <code className="text-[10px] font-mono font-semibold text-tp-blue-600 text-center">{r.token}</code>
            <span className="text-[10px] font-mono text-tp-slate-600 text-center">{r.name}</span>
            <span className="text-[10px] text-tp-slate-400 text-center leading-tight">{r.usage}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function BorderShowcase() {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1">
        Borders
      </h3>
      <p className="text-xs text-tp-slate-400 mb-6">
        Border widths and semantic colors. Each width has a defined use case, and colors map to TP Slate and functional token palettes.
      </p>

      {/* Border Widths */}
      <div className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-tp-slate-600 mb-4">Widths</h4>
        <div className="flex flex-col gap-4">
          {borderWidths.map((b) => (
            <div key={b.name} className="flex items-center gap-4">
              <div className="w-24 flex-shrink-0">
                <span className="text-xs font-mono font-semibold text-tp-slate-700">{b.name}</span>
              </div>
              <div
                className="flex-1 h-0"
                style={{ borderTop: `${b.px}px solid #4B4AD5` }}
              />
              <span className="text-xs text-tp-slate-500 w-12 text-right flex-shrink-0">{b.px}px</span>
              <span className="text-xs text-tp-slate-400 w-48 text-right flex-shrink-0 hidden lg:block">{b.usage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Border Colors */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-tp-slate-600 mb-4">Semantic Border Colors</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {borderColors.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-card"
              style={{ border: `2px solid ${c.hex}` }}
            >
              <div
                className="w-5 h-5 rounded flex-shrink-0"
                style={{ backgroundColor: c.hex }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono font-semibold text-tp-slate-800 truncate">{c.name}</div>
                <div className="text-[10px] text-tp-slate-400">{c.hex} / {c.usage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function IconShowcase() {
  return (
    <IconFamilyShowcase />
  )
}

export function TypographyTokenShowcase() {
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1">
        Typography Tokens
      </h3>
      <p className="text-xs text-tp-slate-400 mb-6">
        Tokenized typography scale for design handoff. Token names follow TP.text.* naming convention.
      </p>
      <div className="border border-tp-slate-200 rounded-xl overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-tp-slate-50 border-b border-tp-slate-200">
                <th className="px-4 py-3 text-left font-semibold text-tp-slate-700 whitespace-nowrap">Token</th>
                <th className="px-4 py-3 text-left font-semibold text-tp-slate-700">Family</th>
                <th className="px-4 py-3 text-left font-semibold text-tp-slate-700">Size</th>
                <th className="px-4 py-3 text-left font-semibold text-tp-slate-700">Weight</th>
                <th className="px-4 py-3 text-left font-semibold text-tp-slate-700">Line H.</th>
                <th className="px-4 py-3 text-left font-semibold text-tp-slate-700 hidden lg:table-cell">Tracking</th>
                <th className="px-4 py-3 text-left font-semibold text-tp-slate-700 hidden xl:table-cell">Preview</th>
              </tr>
            </thead>
            <tbody>
              {typographyTokens.map((t) => (
                <tr key={t.token} className="border-b border-tp-slate-100 last:border-b-0">
                  <td className="px-4 py-3 font-mono text-xs text-tp-blue-600 whitespace-nowrap font-semibold">{t.token}</td>
                  <td className="px-4 py-3 text-tp-slate-600 font-mono text-xs">{t.family}</td>
                  <td className="px-4 py-3 text-tp-slate-600 font-mono text-xs">{t.size}</td>
                  <td className="px-4 py-3 text-tp-slate-600 font-mono text-xs">{t.weight}</td>
                  <td className="px-4 py-3 text-tp-slate-600 font-mono text-xs">{t.lineHeight}</td>
                  <td className="px-4 py-3 text-tp-slate-600 font-mono text-xs hidden lg:table-cell">{t.tracking}</td>
                  <td className="px-4 py-3 hidden xl:table-cell">
                    <span
                      style={{
                        fontFamily: t.family === "Mulish" ? "var(--font-heading)" : "var(--font-sans)",
                        fontSize: `min(${t.size}, 20px)`,
                        fontWeight: Number(t.weight),
                        lineHeight: "1.4",
                        color: "#171725",
                      }}
                    >
                      {"Aa Bb Cc"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
