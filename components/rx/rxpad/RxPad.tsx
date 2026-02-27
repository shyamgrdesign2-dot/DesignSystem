"use client"

import { useState, useCallback } from "react"
import {
  Activity,
  Health,
  MedalStar,
  Notepad,
  Hospital,
  ChemicalGlass,
  Calendar,
  Edit2,
  DocumentText,
  Add,
} from "iconsax-react"
import { RxPadSection, ChipSearchInput, MedicationTable } from "./RxPadSection"
import type { MedicationRowData } from "./RxPadSection"
import {
  symptomSuggestions,
  examinationSuggestions,
  diagnosisSuggestions,
  labInvestigationSuggestions,
} from "../sample-data"

/**
 * RxPad — Main Prescription Content Area
 * ───────────────────────────────────────
 * The primary workspace where doctors write prescriptions.
 * Mirrors the Figma design: vertical stack of sections.
 *
 * Sections (in order from Figma):
 *   1. Symptoms — search + chip selection
 *   2. Examinations — search + chip selection
 *   3. Diagnosis — search + chip selection
 *   4. Vitals — grid of input fields (BP, Temp, HR, RR, Weight, Surgery/Procedure)
 *   5. Medication (Rx) — editable table
 *   6. Advices — rich text area
 *   7. Lab Investigation — search + chips
 *   8. Follow-up — date + quick selectors
 *   9. Additional Notes — text input
 *
 * Design tokens:
 *   - Gap between sections: 12px
 *   - Section background: white
 *   - Section border: 1px TP Slate 200, radius 12px
 *   - Content area max-width: 100% (fills available space)
 *   - Background: TP Slate 50/50 (very subtle)
 */

export function RxPad() {
  // State for each section
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [examinations, setExaminations] = useState<string[]>([])
  const [diagnoses, setDiagnoses] = useState<string[]>([])
  const [labInvestigations, setLabInvestigations] = useState<string[]>([])
  const [medications, setMedications] = useState<MedicationRowData[]>([
    { id: "rx-1", medicine: "A Tron 4mg Tablet MD\nOndansetron (4mg)", unitPerDose: "1 Tablets", frequency: "1 - 0 - 1 - 0", when: "With Food", duration: "Till Required", note: "" },
    { id: "rx-2", medicine: "A Tron 4mg Tablet MD\nOndansetron (4mg)", unitPerDose: "1 Tablets", frequency: "1 - 0 - 1 - 0", when: "With Food", duration: "Till Required", note: "" },
    { id: "rx-3", medicine: "A Tron 4mg Tablet MD\nOndansetron (4mg)", unitPerDose: "1 Tablets", frequency: "1 - 0 - 1 - 0", when: "With Food", duration: "Till Required", note: "" },
  ])
  const [advices, setAdvices] = useState("")
  const [followUpDate, setFollowUpDate] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  // Vitals state
  const [vitals, setVitals] = useState({
    bpSystolic: "",
    bpDiastolic: "",
    temperature: "",
    heartRate: "",
    respiratoryRate: "",
    weight: "",
    surgeryProcedure: "",
  })

  const addSymptom = useCallback((s: string) => setSymptoms(prev => [...prev, s]), [])
  const removeSymptom = useCallback((s: string) => setSymptoms(prev => prev.filter(i => i !== s)), [])
  const addExamination = useCallback((s: string) => setExaminations(prev => [...prev, s]), [])
  const removeExamination = useCallback((s: string) => setExaminations(prev => prev.filter(i => i !== s)), [])
  const addDiagnosis = useCallback((s: string) => setDiagnoses(prev => [...prev, s]), [])
  const removeDiagnosis = useCallback((s: string) => setDiagnoses(prev => prev.filter(i => i !== s)), [])
  const addLabInvestigation = useCallback((s: string) => setLabInvestigations(prev => [...prev, s]), [])
  const removeLabInvestigation = useCallback((s: string) => setLabInvestigations(prev => prev.filter(i => i !== s)), [])

  const removeMedication = useCallback((id: string) => {
    setMedications(prev => prev.filter(m => m.id !== id))
  }, [])

  const updateMedication = useCallback((id: string, field: keyof MedicationRowData, value: string) => {
    setMedications(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
  }, [])

  const addMedication = useCallback(() => {
    setMedications(prev => [...prev, {
      id: `rx-${Date.now()}`,
      medicine: "",
      unitPerDose: "",
      frequency: "",
      when: "",
      duration: "",
      note: "",
    }])
  }, [])

  return (
    <div className="flex flex-col gap-3 p-4 max-lg:p-3">
      {/* ── 1. Symptoms ── */}
      <RxPadSection
        title="Symptoms"
        icon={<Health size={18} variant="Bulk" />}
      >
        <ChipSearchInput
          placeholder="Search Symptoms"
          suggestions={symptomSuggestions}
          selectedItems={symptoms}
          onAdd={addSymptom}
          onRemove={removeSymptom}
        />
      </RxPadSection>

      {/* ── 2. Examinations ── */}
      <RxPadSection
        title="Examinations"
        icon={<MedalStar size={18} variant="Bulk" />}
      >
        <ChipSearchInput
          placeholder="Search Examinations"
          suggestions={examinationSuggestions}
          selectedItems={examinations}
          onAdd={addExamination}
          onRemove={removeExamination}
        />
      </RxPadSection>

      {/* ── 3. Diagnosis ── */}
      <RxPadSection
        title="Diagnosis"
        icon={<Notepad size={18} variant="Bulk" />}
      >
        <ChipSearchInput
          placeholder="Search Diagnosis"
          suggestions={diagnosisSuggestions}
          selectedItems={diagnoses}
          onAdd={addDiagnosis}
          onRemove={removeDiagnosis}
        />
      </RxPadSection>

      {/* ── 4. Vitals ── */}
      <RxPadSection
        title="Vitals"
        icon={<Activity size={18} variant="Bulk" />}
        showViewToggle={false}
      >
        <div className="grid grid-cols-3 gap-3 max-lg:grid-cols-2">
          {/* Blood Pressure */}
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-tp-slate-600">
              Blood Pressure
              <span className="cursor-help text-tp-slate-400" title="Systolic/Diastolic">&#9432;</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={vitals.bpSystolic}
                onChange={(e) => setVitals(v => ({ ...v, bpSystolic: e.target.value }))}
                placeholder="Enter"
                className="w-full rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2 text-xs text-tp-slate-800 placeholder:text-tp-slate-400 focus:border-tp-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20"
              />
              <span className="shrink-0 rounded-lg bg-tp-blue-50 px-2 py-2 text-[11px] font-medium text-tp-blue-600">mmHg</span>
            </div>
          </div>

          {/* Temperature */}
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-tp-slate-600">
              Temperature
              <span className="cursor-help text-tp-slate-400" title="In Fahrenheit">&#9432;</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={vitals.temperature}
                onChange={(e) => setVitals(v => ({ ...v, temperature: e.target.value }))}
                placeholder="Enter"
                className="w-full rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2 text-xs text-tp-slate-800 placeholder:text-tp-slate-400 focus:border-tp-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20"
              />
              <button className="shrink-0 rounded-lg bg-tp-blue-500 p-2 text-white hover:bg-tp-blue-600 transition-colors" title="Convert temperature">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M4.5 9.5L7 12l2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 5a3 3 0 10-6 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
              </button>
            </div>
          </div>

          {/* Surgery/Procedure Name */}
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-tp-slate-600">
              Surgery/Procedure Name
              <span className="cursor-help text-tp-slate-400" title="Optional">&#9432;</span>
            </label>
            <input
              type="text"
              value={vitals.surgeryProcedure}
              onChange={(e) => setVitals(v => ({ ...v, surgeryProcedure: e.target.value }))}
              placeholder="Enter Surgery/Procedure Name"
              className="w-full rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2 text-xs text-tp-slate-800 placeholder:text-tp-slate-400 focus:border-tp-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20"
            />
          </div>

          {/* Heart Rate */}
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-tp-slate-600">
              Heart Rate
              <span className="cursor-help text-tp-slate-400" title="Beats per minute">&#9432;</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={vitals.heartRate}
                onChange={(e) => setVitals(v => ({ ...v, heartRate: e.target.value }))}
                placeholder="Enter"
                className="w-full rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2 text-xs text-tp-slate-800 placeholder:text-tp-slate-400 focus:border-tp-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20"
              />
              <span className="shrink-0 rounded-lg bg-tp-blue-50 px-2 py-2 text-[11px] font-medium text-tp-blue-600">mmHg</span>
            </div>
          </div>

          {/* Respiratory Rate */}
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-tp-slate-600">
              Respiratory Rate
              <span className="cursor-help text-tp-slate-400" title="Breaths per minute">&#9432;</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={vitals.respiratoryRate}
                onChange={(e) => setVitals(v => ({ ...v, respiratoryRate: e.target.value }))}
                placeholder="Enter"
                className="w-full rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2 text-xs text-tp-slate-800 placeholder:text-tp-slate-400 focus:border-tp-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20"
              />
              <span className="shrink-0 rounded-lg bg-tp-blue-50 px-2 py-2 text-[11px] font-medium text-tp-blue-600">mmHg</span>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="mb-1.5 flex items-center gap-1 text-[11px] font-medium text-tp-slate-600">
              Weight
              <span className="cursor-help text-tp-slate-400" title="In kilograms">&#9432;</span>
            </label>
            <div className="flex items-center gap-1">
              <input
                type="text"
                value={vitals.weight}
                onChange={(e) => setVitals(v => ({ ...v, weight: e.target.value }))}
                placeholder="Enter"
                className="w-full rounded-lg border border-tp-slate-200 bg-tp-slate-50 px-2.5 py-2 text-xs text-tp-slate-800 placeholder:text-tp-slate-400 focus:border-tp-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20"
              />
              <span className="shrink-0 rounded-lg bg-tp-blue-50 px-2 py-2 text-[11px] font-medium text-tp-blue-600">kg</span>
            </div>
          </div>
        </div>
      </RxPadSection>

      {/* ── 5. Medication (Rx) ── */}
      <RxPadSection
        title="Medication (Rx)"
        icon={<Hospital size={18} variant="Bulk" />}
      >
        <MedicationTable
          rows={medications}
          onUpdate={updateMedication}
          onRemove={removeMedication}
          onAdd={addMedication}
        />
      </RxPadSection>

      {/* ── 6. Advices ── */}
      <RxPadSection
        title="Advices"
        icon={<Edit2 size={18} variant="Bulk" />}
        showViewToggle={false}
        autofillLabel="Autofill from OPD (24 Jun 2025)"
      >
        <div>
          <textarea
            value={advices}
            onChange={(e) => setAdvices(e.target.value)}
            placeholder="Enter Chief Complaint"
            rows={3}
            className="
              w-full rounded-lg border border-tp-slate-200 bg-tp-slate-50
              px-3 py-2 text-xs text-tp-slate-800
              placeholder:text-tp-slate-400
              focus:border-tp-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20
              resize-none transition-colors
            "
          />
          {/* Toolbar */}
          <div className="mt-2 flex items-center gap-1.5 border-t border-tp-slate-100 pt-2">
            <button className="rounded p-1.5 text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700 transition-colors" title="Bold">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3.5 2.5h4.75a2.25 2.25 0 010 4.5H3.5V2.5z" stroke="currentColor" strokeWidth="1.5" /><path d="M3.5 7h5.25a2.5 2.5 0 010 5H3.5V7z" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
            <button className="rounded p-1.5 text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700 transition-colors" title="Heading">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 2.5v9M11.5 2.5v9M2.5 7h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
            <button className="rounded p-1.5 text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700 transition-colors" title="Bullet list">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3.5h7M5 7h7M5 10.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="2.5" cy="3.5" r="1" fill="currentColor" /><circle cx="2.5" cy="7" r="1" fill="currentColor" /><circle cx="2.5" cy="10.5" r="1" fill="currentColor" /></svg>
            </button>
            <button className="rounded p-1.5 text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700 transition-colors" title="Voice input">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="5" y="1.5" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 7.5a4 4 0 008 0M7 11.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </button>
            <button className="rounded p-1.5 text-tp-slate-500 hover:bg-tp-slate-100 hover:text-tp-slate-700 transition-colors" title="Settings">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 9a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" /><path d="M11.5 7a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </div>
        </div>
      </RxPadSection>

      {/* ── 7. Lab Investigation ── */}
      <RxPadSection
        title="Lab Investigation"
        icon={<ChemicalGlass size={18} variant="Bulk" />}
        autofillLabel="Autofill from OPD (24 Jun 2025)"
      >
        <ChipSearchInput
          placeholder="Search Lab Investigation"
          suggestions={labInvestigationSuggestions}
          selectedItems={labInvestigations}
          onAdd={addLabInvestigation}
          onRemove={removeLabInvestigation}
        />
      </RxPadSection>

      {/* ── 8. Follow-up + 9. Additional Notes (side by side) ── */}
      <div className="grid grid-cols-2 gap-3 max-lg:grid-cols-1">
        <RxPadSection
          title="Follow-up"
          icon={<Calendar size={18} variant="Bulk" />}
          showViewToggle={false}
          showCopy={false}
          showExpand={false}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                placeholder="e.g. 3 Days"
                className="
                  flex-1 rounded-lg border border-tp-slate-200 bg-tp-slate-50
                  px-2.5 py-2 text-xs text-tp-slate-800
                  placeholder:text-tp-slate-400
                  focus:border-tp-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20
                "
              />
              <button className="rounded-lg border border-tp-slate-200 bg-tp-slate-50 p-2 text-tp-slate-500 hover:bg-tp-slate-100 transition-colors" title="Calendar">
                <Calendar size={16} variant="Linear" />
              </button>
            </div>
            <div className="flex gap-2">
              {["2 Days", "5 Days", "1 Week"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFollowUpDate(opt)}
                  className={`
                    flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors
                    ${followUpDate === opt
                      ? "border-tp-blue-300 bg-tp-blue-50 text-tp-blue-600"
                      : "border-tp-slate-200 bg-tp-slate-50 text-tp-slate-600 hover:border-tp-blue-200 hover:bg-tp-blue-50/50"
                    }
                  `}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </RxPadSection>

        <RxPadSection
          title="Additional Notes"
          icon={<DocumentText size={18} variant="Bulk" />}
          showViewToggle={false}
          showCopy={false}
          showExpand={false}
        >
          <input
            type="text"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Enter any specific note here"
            className="
              w-full rounded-lg border border-tp-slate-200 bg-tp-slate-50
              px-2.5 py-2 text-xs text-tp-slate-800
              placeholder:text-tp-slate-400
              focus:border-tp-blue-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-tp-blue-500/20
            "
          />
        </RxPadSection>
      </div>

      {/* ── Add Medical History link ── */}
      <button className="flex items-center gap-2 self-start rounded-lg px-3 py-2 text-xs font-medium text-tp-blue-500 hover:bg-tp-blue-50 transition-colors">
        <Add size={16} variant="Linear" />
        Add Medical History
      </button>

      {/* ── Bottom Autofill bar ── */}
      <div className="flex items-center justify-end">
        <button className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-tp-success-500 to-tp-success-400 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm hover:shadow-md transition-shadow">
          <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
          Autofill from OPD (24 Jun 2025)
        </button>
      </div>
    </div>
  )
}
