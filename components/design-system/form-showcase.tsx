"use client"

import { useState, useRef, useEffect } from "react"
import {
  SearchNormal1,
  Message,
  Lock,
  Calendar1,
  ArrowDown2,
  Global,
} from "iconsax-react"
import { ComponentBlock, ComponentCategory } from "@/components/design-system/design-system-section"
import {
  DateInputWithPicker,
  DateTimePickerShowcase,
} from "@/components/design-system/date-time-picker"

const ICON_SIZE = 18

/** Iconsax icon wrapper — consistent sizing, inherits text color */
function FormIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex flex-shrink-0 items-center justify-center text-tp-slate-400 [&_svg]:shrink-0">
      {children}
    </span>
  )
}

// ─── TOGGLE ───

function Toggle({ checked, onChange, size = "md", disabled = false }: {
  checked: boolean
  onChange: (v: boolean) => void
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}) {
  const dims = size === "sm" ? { w: 36, h: 20, dot: 14, t: 3 }
    : size === "lg" ? { w: 52, h: 28, dot: 22, t: 3 }
    : { w: 44, h: 24, dot: 18, t: 3 }

  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className="relative inline-flex items-center flex-shrink-0 transition-colors duration-200"
      style={{
        width: `${dims.w}px`,
        height: `${dims.h}px`,
        borderRadius: `${dims.h}px`,
        backgroundColor: disabled ? "#E2E2EA" : checked ? "#4B4AD5" : "#D0D5DD",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span
        className="block rounded-full shadow-sm transition-transform duration-200"
        style={{
          width: `${dims.dot}px`,
          height: `${dims.dot}px`,
          backgroundColor: "#FFFFFF",
          transform: `translateX(${checked ? dims.w - dims.dot - dims.t : dims.t}px)`,
          boxShadow: "0 1px 3px rgba(23,23,37,0.12)",
        }}
      />
    </button>
  )
}

// ─── CHECKBOX ───

function Checkbox({ checked, onChange, indeterminate, disabled, label, description }: {
  checked: boolean
  onChange: (v: boolean) => void
  indeterminate?: boolean
  disabled?: boolean
  label?: string
  description?: string
}) {
  const isActive = checked || indeterminate

  return (
    <label
      className="inline-flex items-start gap-2.5"
      style={{
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <button
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className="flex-shrink-0 flex items-center justify-center transition-all duration-150"
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "6px",
          backgroundColor: isActive ? "#4B4AD5" : "#FFFFFF",
          border: isActive ? "none" : "1.5px solid #D0D5DD",
          boxShadow: isActive
            ? "0 1px 2px rgba(75,74,213,0.2)"
            : "0 1px 2px rgba(23,23,37,0.05)",
          marginTop: "1px",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {indeterminate && !checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 6H9" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium text-tp-slate-700 leading-tight">{label}</span>}
          {description && <span className="text-xs text-tp-slate-400 mt-0.5">{description}</span>}
        </div>
      )}
    </label>
  )
}

// ─── RADIO ───

function Radio({ checked, onChange, disabled, label, description }: {
  checked: boolean
  onChange: () => void
  disabled?: boolean
  label?: string
  description?: string
}) {
  return (
    <label
      className="inline-flex items-start gap-2.5"
      style={{
        opacity: disabled ? 0.45 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <button
        role="radio"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange()}
        className="flex-shrink-0 flex items-center justify-center transition-all duration-150"
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: checked ? "2px solid #4B4AD5" : "1.5px solid #D0D5DD",
          backgroundColor: "#FFFFFF",
          boxShadow: checked
            ? "0 1px 2px rgba(75,74,213,0.15)"
            : "0 1px 2px rgba(23,23,37,0.05)",
          marginTop: "1px",
        }}
      >
        {checked && (
          <span
            className="block rounded-full"
            style={{ width: "10px", height: "10px", backgroundColor: "#4B4AD5" }}
          />
        )}
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && <span className="text-sm font-medium text-tp-slate-700 leading-tight">{label}</span>}
          {description && <span className="text-xs text-tp-slate-400 mt-0.5">{description}</span>}
        </div>
      )}
    </label>
  )
}

// ─── TEXT INPUT ───

type InputFeedback = "normal" | "error" | "warning" | "success"

function TextInput({
  placeholder,
  value,
  onChange,
  type = "text",
  icon,
  disabled,
  error,
  focused: forceFocused,
  label,
  hint,
  feedback = "normal",
  feedbackMessage,
}: {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  type?: string
  icon?: React.ReactNode
  disabled?: boolean
  error?: string
  focused?: boolean
  label?: string
  hint?: string
  feedback?: InputFeedback
  feedbackMessage?: string
}) {
  const [focused, setFocused] = useState(false)
  const isFocused = forceFocused ?? focused
  const hasError = !!error || feedback === "error"
  const borderColor = hasError ? "#E11D48"
    : feedback === "warning" ? "#F59E0B"
    : feedback === "success" ? "#10B981"
    : isFocused ? "#4B4AD5" : "#E2E2EA"

  const ringColor = hasError ? "rgba(225,29,72,0.10)"
    : feedback === "warning" ? "rgba(245,158,11,0.10)"
    : feedback === "success" ? "rgba(16,185,129,0.10)"
    : "rgba(75,74,213,0.10)"

  const msg = error || feedbackMessage

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          className="font-sans"
          style={{
            fontSize: "12px",
            fontWeight: 400,
            color: "#717179",
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </label>
      )}
      <div
        className="flex items-center gap-2 px-3 transition-colors"
        style={{
          height: "42px",
          borderRadius: "8px",
          border: `${isFocused || hasError || feedback !== "normal" ? "2" : "1.5"}px solid ${borderColor}`,
          backgroundColor: disabled ? "#F1F1F5" : "#FFFFFF",
          opacity: disabled ? 0.5 : 1,
          boxShadow: isFocused || feedback !== "normal" ? `0 0 0 3px ${ringColor}` : "0 1px 2px rgba(23,23,37,0.04)",
        }}
      >
        {icon && <FormIcon>{icon}</FormIcon>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="flex-1 bg-transparent outline-none text-sm text-tp-slate-900 placeholder:text-tp-slate-400"
          style={{ fontFamily: "var(--font-sans)" }}
        />
      </div>
      {msg && <span className="text-xs" style={{ color: hasError ? "#E11D48" : feedback === "warning" ? "#D97706" : feedback === "success" ? "#059669" : "#717179" }}>{msg}</span>}
      {hint && !msg && <span className="text-xs text-tp-slate-400">{hint}</span>}
    </div>
  )
}

// ─── AUTOCOMPLETE (combobox — type to filter, select) ───

const AUTOCOMPLETE_OPTIONS = ["Dr. Smith", "Dr. Johnson", "Dr. Williams", "Dr. Brown", "Dr. Davis", "Dr. Miller", "Dr. Wilson"]

function AutocompleteInput({ label, placeholder = "Search or select..." }: { label?: string; placeholder?: string }) {
  const [value, setValue] = useState("")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [open])

  const filtered = value.trim()
    ? AUTOCOMPLETE_OPTIONS.filter(o => o.toLowerCase().includes(value.toLowerCase()))
    : AUTOCOMPLETE_OPTIONS

  return (
    <div className="flex flex-col gap-1.5 relative" ref={ref}>
      {label && (
        <label className="font-sans" style={{ fontSize: "12px", fontWeight: 400, color: "#717179", letterSpacing: "0.01em" }}>
          {label}
        </label>
      )}
      <div
        className="flex items-center gap-2 px-3"
        style={{
          height: "42px",
          borderRadius: "8px",
          border: `${open ? "2" : "1.5"}px solid ${open ? "#4B4AD5" : "#E2E2EA"}`,
          backgroundColor: "#FFFFFF",
          boxShadow: open ? "0 0 0 3px rgba(75,74,213,0.10)" : "0 1px 2px rgba(23,23,37,0.04)",
        }}
      >
        <FormIcon><SearchNormal1 size={ICON_SIZE} variant="Linear" /></FormIcon>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => { setValue(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="flex-1 bg-transparent outline-none text-sm text-tp-slate-900 placeholder:text-tp-slate-400"
          style={{ fontFamily: "var(--font-sans)" }}
        />
        <FormIcon>
          <ArrowDown2 size={ICON_SIZE} variant="Linear" className={`pointer-events-none transition-transform ${open ? "rotate-180" : ""}`} />
        </FormIcon>
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-tp-slate-200 bg-white py-1 shadow-lg max-h-48 overflow-y-auto">
          {filtered.map((opt) => (
            <button
              key={opt}
              type="button"
              className="w-full px-3 py-2 text-left text-sm font-medium text-tp-slate-800 hover:bg-tp-slate-100 transition-colors"
              onClick={() => { setValue(opt); setOpen(false) }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── SEARCH INPUT WITH RESULTS ───

const MOCK_SEARCH_RESULTS = ["Patient records", "Prescription history", "Lab results", "Appointment schedule", "Insurance claims"]

function SearchInputWithResults({ placeholder = "Search..." }: { placeholder?: string }) {
  const [value, setValue] = useState("")
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [open])

  const filtered = value.trim()
    ? MOCK_SEARCH_RESULTS.filter(r => r.toLowerCase().includes(value.toLowerCase()))
    : MOCK_SEARCH_RESULTS.slice(0, 3)

  const showDropdown = open && (value.length > 0 || filtered.length > 0)

  return (
    <div className="flex flex-col gap-1.5 relative" ref={ref}>
      <div
        className="flex items-center gap-2 px-3 transition-colors"
        style={{
          height: "42px",
          borderRadius: "8px",
          border: `${open ? "2" : "1.5"}px solid ${open ? "#4B4AD5" : "#E2E2EA"}`,
          backgroundColor: "#FFFFFF",
          boxShadow: open ? "0 0 0 3px rgba(75,74,213,0.10)" : "0 1px 2px rgba(23,23,37,0.04)",
        }}
      >
        <FormIcon><SearchNormal1 size={ICON_SIZE} variant="Linear" /></FormIcon>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => { setValue(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          className="flex-1 bg-transparent outline-none text-sm text-tp-slate-900 placeholder:text-tp-slate-400"
          style={{ fontFamily: "var(--font-sans)" }}
        />
      </div>
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-lg border border-tp-slate-200 bg-white py-1 shadow-lg max-h-48 overflow-y-auto">
          {filtered.length ? (
            filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                className="w-full px-3 py-2 text-left text-sm font-medium text-tp-slate-800 hover:bg-tp-slate-100 transition-colors"
                onClick={() => { setValue(opt); setOpen(false) }}
              >
                {opt}
              </button>
            ))
          ) : (
            <div className="px-3 py-4 text-sm text-tp-slate-500">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── TEXTAREA ───

function TextareaInput({
  placeholder,
  value,
  onChange,
  label,
  hint,
  error,
  disabled,
  rows = 3,
}: {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  label?: string
  hint?: string
  error?: string
  disabled?: boolean
  rows?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-sans" style={{ fontSize: "12px", fontWeight: 400, color: "#717179", letterSpacing: "0.01em" }}>
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        rows={rows}
        className="w-full px-3 py-2.5 rounded-lg border border-tp-slate-200 bg-white text-sm text-tp-slate-900 placeholder:text-tp-slate-400 outline-none resize-y transition-colors disabled:bg-tp-slate-100 disabled:opacity-50 focus:border-tp-blue-500 focus:ring-[3px] focus:ring-tp-blue-500/10"
        style={{
          fontFamily: "var(--font-sans)",
          borderColor: error ? "#E11D48" : undefined,
          boxShadow: error ? "0 0 0 3px rgba(225,29,72,0.10)" : undefined,
        }}
      />
      {error && <span className="text-xs text-tp-error-600">{error}</span>}
      {hint && !error && <span className="text-xs text-tp-slate-400">{hint}</span>}
    </div>
  )
}

// ─── CUSTOM SELECT (functional dropdown like CTA) ───

function CustomSelect({ label, options, disabled }: {
  label?: string
  options: string[]
  disabled?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(options[0] ?? "")
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", h)
    return () => document.removeEventListener("mousedown", h)
  }, [open])

  return (
    <div className="relative flex flex-col gap-1.5" ref={ref}>
      {label && (
        <label className="font-sans" style={{ fontSize: "12px", fontWeight: 400, color: "#717179", letterSpacing: "0.01em" }}>
          {label}
        </label>
      )}
      <div
        className="relative flex items-center gap-2 px-3 cursor-pointer select-none"
        style={{
          height: "42px",
          borderRadius: "8px",
          border: "1.5px solid #E2E2EA",
          backgroundColor: disabled ? "#F1F1F5" : "#FFFFFF",
          opacity: disabled ? 0.5 : 1,
          boxShadow: open ? "0 0 0 3px rgba(75,74,213,0.10)" : "0 1px 2px rgba(23,23,37,0.04)",
          borderColor: open ? "#4B4AD5" : "#E2E2EA",
        }}
        onClick={() => !disabled && setOpen((o) => !o)}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="flex-1 text-sm text-tp-slate-900 truncate" style={{ fontFamily: "var(--font-sans)" }}>{selected}</span>
        <FormIcon>
          <ArrowDown2 size={ICON_SIZE} variant="Linear" className={`pointer-events-none transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
        </FormIcon>
      </div>
      {open && (
        <div
          className="absolute top-full left-0 right-0 z-50 mt-1 w-full min-w-0 rounded-lg border border-tp-slate-200 bg-white py-1 shadow-lg"
          style={{ boxShadow: "0 10px 15px -3px rgba(23,23,37,0.12)" }}
          role="listbox"
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              role="option"
              aria-selected={selected === opt}
              className="w-full px-3 py-2 text-left text-sm font-medium text-tp-slate-800 hover:bg-tp-slate-100 transition-colors"
              onClick={() => { setSelected(opt); setOpen(false) }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Legacy native select for reference
function SelectInput({ label, options, disabled }: {
  label?: string
  options: string[]
  disabled?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="font-sans" style={{ fontSize: "12px", fontWeight: 400, color: "#717179", letterSpacing: "0.01em" }}>
          {label}
        </label>
      )}
      <div
        className="flex items-center gap-2 px-3"
        style={{
          height: "42px",
          borderRadius: "8px",
          border: "1.5px solid #E2E2EA",
          backgroundColor: disabled ? "#F1F1F5" : "#FFFFFF",
          opacity: disabled ? 0.5 : 1,
          boxShadow: "0 1px 2px rgba(23,23,37,0.04)",
        }}
      >
        <select
          disabled={disabled}
          className="flex-1 bg-transparent outline-none text-sm text-tp-slate-900 appearance-none"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <FormIcon>
          <ArrowDown2 size={ICON_SIZE} variant="Linear" className="pointer-events-none" />
        </FormIcon>
      </div>
    </div>
  )
}

// FormSection uses ComponentBlock for consistent segregation

// ─── STATE SECTION: Text Input (type + state toggles) ───

function TextInputStateSection() {
  const [inputType, setInputType] = useState<"regular" | "email" | "password" | "website" | "date">("email")
  const [state, setState] = useState<"active" | "focused" | "filled" | "disabled" | "viewOnly">("active")
  const [dateValue, setDateValue] = useState("")

  const iconMap = {
    regular: null,
    email: <Message size={ICON_SIZE} variant="Linear" />,
    password: <Lock size={ICON_SIZE} variant="Linear" />,
    website: <Global size={ICON_SIZE} variant="Linear" />,
    date: <Calendar1 size={ICON_SIZE} variant="Linear" />,
  }

  return (
    <ComponentBlock
      id="form-text-state"
      badge="Input"
      title="Text Input — State"
      description="Type and state toggles. Use type tabs to switch input context, state tabs for interaction states."
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold text-tp-slate-600 mb-2">Type</p>
          <div className="inline-flex rounded-lg border border-tp-slate-200 p-0.5 bg-tp-slate-50">
            {(["regular", "email", "password", "website", "date"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setInputType(t)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  inputType === t ? "bg-white text-tp-slate-800 shadow-sm border border-tp-slate-200" : "text-tp-slate-500 hover:text-tp-slate-700"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-tp-slate-600 mb-2">State</p>
          <div className="inline-flex rounded-lg border border-tp-slate-200 p-0.5 bg-tp-slate-50">
            {(["active", "focused", "filled", "disabled", "viewOnly"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setState(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  state === s ? "bg-white text-tp-slate-800 shadow-sm border border-tp-slate-200" : "text-tp-slate-500 hover:text-tp-slate-700"
                }`}
              >
                {s === "viewOnly" ? "View-Only" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-md">
          {inputType === "date" && state !== "viewOnly" ? (
            <DateInputWithPicker
              label={state.charAt(0).toUpperCase() + state.slice(1)}
              value={state === "filled" ? "15/03/2025" : dateValue}
              onChange={state === "disabled" ? undefined : setDateValue}
              placeholder="DD/MM/YYYY"
              disabled={state === "disabled"}
            />
          ) : state === "viewOnly" ? (
            <div className="flex flex-col gap-1.5">
              <label className="font-sans" style={{ fontSize: "12px", fontWeight: 400, color: "#717179" }}>View-Only</label>
              <div className="flex items-center gap-2 px-3" style={{ height: "42px", borderRadius: "8px", backgroundColor: "#FAFAFB", border: "1px dashed #E2E2EA" }}>
                {iconMap[inputType] && <FormIcon>{iconMap[inputType]}</FormIcon>}
                <span className="text-sm text-tp-slate-600">hussain@finesse.com</span>
              </div>
            </div>
          ) : (
            <TextInput
              label={state.charAt(0).toUpperCase() + state.slice(1)}
              placeholder={inputType === "date" ? "DD/MM/YYYY" : inputType === "website" ? "https://" : "hussain@finesse.com"}
              type={inputType === "password" ? "password" : inputType === "email" ? "email" : "text"}
              icon={iconMap[inputType]}
              focused={state === "focused"}
              value={state === "filled" ? "hussain@finesse.com" : undefined}
              disabled={state === "disabled"}
            />
          )}
        </div>
      </div>
    </ComponentBlock>
  )
}

// ─── STATE SECTION: Search Input ───

function SearchInputStateSection() {
  const [state, setState] = useState<"default" | "focused" | "filled" | "disabled">("default")
  const [value, setValue] = useState("")

  return (
    <ComponentBlock
      id="form-search-state"
      badge="Input"
      title="Search Input — State"
      description="State toggles for search field with icon prefix."
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold text-tp-slate-600 mb-2">State</p>
          <div className="inline-flex rounded-lg border border-tp-slate-200 p-0.5 bg-tp-slate-50">
            {(["default", "focused", "filled", "disabled"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setState(s)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  state === s ? "bg-white text-tp-slate-800 shadow-sm border border-tp-slate-200" : "text-tp-slate-500 hover:text-tp-slate-700"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-md">
          {state === "default" || state === "focused" ? (
            <div>
              <p className="text-[10px] font-semibold text-tp-slate-500 mb-2">With results dropdown (type to see)</p>
              <SearchInputWithResults placeholder="Search..." />
            </div>
          ) : (
            <TextInput
              placeholder="Search..."
              value={state === "filled" ? "patient records" : value}
              onChange={setValue}
              icon={<SearchNormal1 size={ICON_SIZE} variant="Linear" />}
              focused={state === "focused"}
              disabled={state === "disabled"}
            />
          )}
        </div>
      </div>
    </ComponentBlock>
  )
}

// ─── STATE SECTION: Feedback (Normal, Error, Warning, Success) ───

function FeedbackStateSection() {
  const [feedback, setFeedback] = useState<InputFeedback>("normal")

  return (
    <ComponentBlock
      id="form-feedback-state"
      badge="Feedback"
      title="Input Feedback — State"
      description="Feedback toggles: Normal, Error, Warning, Success. Messages appear below the input at 12px."
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-xs font-semibold text-tp-slate-600 mb-2">Feedback</p>
          <div className="inline-flex rounded-lg border border-tp-slate-200 p-0.5 bg-tp-slate-50">
            {(["normal", "error", "warning", "success"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFeedback(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  feedback === f ? "bg-white text-tp-slate-800 shadow-sm border border-tp-slate-200" : "text-tp-slate-500 hover:text-tp-slate-700"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-md">
          <TextInput
            label="Feedback example"
            placeholder="hussain@finesse.com"
            icon={<Message size={ICON_SIZE} variant="Linear" />}
            feedback={feedback}
            feedbackMessage={
              feedback === "normal" ? "Helping text for user" :
              feedback === "error" ? "This field is required" :
              feedback === "warning" ? "Missing characters" :
              "Email verified"
            }
            value={feedback !== "normal" ? "hussain@finesse.com" : undefined}
          />
        </div>
      </div>
    </ComponentBlock>
  )
}

// ─── CHECKBOX SECTION ───

function CheckboxSection() {
  const [c1, setC1] = useState(true)
  const [c2, setC2] = useState(false)
  return (
    <ComponentBlock
      id="form-checkbox"
      badge="Selection"
      title="Checkbox"
      description="Multi-select. 20×20px, 6px radius. Checked: TP Blue 500. Indeterminate: horizontal dash."
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start gap-8">
          <Checkbox checked={c1} onChange={setC1} label="Checked" description="This option is selected" />
          <Checkbox checked={c2} onChange={setC2} label="Unchecked" description="Click to select" />
          <Checkbox checked={false} onChange={() => {}} indeterminate label="Indeterminate" description="Partial selection" />
          <Checkbox checked={true} onChange={() => {}} disabled label="Disabled" description="Cannot change" />
        </div>
        <div className="p-3 border border-tp-slate-200 rounded-lg bg-tp-slate-50">
          <span className="text-xs font-semibold text-tp-slate-600 block mb-2">Checkbox Group</span>
          <div className="flex flex-col gap-3">
            <Checkbox checked={c1} onChange={setC1} label="Email notifications" />
            <Checkbox checked={c2} onChange={setC2} label="SMS notifications" />
            <Checkbox checked={false} onChange={() => {}} label="Push notifications" />
          </div>
        </div>
      </div>
    </ComponentBlock>
  )
}

// ─── TOGGLE SECTION ───

function ToggleSection() {
  const [t1, setT1] = useState(true)
  const [t2, setT2] = useState(false)
  const [t3, setT3] = useState(true)
  return (
    <ComponentBlock
      id="form-toggle"
      badge="Switch"
      title="Toggle / Switch"
      description="Binary on/off. S (36×20), M (44×24), L (52×28). Active: TP Blue 500. Inactive: TP Slate 300."
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-6">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Toggle checked={t1} onChange={setT1} size={size} />
              <span className="text-[10px] font-mono text-tp-slate-400">{size.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3">
            <Toggle checked={t1} onChange={setT1} />
            <span className="text-sm text-tp-slate-700">Active</span>
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={t2} onChange={setT2} />
            <span className="text-sm text-tp-slate-700">Inactive</span>
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={t3} onChange={setT3} disabled />
            <span className="text-sm text-tp-slate-400">Disabled</span>
          </div>
        </div>
      </div>
    </ComponentBlock>
  )
}

// ─── RADIO SECTION ───

function RadioSection() {
  const [selected, setSelected] = useState("option1")
  return (
    <ComponentBlock
      id="form-radio"
      badge="Selection"
      title="Radio Button"
      description="Single-select per group. 20×20px circle. Selected: 2px TP Blue border, 10px inner dot."
    >
      <div className="flex flex-col gap-3 max-w-md">
        <Radio checked={selected === "option1"} onChange={() => setSelected("option1")} label="Option 1" description="Default selection" />
        <Radio checked={selected === "option2"} onChange={() => setSelected("option2")} label="Option 2" description="Alternative choice" />
        <Radio checked={selected === "option3"} onChange={() => setSelected("option3")} label="Option 3" description="Another option" />
        <Radio checked={false} onChange={() => {}} disabled label="Option 4" description="Disabled state" />
      </div>
    </ComponentBlock>
  )
}

// ─── MAIN FORM SHOWCASE ───

export function FormShowcase() {
  return (
    <ComponentCategory>
      {/* Hard Constraints */}
      <ComponentBlock
        id="form-constraints"
        badge="Specs"
        title="Form Controls Hard Constraints"
        description="Icon family: Lucide (linear), strokeWidth 1.5 for inputs and CTAs. Placeholder: TP.text.placeholder (#A2A2A8). Focus: 2px TP Blue + 3px ring."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-sm">
          {[
            { label: "Input height", value: "42px" },
            { label: "Radius", value: "8px" },
            { label: "Label", value: "12px / 400" },
            { label: "Icons", value: "Iconsax, 18px, Linear" },
            { label: "Border", value: "1.5px default" },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5 p-3 rounded-lg bg-white/80 border border-tp-slate-100">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-tp-slate-500">{label}</span>
              <code className="text-xs font-mono font-medium text-tp-slate-800">{value}</code>
            </div>
          ))}
        </div>
      </ComponentBlock>

      {/* Text Input — State (master toggles) */}
      <TextInputStateSection />

      {/* Search Input — State */}
      <SearchInputStateSection />

      {/* Feedback — State */}
      <FeedbackStateSection />

      {/* Material-style Date & Time Pickers */}
      <DateTimePickerShowcase />

      {/* Text Input Types (anatomy) */}
      <ComponentBlock
        id="form-text-types"
        badge="Input"
        title="Text Input — Types"
        description="Regular, Email, Password, Website, Date. Icons match input purpose."
      >
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
          <TextInput label="Email" placeholder="hussain@finesse.com" icon={<Message size={ICON_SIZE} variant="Linear" />} />
          <TextInput label="Password" placeholder="Enter password" type="password" icon={<Lock size={ICON_SIZE} variant="Linear" />} />
          <TextInput label="Website" placeholder="https://" icon={<Global size={ICON_SIZE} variant="Linear" />} />
          <DateInputWithPicker label="Date" placeholder="DD/MM/YYYY" />
        </div>
      </ComponentBlock>

      {/* Textarea */}
      <ComponentBlock
        id="form-textarea"
        badge="Input"
        title="Textarea"
        description="Multi-line input. Same tokens as Text Input. Resizable vertically."
      >
        <div className="max-w-md space-y-4">
          <TextareaInput label="Notes" placeholder="Enter additional notes..." hint="Optional" />
          <TextareaInput label="With error" placeholder="Required field" error="This field is required" />
        </div>
      </ComponentBlock>

      {/* Select */}
      <ComponentBlock
        id="form-select"
        badge="Input"
        title="Select Input"
        description="Click to open dropdown (like CTA). Option A, Option B, etc. Iconsax ArrowDown2, Linear variant."
      >
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
          <CustomSelect label="Select" options={["Select option...", "Option A", "Option B", "Option C"]} />
          <CustomSelect label="Disabled Select" options={["Select option..."]} disabled />
        </div>
      </ComponentBlock>

      {/* Autocomplete */}
      <ComponentBlock
        id="form-autocomplete"
        badge="Input"
        title="Autocomplete"
        description="Combobox: type to filter, click to select. For searchable select (e.g. doctor, patient)."
      >
        <div className="max-w-md">
          <AutocompleteInput label="Select doctor" placeholder="Search or select..." />
        </div>
      </ComponentBlock>

      {/* Checkbox */}
      <CheckboxSection />

      {/* Radio */}
      <RadioSection />

      {/* Toggle */}
      <ToggleSection />
    </ComponentCategory>
  )
}

