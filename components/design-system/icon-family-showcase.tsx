"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ChevronsUpDown,
  type LucideIcon,
} from "lucide-react"
import {
  Calendar2,
  Messages2,
  ReceiptText,
  Profile2User,
  CalendarAdd,
  Shop,
  Hospital,
  DocumentLike,
  MessageProgramming,
  Note1,
  Glass,
  Ruler,
  Notepad2,
  DocumentText,
  Notification,
  Clock,
  ClipboardTick,
  ClipboardClose,
  Timer,
  DocumentSketch,
  Setting2,
  Eye,
  Login,
  Edit2,
  SearchNormal1,
  Video,
} from "iconsax-reactjs"
import { TPMedicalIcon } from "@/components/tp-ui"

// ─── ICON FAMILIES ───

const iconsaxIcons: { name: string; Icon: React.ComponentType<any> }[] = [
  { name: "Calendar2", Icon: Calendar2 },
  { name: "Messages2", Icon: Messages2 },
  { name: "ReceiptText", Icon: ReceiptText },
  { name: "Profile2User", Icon: Profile2User },
  { name: "CalendarAdd", Icon: CalendarAdd },
  { name: "Shop", Icon: Shop },
  { name: "Hospital", Icon: Hospital },
  { name: "DocumentLike", Icon: DocumentLike },
  { name: "MessageProgramming", Icon: MessageProgramming },
  { name: "Note1", Icon: Note1 },
  { name: "Glass", Icon: Glass },
  { name: "Ruler", Icon: Ruler },
  { name: "Notepad2", Icon: Notepad2 },
  { name: "DocumentText", Icon: DocumentText },
  { name: "Notification", Icon: Notification },
  { name: "Clock", Icon: Clock },
  { name: "ClipboardTick", Icon: ClipboardTick },
  { name: "ClipboardClose", Icon: ClipboardClose },
  { name: "Timer", Icon: Timer },
  { name: "DocumentSketch", Icon: DocumentSketch },
  { name: "Setting2", Icon: Setting2 },
  { name: "Eye", Icon: Eye },
  { name: "Login", Icon: Login },
  { name: "Edit2", Icon: Edit2 },
  { name: "SearchNormal1", Icon: SearchNormal1 },
  { name: "Video", Icon: Video },
]

const medicalIcons = [
  "Heart Rate",
  "clipboard-activity",
  "Gynec",
  "Obstetric",
  "injection",
  "Lab",
  "Stethoscope",
  "Blood Pressure",
  "Lungs",
  "Brain",
]

const lucideIcons: { name: string; icon: LucideIcon }[] = [
  { name: "ChevronDown", icon: ChevronDown },
  { name: "ChevronUp", icon: ChevronUp },
  { name: "ChevronLeft", icon: ChevronLeft },
  { name: "ChevronRight", icon: ChevronRight },
  { name: "Plus", icon: Plus },
  { name: "Minus", icon: Minus },
  { name: "ChevronsUpDown", icon: ChevronsUpDown },
]

const semanticContexts = [
  {
    title: "Neutral / Default",
    token: "TP.icon.default",
    bg: "var(--tp-slate-100)",
    fg: "var(--tp-slate-600)",
    note: "Tables, form adornments, neutral clickable icons.",
  },
  {
    title: "Brand / Active",
    token: "TP.icon.brand-active",
    bg: "var(--tp-blue-500)",
    fg: "var(--tp-slate-0)",
    note: "Selected tab/sidebar items and key clickables.",
  },
  {
    title: "Inverse / Dark Surface",
    token: "TP.icon.inverse",
    bg: "rgba(255,255,255,0.2)",
    fg: "var(--tp-slate-0)",
    note: "Icons on dark surfaces (RX sidebar, dark banners).",
  },
  {
    title: "Brand / Soft",
    token: "TP.icon.brand-soft",
    bg: "rgba(75,74,213,0.1)",
    fg: "var(--tp-blue-500)",
    note: "Primary sidebar default on light surfaces.",
  },
  {
    title: "Informative / Violet",
    token: "TP.icon.informative",
    bg: "rgba(164,97,216,0.15)",
    fg: "var(--tp-violet-600)",
    note: "Informative and educational only (non-clickable).",
  },
]

export function IconFamilyShowcase() {
  const [iconsaxVariant, setIconsaxVariant] = useState<"Linear" | "Bulk">("Linear")

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-tp-slate-500 mb-1">Icon Families</h3>
        <p className="text-xs text-tp-slate-400 mb-5">
          TatvaPractice uses three icon families, each with a specific purpose. Icons are 20px default, with 16px and 24px variants. Active/selected states use Bulk (filled) variant; inactive uses Linear (outlined).
        </p>
      </div>

      {/* Three family cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* iconsax */}
        <div className="rounded-xl border border-tp-blue-200 bg-tp-blue-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-tp-blue-500 text-white">
              <Calendar2 size={18} variant="Bulk" />
            </span>
            <div>
              <p className="text-sm font-bold text-tp-slate-900">iconsax</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-tp-blue-600">Primary icon library</p>
            </div>
          </div>
          <p className="text-xs text-tp-slate-600 leading-relaxed">
            All UI icons — navigation, actions, toolbars, tabs, sidebar items, buttons. Supports <strong>Linear</strong> (outline) and <strong>Bulk</strong> (filled) dual-tone variants for active/inactive states.
          </p>
          <p className="mt-2 text-[10px] font-mono text-tp-slate-500">iconsax-reactjs</p>
        </div>

        {/* TP Medical */}
        <div className="rounded-xl border border-tp-violet-200 bg-tp-violet-50/30 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-tp-violet-500 text-white">
              <TPMedicalIcon name="Heart Rate" variant="bulk" size={18} color="white" />
            </span>
            <div>
              <p className="text-sm font-bold text-tp-slate-900">TP Medical</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-tp-violet-600">Medical icon library</p>
            </div>
          </div>
          <p className="text-xs text-tp-slate-600 leading-relaxed">
            Internal medical/clinical icons — vitals, history, gynecology, obstetrics, vaccines, lab results. Supports <strong>line</strong> and <strong>bulk</strong> variants matching iconsax convention.
          </p>
          <p className="mt-2 text-[10px] font-mono text-tp-slate-500">@/components/tp-ui/TPMedicalIcon</p>
        </div>

        {/* Lucide */}
        <div className="rounded-xl border border-tp-slate-200 bg-tp-slate-50/40 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-tp-slate-700 text-white">
              <ChevronDown size={18} />
            </span>
            <div>
              <p className="text-sm font-bold text-tp-slate-900">Lucide</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-tp-slate-500">Utility only</p>
            </div>
          </div>
          <p className="text-xs text-tp-slate-600 leading-relaxed">
            <strong>Only</strong> for accordion chevrons, arrows, plus/minus icons. No variant system — use <code>color</code> and <code>strokeWidth</code> props. Do not use Lucide for any other purpose.
          </p>
          <p className="mt-2 text-[10px] font-mono text-tp-slate-500">lucide-react</p>
        </div>
      </div>

      {/* iconsax preview grid */}
      <div className="rounded-xl border border-tp-slate-200 bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-tp-slate-800">iconsax Icons (used in product)</p>
          <div className="flex gap-1">
            {(["Linear", "Bulk"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setIconsaxVariant(v)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                  iconsaxVariant === v ? "bg-tp-blue-50 text-tp-blue-700" : "bg-tp-slate-100 text-tp-slate-600"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
          {iconsaxIcons.map(({ name, Icon }) => (
            <div key={name} className="flex flex-col items-center gap-1.5 rounded-lg border border-tp-slate-100 bg-tp-slate-50/40 p-2.5">
              <Icon size={20} variant={iconsaxVariant} color="var(--tp-slate-700)" />
              <p className="truncate text-[10px] font-medium text-tp-slate-600 w-full text-center">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TP Medical preview grid */}
      <div className="rounded-xl border border-tp-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-tp-slate-800 mb-3">TP Medical Icons</p>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8">
          {medicalIcons.map((name) => (
            <div key={name} className="flex flex-col items-center gap-1.5 rounded-lg border border-tp-violet-100 bg-tp-violet-50/30 p-2.5">
              <div className="flex gap-2">
                <TPMedicalIcon name={name} variant="line" size={20} color="var(--tp-slate-700)" />
                <TPMedicalIcon name={name} variant="bulk" size={20} color="var(--tp-violet-500)" />
              </div>
              <p className="truncate text-[10px] font-medium text-tp-slate-600 w-full text-center">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Lucide preview (limited set) */}
      <div className="rounded-xl border border-tp-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-tp-slate-800 mb-1">Lucide Icons (restricted use)</p>
        <p className="text-xs text-tp-slate-400 mb-3">Only these icons from Lucide are used: accordion arrows, chevrons, plus, minus.</p>
        <div className="flex flex-wrap gap-2">
          {lucideIcons.map(({ name, icon: Icon }) => (
            <div key={name} className="flex flex-col items-center gap-1.5 rounded-lg border border-tp-slate-200 bg-tp-slate-50/40 p-2.5">
              <Icon size={20} color="var(--tp-slate-700)" strokeWidth={1.5} />
              <p className="text-[10px] font-medium text-tp-slate-600">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Semantic icon contexts */}
      <div className="rounded-xl border border-tp-slate-200 bg-white p-4">
        <p className="text-sm font-semibold text-tp-slate-800">Semantic Icon Contexts</p>
        <p className="mt-1 text-xs text-tp-slate-600">
          Standardized icon color systems for neutral, clickable brand, and informative contexts.
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {semanticContexts.map((ctx) => (
            <div key={ctx.title} className="rounded-lg border border-tp-slate-200 bg-tp-slate-50/40 p-3">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: ctx.bg }}
                >
                  <Calendar2 size={20} variant="Bulk" color={ctx.fg} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-tp-slate-800">{ctx.title}</p>
                  <p className="truncate text-[11px] font-mono text-tp-slate-500">{ctx.token}</p>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-tp-slate-600">{ctx.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Usage rules */}
      <div className="rounded-xl border border-tp-slate-200 bg-tp-slate-50 p-4 text-xs text-tp-slate-600">
        <p className="font-semibold text-tp-slate-700">Usage Rules</p>
        <ul className="mt-2 space-y-1.5 list-disc pl-4">
          <li><strong>iconsax</strong> — all UI icons. Use <code>variant="Linear"</code> for inactive, <code>variant="Bulk"</code> for active/selected states.</li>
          <li><strong>TP Medical</strong> — all medical/clinical domain icons. Use <code>variant="line"</code> for inactive, <code>variant="bulk"</code> for active states.</li>
          <li><strong>Lucide</strong> — <strong>only</strong> for accordion chevrons (ChevronDown/Up), navigation arrows (ChevronLeft/Right), and plus/minus operators. No other Lucide icons should be used.</li>
          <li>Default size: <strong>20px</strong>. Smaller: 16px (badges, compact). Larger: 24px (headers, toolbars).</li>
          <li>StrokeWidth for Lucide: <strong>1.5</strong> default, <strong>2</strong> for emphasis.</li>
        </ul>
      </div>
    </div>
  )
}
