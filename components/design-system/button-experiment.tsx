"use client"

/**
 * ══════════════════════════════════════════════════════════════════
 * Button Experiment — Figma Component Set Testing
 * ══════════════════════════════════════════════════════════════════
 *
 * This component renders a single TP Button in ALL its variants,
 * structured so that html.to.design can import them as a proper
 * Figma Component Set with variant properties.
 *
 * Figma Component Set naming convention:
 *   ComponentName / Property=Value, Property=Value
 *
 * Example: "Button / Variant=Primary, Size=Medium, State=Default"
 *
 * We test 3 strategies for naming:
 *   Strategy A: data-name attribute with slash + Property=Value
 *   Strategy B: aria-label with the same naming
 *   Strategy C: Wrapper title + nested naming
 *
 * The HTML export version uses inline styles (no Tailwind) so
 * html.to.design can faithfully convert them.
 * ══════════════════════════════════════════════════════════════════
 */

import { useState } from "react"
import { Download, Plus, Loader2, ArrowRight } from "lucide-react"

/* ── Token values (from our design system) ── */
const TOKENS = {
  radius: "10px",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: "600",
  iconSize: "20px",
  borderWidth: "1.5px",
  // Size heights
  height: { sm: "32px", md: "38px", lg: "44px" },
  paddingX: { sm: "12px", md: "14px", lg: "16px" },
  paddingY: { sm: "6px", md: "8px", lg: "10px" },
  // Primary
  primary: {
    bg: "#4B4AD5", bgHover: "#3C3AB3", bgDisabled: "#E2E2EA",
    text: "#FFFFFF", textDisabled: "#A2A2A8",
    focusRing: "0 0 0 4px rgba(75,74,213,0.15)",
  },
  // Outline
  outline: {
    bg: "transparent", bgHover: "#EEEEFF", bgDisabled: "transparent",
    text: "#4B4AD5", textDisabled: "#A2A2A8",
    border: "#4B4AD5", borderDisabled: "#E2E2EA",
  },
  // Ghost
  ghost: {
    bg: "transparent", bgHover: "#EEEEFF",
    text: "#4B4AD5",
  },
  // Tonal
  tonal: {
    bg: "#EEEEFF", bgHover: "#D8D8FF",
    text: "#4B4AD5",
  },
  // Neutral
  neutral: {
    bg: "#F1F1F5", bgHover: "#E2E2EA",
    text: "#454551",
  },
  // Destructive
  destructive: {
    bg: "#E11D48", bgHover: "#BE123C", bgDisabled: "#E2E2EA",
    text: "#FFFFFF", textDisabled: "#A2A2A8",
  },
}

/* ── Variant definitions ── */
type VariantName = "Primary" | "Outline" | "Ghost" | "Tonal" | "Neutral" | "Destructive"
type SizeName = "Small" | "Medium" | "Large"
type StateName = "Default" | "Hover" | "Focus" | "Loading" | "Disabled"

interface ButtonVariantStyle {
  bg: string
  text: string
  border?: string
  shadow?: string
  opacity?: number
}

function getVariantStyle(variant: VariantName, state: StateName): ButtonVariantStyle {
  const v = variant.toLowerCase() as keyof typeof TOKENS
  switch (variant) {
    case "Primary":
      if (state === "Hover") return { bg: TOKENS.primary.bgHover, text: TOKENS.primary.text }
      if (state === "Focus") return { bg: TOKENS.primary.bg, text: TOKENS.primary.text, shadow: TOKENS.primary.focusRing }
      if (state === "Loading") return { bg: TOKENS.primary.bg, text: TOKENS.primary.text, opacity: 0.7 }
      if (state === "Disabled") return { bg: TOKENS.primary.bgDisabled, text: TOKENS.primary.textDisabled }
      return { bg: TOKENS.primary.bg, text: TOKENS.primary.text }
    case "Outline":
      if (state === "Hover") return { bg: TOKENS.outline.bgHover, text: TOKENS.outline.text, border: TOKENS.outline.border }
      if (state === "Focus") return { bg: "transparent", text: TOKENS.outline.text, border: TOKENS.outline.border, shadow: TOKENS.primary.focusRing }
      if (state === "Disabled") return { bg: "transparent", text: TOKENS.outline.textDisabled, border: TOKENS.outline.borderDisabled }
      return { bg: "transparent", text: TOKENS.outline.text, border: TOKENS.outline.border }
    case "Ghost":
      if (state === "Hover") return { bg: TOKENS.ghost.bgHover, text: TOKENS.ghost.text }
      if (state === "Disabled") return { bg: "transparent", text: "#A2A2A8" }
      return { bg: "transparent", text: TOKENS.ghost.text }
    case "Tonal":
      if (state === "Hover") return { bg: TOKENS.tonal.bgHover, text: TOKENS.tonal.text }
      if (state === "Disabled") return { bg: "#F1F1F5", text: "#A2A2A8" }
      return { bg: TOKENS.tonal.bg, text: TOKENS.tonal.text }
    case "Neutral":
      if (state === "Hover") return { bg: TOKENS.neutral.bgHover, text: TOKENS.neutral.text }
      if (state === "Disabled") return { bg: "#F8F8FC", text: "#A2A2A8" }
      return { bg: TOKENS.neutral.bg, text: TOKENS.neutral.text }
    case "Destructive":
      if (state === "Hover") return { bg: TOKENS.destructive.bgHover, text: TOKENS.destructive.text }
      if (state === "Focus") return { bg: TOKENS.destructive.bg, text: TOKENS.destructive.text, shadow: "0 0 0 4px rgba(225,29,72,0.15)" }
      if (state === "Disabled") return { bg: TOKENS.destructive.bgDisabled, text: TOKENS.destructive.textDisabled }
      return { bg: TOKENS.destructive.bg, text: TOKENS.destructive.text }
    default:
      return { bg: TOKENS.primary.bg, text: TOKENS.primary.text }
  }
}

function getSizeProps(size: SizeName) {
  switch (size) {
    case "Small": return { height: TOKENS.height.sm, px: TOKENS.paddingX.sm, py: TOKENS.paddingY.sm, label: "SM" }
    case "Medium": return { height: TOKENS.height.md, px: TOKENS.paddingX.md, py: TOKENS.paddingY.md, label: "MD" }
    case "Large": return { height: TOKENS.height.lg, px: TOKENS.paddingX.lg, py: TOKENS.paddingY.lg, label: "LG" }
  }
}

const ALL_VARIANTS: VariantName[] = ["Primary", "Outline", "Ghost", "Tonal", "Neutral", "Destructive"]
const ALL_SIZES: SizeName[] = ["Small", "Medium", "Large"]
const ALL_STATES: StateName[] = ["Default", "Hover", "Focus", "Loading", "Disabled"]

/* ── Single button render ── */
function ExperimentButton({
  variant,
  size,
  state,
  hasIcon = false,
}: {
  variant: VariantName
  size: SizeName
  state: StateName
  hasIcon?: boolean
}) {
  const style = getVariantStyle(variant, state)
  const sizeProps = getSizeProps(size)

  // Figma-compatible name using Property=Value format
  const figmaName = `Variant=${variant}, Size=${size}, State=${state}, Icon=${hasIcon ? "True" : "False"}`

  return (
    <div
      data-figma-name={figmaName}
      data-component="Button"
      data-variant={variant}
      data-size={size}
      data-state={state}
      data-icon={hasIcon ? "true" : "false"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        height: sizeProps.height,
        paddingInline: sizeProps.px,
        paddingBlock: sizeProps.py,
        backgroundColor: style.bg,
        color: style.text,
        borderRadius: TOKENS.radius,
        border: style.border ? `${TOKENS.borderWidth} solid ${style.border}` : "none",
        boxShadow: style.shadow || "none",
        opacity: style.opacity ?? 1,
        fontFamily: TOKENS.fontFamily,
        fontSize: TOKENS.fontSize,
        fontWeight: Number(TOKENS.fontWeight),
        cursor: state === "Disabled" ? "not-allowed" : "pointer",
        transition: "all 150ms ease",
        whiteSpace: "nowrap" as const,
      }}
      title={figmaName}
      aria-label={`Button / ${figmaName}`}
    >
      {hasIcon && state !== "Loading" && <Plus size={20} style={{ flexShrink: 0 }} />}
      {state === "Loading" && <Loader2 size={20} className="animate-spin" style={{ flexShrink: 0 }} />}
      <span>{state === "Loading" ? "Loading…" : "Button"}</span>
      {hasIcon && state !== "Loading" && <ArrowRight size={20} style={{ flexShrink: 0 }} />}
    </div>
  )
}

/* ── Export HTML for this experiment ── */
function generateExperimentHTML(): string {
  const variants: VariantName[] = ALL_VARIANTS
  const sizes: SizeName[] = ALL_SIZES
  const states: StateName[] = ALL_STATES

  // SVG icons for inline use in Figma
  const plusIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
  const arrowIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
  const loaderIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`

  function getStyle(v: VariantName, s: StateName) {
    const st = getVariantStyle(v, s)
    const border = st.border ? `border: ${TOKENS.borderWidth} solid ${st.border};` : "border: none;"
    const shadow = st.shadow ? `box-shadow: ${st.shadow};` : ""
    const opacity = st.opacity ? `opacity: ${st.opacity};` : ""
    return `background-color: ${st.bg}; color: ${st.text}; ${border} ${shadow} ${opacity}`
  }

  function buttonHTML(v: VariantName, sz: SizeName, st: StateName, withIcon: boolean = false) {
    const sizeProps = getSizeProps(sz)
    const varStyle = getStyle(v, st)
    // THE KEY: Figma-compatible naming with Property=Value
    const figmaName = `Variant=${v}, Size=${sz}, State=${st}, Icon=${withIcon ? "True" : "False"}`
    const label = st === "Loading" ? "Loading…" : "Button"
    const iconHtml = withIcon && st !== "Loading" ? plusIcon : ""
    const trailIcon = withIcon && st !== "Loading" ? arrowIcon : ""
    const loadIcon = st === "Loading" ? `<span style="display:inline-flex;animation:spin 1s linear infinite">${loaderIcon}</span>` : ""

    return `      <div
        data-figma-name="${figmaName}"
        title="Button / ${figmaName}"
        style="display:inline-flex;align-items:center;justify-content:center;gap:6px;height:${sizeProps.height};padding-inline:${sizeProps.px};padding-block:${sizeProps.py};border-radius:${TOKENS.radius};font-family:${TOKENS.fontFamily};font-size:${TOKENS.fontSize};font-weight:${TOKENS.fontWeight};cursor:pointer;white-space:nowrap;${varStyle}"
      >${loadIcon}${iconHtml}<span>${label}</span>${trailIcon}</div>`
  }

  // Build the HTML — a component set wrapper with all variants inside
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TP Button — Figma Component Set Experiment</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mulish:wght@600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Inter, sans-serif; background: #F8F8FC; padding: 40px; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    /* ── Section headers ── */
    .section-title {
      font-family: Mulish, sans-serif; font-size: 24px; font-weight: 700;
      color: #171725; margin-bottom: 8px;
    }
    .section-desc {
      font-size: 13px; color: #717179; margin-bottom: 32px; max-width: 600px;
    }
    .variant-group {
      margin-bottom: 48px;
    }
    .variant-label {
      font-size: 11px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.1em; color: #A2A2A8; margin-bottom: 12px;
    }
    .variant-row {
      display: flex; flex-wrap: wrap; gap: 12px; align-items: center;
      margin-bottom: 16px;
    }
    .state-label {
      font-size: 10px; color: #A2A2A8; width: 60px; text-align: right;
      font-weight: 500; flex-shrink: 0;
    }

    /* ── Strategy markers ── */
    .strategy-badge {
      display: inline-block; padding: 2px 8px; border-radius: 4px;
      font-size: 10px; font-weight: 700; text-transform: uppercase;
      letter-spacing: 0.05em; margin-bottom: 16px;
    }
    .strategy-a { background: #EEEEFF; color: #4B4AD5; }
    .strategy-b { background: #ECFDF5; color: #059669; }
    .strategy-c { background: #FFFBEB; color: #D97706; }
  </style>
</head>
<body>
  <h1 class="section-title">TP Button — Component Set Experiment</h1>
  <p class="section-desc">
    Each button below is named with Figma's Property=Value convention.
    Import this HTML into Figma via html.to.design, then select all buttons
    and "Combine as Variants" to create a component set.
  </p>

  <!-- ═══════════════════════════════════════════════════════════
       STRATEGY A: Flat list — all variants with data-figma-name
       Each element is named: "Variant=X, Size=Y, State=Z, Icon=Bool"
       After import → Select all → Combine as Variants
       ═══════════════════════════════════════════════════════════ -->
  <div class="strategy-badge strategy-a">Strategy A — Flat Property=Value Naming</div>

`

  // For each variant, render all state × size combos
  for (const v of variants) {
    html += `  <div class="variant-group">\n`
    html += `    <div class="variant-label">${v}</div>\n`

    for (const st of states) {
      html += `    <div class="variant-row">\n`
      html += `      <span class="state-label">${st}</span>\n`

      for (const sz of sizes) {
        html += buttonHTML(v, sz, st, false) + "\n"
      }

      // Also render with icons for Default state
      if (st === "Default") {
        html += buttonHTML(v, "Medium", st, true) + "\n"
      }

      html += `    </div>\n`
    }

    html += `  </div>\n\n`
  }

  // Strategy B: Wrapper with slash naming
  html += `
  <!-- ═══════════════════════════════════════════════════════════
       STRATEGY B: Slash naming — "Button/Variant/Size/State"
       Wrapper named "Button", children named "Primary/Medium/Default"
       ═══════════════════════════════════════════════════════════ -->
  <div style="margin-top:64px">
    <div class="strategy-badge strategy-b">Strategy B — Slash Naming Convention</div>
    <p class="section-desc">
      Wrapper named "Button" with children named using slash convention (e.g. "Primary/Medium/Default").
      After import → Select the wrapper → Component → Create Component Set
    </p>

    <div title="Button" data-figma-name="Button" style="display:flex;flex-wrap:wrap;gap:12px;padding:24px;background:#FFFFFF;border-radius:16px;border:1px solid #E2E2EA">
`

  // Render a subset (Primary × 3 sizes × key states) with slash naming
  const slashVariants: VariantName[] = ["Primary", "Outline", "Ghost", "Destructive"]
  const slashStates: StateName[] = ["Default", "Hover", "Disabled"]
  for (const v of slashVariants) {
    for (const st of slashStates) {
      for (const sz of sizes) {
        const sizeProps = getSizeProps(sz)
        const varStyle = getStyle(v, st)
        const slashName = `${v}/${sz}/${st}`

        html += `      <div
        title="${slashName}"
        data-figma-name="${slashName}"
        style="display:inline-flex;align-items:center;justify-content:center;gap:6px;height:${sizeProps.height};padding-inline:${sizeProps.px};padding-block:${sizeProps.py};border-radius:${TOKENS.radius};font-family:${TOKENS.fontFamily};font-size:${TOKENS.fontSize};font-weight:${TOKENS.fontWeight};cursor:pointer;white-space:nowrap;${varStyle}"
      ><span>Button</span></div>\n`
      }
    }
  }

  html += `    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════
       STRATEGY C: Explicit Property=Value with component wrapper
       Wrapper: "Button" → children: "Variant=Primary, Size=Medium, State=Default"
       ═══════════════════════════════════════════════════════════ -->
  <div style="margin-top:64px">
    <div class="strategy-badge strategy-c">Strategy C — Component Wrapper + Property=Value Children</div>
    <p class="section-desc">
      All variants wrapped in a single "Button" container. Each child uses
      "Variant=X, Size=Y, State=Z" naming. Select children → Combine as Variants.
    </p>

    <div title="Button" style="display:flex;flex-wrap:wrap;gap:12px;padding:24px;background:#FFFFFF;border-radius:16px;border:1px solid #E2E2EA">
`

  // Render all Primary variants with Property=Value naming
  for (const v of ALL_VARIANTS) {
    for (const st of ["Default", "Hover", "Disabled"] as StateName[]) {
      const sizeProps = getSizeProps("Medium")
      const varStyle = getStyle(v, st)
      const propName = `Variant=${v}, Size=Medium, State=${st}`

      html += `      <div
        title="${propName}"
        data-figma-name="${propName}"
        style="display:inline-flex;align-items:center;justify-content:center;gap:6px;height:${sizeProps.height};padding-inline:${sizeProps.px};padding-block:${sizeProps.py};border-radius:${TOKENS.radius};font-family:${TOKENS.fontFamily};font-size:${TOKENS.fontSize};font-weight:${TOKENS.fontWeight};cursor:pointer;white-space:nowrap;${varStyle}"
      ><span>Button</span></div>\n`
    }
  }

  html += `    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════ -->
  <div style="margin-top:48px;padding:24px;background:#FFFFFF;border-radius:16px;border:1px solid #E2E2EA">
    <h2 style="font-family:Mulish,sans-serif;font-size:16px;font-weight:700;color:#171725;margin-bottom:8px">
      How to use in Figma
    </h2>
    <ol style="font-size:13px;color:#454551;line-height:1.8;padding-left:20px">
      <li>Import this HTML via <strong>html.to.design</strong> plugin</li>
      <li>Select all button frames from one Strategy group</li>
      <li>Right-click → <strong>Combine as Variants</strong></li>
      <li>Figma will auto-create variant properties from the names</li>
      <li>Rename properties as needed (Variant, Size, State, Icon)</li>
    </ol>
  </div>

</body>
</html>`

  return html
}

/* ── Export handler ── */
function downloadExperimentHTML() {
  const html = generateExperimentHTML()
  const blob = new Blob([html], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "tp-button-figma-experiment.html"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/* ── Showcase Component ── */
export function ButtonExperiment() {
  const [activeStrategy, setActiveStrategy] = useState<"A" | "B" | "C">("A")

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="rounded-xl border border-tp-blue-200 bg-gradient-to-r from-tp-blue-50 to-purple-50 p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-lg font-bold text-tp-slate-900 font-heading">
              Figma Component Set Experiment
            </h3>
            <p className="text-sm text-tp-slate-600 mt-1 max-w-xl">
              Testing 3 naming strategies for html.to.design to import buttons as
              a proper <strong>Figma Component Set</strong> with variant properties
              (Variant, Size, State, Icon).
            </p>
          </div>
          <button
            onClick={downloadExperimentHTML}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "#4B4AD5" }}
          >
            <Download size={18} />
            Export Experiment HTML
          </button>
        </div>
      </div>

      {/* Strategy tabs */}
      <div className="flex gap-2">
        {(["A", "B", "C"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setActiveStrategy(s)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeStrategy === s
                ? "bg-tp-blue-500 text-white"
                : "bg-tp-slate-100 text-tp-slate-600 hover:bg-tp-slate-200"
            }`}
          >
            Strategy {s}
          </button>
        ))}
      </div>

      {/* Strategy descriptions */}
      <div className="rounded-lg border border-tp-slate-200 bg-white p-4 text-sm">
        {activeStrategy === "A" && (
          <div>
            <p className="font-semibold text-tp-slate-800 mb-1">Strategy A — Flat Property=Value Naming</p>
            <p className="text-tp-slate-600">
              Each button is a separate element named with <code className="bg-tp-slate-100 px-1 rounded text-xs">Variant=Primary, Size=Medium, State=Default, Icon=False</code>.
              After importing into Figma, select all buttons → right-click → <strong>Combine as Variants</strong>.
              Figma should auto-detect the properties from the comma-separated names.
            </p>
          </div>
        )}
        {activeStrategy === "B" && (
          <div>
            <p className="font-semibold text-tp-slate-800 mb-1">Strategy B — Slash Naming Convention</p>
            <p className="text-tp-slate-600">
              Wrapper named <code className="bg-tp-slate-100 px-1 rounded text-xs">Button</code>, children named
              with slash convention: <code className="bg-tp-slate-100 px-1 rounded text-xs">Primary/Medium/Default</code>.
              The text before the first <code>/</code> becomes the component set name.
            </p>
          </div>
        )}
        {activeStrategy === "C" && (
          <div>
            <p className="font-semibold text-tp-slate-800 mb-1">Strategy C — Component Wrapper + Property=Value Children</p>
            <p className="text-tp-slate-600">
              All variants inside a parent container named <code className="bg-tp-slate-100 px-1 rounded text-xs">Button</code>.
              Each child uses explicit <code className="bg-tp-slate-100 px-1 rounded text-xs">Variant=Primary, Size=Medium, State=Default</code> naming.
            </p>
          </div>
        )}
      </div>

      {/* Preview grid */}
      {activeStrategy === "A" && (
        <div className="space-y-8">
          {ALL_VARIANTS.map((v) => (
            <div key={v}>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-tp-slate-400 mb-3">{v}</p>
              <div className="space-y-3">
                {ALL_STATES.map((st) => (
                  <div key={st} className="flex items-center gap-3">
                    <span className="text-[11px] text-tp-slate-400 w-16 text-right font-medium shrink-0">{st}</span>
                    <div className="flex flex-wrap items-center gap-3">
                      {ALL_SIZES.map((sz) => (
                        <ExperimentButton key={`${v}-${sz}-${st}`} variant={v} size={sz} state={st} />
                      ))}
                      {st === "Default" && (
                        <ExperimentButton variant={v} size="Medium" state={st} hasIcon />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeStrategy === "B" && (
        <div className="rounded-xl border border-tp-slate-200 bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-tp-slate-400 mb-4">
            Container: &quot;Button&quot; → Children: &quot;Variant/Size/State&quot;
          </p>
          <div className="flex flex-wrap gap-3">
            {(["Primary", "Outline", "Ghost", "Destructive"] as VariantName[]).map((v) =>
              (["Default", "Hover", "Disabled"] as StateName[]).map((st) =>
                ALL_SIZES.map((sz) => (
                  <ExperimentButton key={`${v}-${sz}-${st}`} variant={v} size={sz} state={st} />
                ))
              )
            )}
          </div>
        </div>
      )}

      {activeStrategy === "C" && (
        <div className="rounded-xl border border-tp-slate-200 bg-white p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-tp-slate-400 mb-4">
            Container: &quot;Button&quot; → Children: &quot;Variant=X, Size=Y, State=Z&quot;
          </p>
          <div className="flex flex-wrap gap-3">
            {ALL_VARIANTS.map((v) =>
              (["Default", "Hover", "Disabled"] as StateName[]).map((st) => (
                <ExperimentButton key={`${v}-md-${st}`} variant={v} size="Medium" state={st} />
              ))
            )}
          </div>
        </div>
      )}

      {/* Figma instructions */}
      <div className="rounded-xl border border-tp-slate-200 bg-tp-slate-50 p-5">
        <h4 className="text-sm font-bold text-tp-slate-800 mb-3">How to create a Component Set in Figma</h4>
        <ol className="text-sm text-tp-slate-600 space-y-2 list-decimal list-inside">
          <li>Click <strong>&quot;Export Experiment HTML&quot;</strong> above to download the file</li>
          <li>Open Figma → run <strong>html.to.design</strong> plugin → import the HTML file</li>
          <li>Select all the imported button frames from one strategy group</li>
          <li>Right-click → <strong>&quot;Combine as Variants&quot;</strong></li>
          <li>Figma will auto-create variant properties from the element names</li>
          <li>Rename the generic properties (Property 1, Property 2…) to: <strong>Variant</strong>, <strong>Size</strong>, <strong>State</strong>, <strong>Icon</strong></li>
          <li>Test which strategy gives the best result — the naming determines how Figma parses properties</li>
        </ol>
      </div>
    </div>
  )
}
