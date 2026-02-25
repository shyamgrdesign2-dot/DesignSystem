"use client"

import { useCallback, useState } from "react"
import { ExportPanel } from "@/components/design-system/export-panel"
import { CopyToast } from "@/components/design-system/copy-toast"
import { ColorSwatch, SemanticSwatch } from "@/components/design-system/color-swatch"
import { CtaShowcase } from "@/components/design-system/cta-showcase"
import { StylesShowcase } from "@/components/design-system/styles-showcase"
import {
  ShadowShowcase,
  RadiusShowcase,
  BorderShowcase,
  IconShowcase,
} from "@/components/design-system/foundation-showcase"
import { FormShowcase } from "@/components/design-system/form-showcase"
import {
  TabsShowcase,
  SegmentedControlShowcase,
  DropdownShowcase,
  SearchDropdownShowcase,
} from "@/components/design-system/navigation-showcase"
import { SearchCommandShowcase } from "@/components/design-system/search-command-showcase"
import {
  LabelShowcase,
  ChipShowcase,
  BannerShowcase,
} from "@/components/design-system/tags-showcase"
import { SecondaryNavShowcase } from "@/components/design-system/secondary-nav-showcase"
import {
  DataTableShowcase,
  PaginationShowcase,
  TooltipShowcase,
  ModalShowcase,
} from "@/components/design-system/data-showcase"
import {
  ToastShowcase,
  DatePickerShowcase,
} from "@/components/design-system/feedback-showcase"
import {
  AvatarShowcase,
  BadgeShowcase,
  DividerShowcase,
  SliderShowcase,
  RatingShowcase,
  ProgressShowcase,
  SkeletonShowcase,
  ListShowcase,
  BreadcrumbsShowcase,
  StepperShowcase,
  AccordionShowcase,
  CardShowcase,
} from "@/components/design-system/extras-showcase"
import {
  GradientDemo,
  TypographyDemo,
  SpacingDemo,
  GridDemo,
  AlertDemo,
} from "@/components/design-system/component-demos"
import {
  designTokens,
  semanticTokens,
  opacityScale,
  noiseTexture,
  type ColorGroup,
  type FunctionalGroup,
} from "@/lib/design-tokens"
import { SectionHeader, ComponentCard } from "@/components/design-system/design-system-section"

export default function Page() {
  const [toastMessage, setToastMessage] = useState("")
  const [toastVisible, setToastVisible] = useState(false)

  const handleCopy = useCallback((_: string, message: string) => {
    setToastMessage(message)
    setToastVisible(true)
  }, [])

  const handleExport = useCallback((message: string) => {
    setToastMessage(message)
    setToastVisible(true)
  }, [])

  const navGroups = [
    {
      label: "Foundations",
      items: [
        { id: "color-primitives", label: "Primitive colors" },
        { id: "semantic-tokens", label: "Semantic colors" },
        { id: "foundations", label: "Shadows, hover, focus, radius" },
        { id: "styles", label: "Styles" },
      ],
    },
    {
      label: "Components",
      items: [
        { id: "buttons", label: "Buttons" },
        { id: "forms", label: "Form controls" },
        { id: "navigation", label: "Navigation" },
        { id: "tags", label: "Tags & chips" },
        { id: "data", label: "Data display" },
        { id: "feedback", label: "Feedback" },
        { id: "extras", label: "Surfaces & misc" },
      ],
    },
  ] as const

  const primitiveColorGroups = [
    designTokens.primary as ColorGroup,
    designTokens.secondary as ColorGroup,
    designTokens.tertiary as ColorGroup,
    designTokens.tpSlate as ColorGroup,
    designTokens.aiGradientStops as ColorGroup,
  ]

  const functionalGroup = designTokens.functional as FunctionalGroup

  return (
    <div className="min-h-screen bg-[#F5F5F8] text-tp-slate-900 flex flex-col">
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-0">
        {/* Minimal sidebar — Material-style */}
        <aside className="hidden w-[200px] shrink-0 lg:block">
          <nav className="sticky top-20 py-6 pr-6">
            <a href="/" className="block">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-tp-slate-400">
                TatvaPractice
              </p>
              <p className="mt-0.5 font-semibold text-tp-slate-900">Design System</p>
            </a>
            <div className="mt-8 space-y-6">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-tp-slate-400">
                    {group.label}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block rounded-md py-1.5 pl-2 text-sm text-tp-slate-600 hover:bg-tp-slate-100 hover:text-tp-slate-900"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main scrollable content — developer focus */}
        <main className="min-w-0 flex-1 overflow-y-auto border-l border-tp-slate-200/80 bg-white/50">
          <div className="max-w-[900px] px-10 py-12">
            <header className="mb-12 flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-tp-slate-900 font-heading">
                  TatvaPractice Design System
                </h1>
                <p className="mt-1 text-sm text-tp-slate-600">
                  MUI-based component library themed for clinical workflows.
                </p>
              </div>
              <ExportPanel onExport={handleExport} />
            </header>

            <section
              id="color-primitives"
              className="scroll-mt-20 border-t border-tp-slate-200 pt-12 pb-12 first:border-t-0 first:pt-0"
            >
              <h2 className="text-xl font-semibold font-heading text-tp-slate-900">
                Primitive Colors
              </h2>
              <p className="mt-1 text-sm text-tp-slate-600">
                Full primitive palette used as source-of-truth for semantic mapping.
                Click any swatch to copy hex value.
              </p>
              <div className="mt-5 space-y-8">
                {primitiveColorGroups.map((group) => (
                  <div key={group.name}>
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-tp-slate-800">
                        {group.name}
                      </h4>
                      <p className="text-xs text-tp-slate-500">{group.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                      {group.colors.map((entry) => (
                        <ColorSwatch
                          key={`${group.name}-${entry.token}`}
                          token={entry.token}
                          value={entry.value}
                          usage={entry.usage}
                          onCopy={handleCopy}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                <div>
                  <div className="mb-3">
                    <h4 className="text-sm font-semibold text-tp-slate-800">
                      {functionalGroup.name}
                    </h4>
                    <p className="text-xs text-tp-slate-500">
                      {functionalGroup.description}
                    </p>
                  </div>
                  <div className="space-y-6">
                    {functionalGroup.subgroups.map((sub) => (
                      <div key={sub.name}>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-tp-slate-500">
                          {sub.name}
                        </p>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                          {sub.colors.map((entry) => (
                            <ColorSwatch
                              key={`${sub.name}-${entry.token}`}
                              token={entry.token}
                              value={entry.value}
                              usage={entry.usage}
                              onCopy={handleCopy}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section
              id="semantic-tokens"
              className="scroll-mt-20 border-t border-tp-slate-200 pt-12 pb-12"
            >
              <h2 className="text-xl font-semibold font-heading text-tp-slate-900">
                Semantic Colors
              </h2>
              <p className="mt-1 text-sm text-tp-slate-600">
                Component-facing token system (text, background, border, icon, status).
                Click any item to copy token name.
              </p>
              <div className="mt-5 space-y-8">
                {Object.values(semanticTokens).map((category) => (
                  <div key={category.name}>
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-tp-slate-800">
                        {category.name}
                      </h4>
                      <p className="text-xs text-tp-slate-500">
                        {category.description}
                      </p>
                    </div>
                    <div className="space-y-5">
                      {category.groups.map((group) => (
                        <div key={group.name}>
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-tp-slate-500">
                            {group.name}
                          </p>
                          <div className="grid gap-3 lg:grid-cols-2">
                            {group.tokens.map((token) => (
                              <SemanticSwatch
                                key={token.token}
                                token={token}
                                onCopy={handleCopy}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="rounded-xl border border-tp-slate-200 bg-tp-slate-50 p-4">
                  <h4 className="text-sm font-semibold text-tp-slate-800">
                    Opacity + Noise Tokens
                  </h4>
                  <p className="mt-1 text-xs text-tp-slate-600">
                    Shared opacity scale and grain texture configuration used for layered gradients.
                  </p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-4 lg:grid-cols-5">
                    {opacityScale.map((entry) => (
                      <button
                        key={entry.token}
                        className="rounded-lg border border-tp-slate-200 bg-white px-2 py-2 text-left text-xs hover:border-tp-blue-200"
                        onClick={() =>
                          handleCopy(
                            JSON.stringify(entry.decimal),
                            `Copied opacity ${entry.token}`
                          )
                        }
                      >
                        <div className="font-semibold text-tp-slate-700">
                          {entry.token}
                        </div>
                        <div className="font-mono text-tp-slate-500">{entry.decimal}</div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-tp-slate-200 bg-white p-3 text-xs text-tp-slate-600">
                    <p>
                      <strong>Noise:</strong> hero {noiseTexture.opacity.hero}, card{" "}
                      {noiseTexture.opacity.card}, blend {noiseTexture.blend}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="foundations" className="scroll-mt-20 border-t border-tp-slate-200 pt-14 pb-14">
              <SectionHeader
                id="foundations-heading"
                title="Shadows, Hover, Focus & Radius"
                description="Foundation tokens with embedded TP token references for elevation, interaction states and corner radius."
              />
              <div className="mt-10 flex flex-col gap-8">
                <ComponentCard><ShadowShowcase /></ComponentCard>
                <ComponentCard><RadiusShowcase /></ComponentCard>
                <ComponentCard><BorderShowcase /></ComponentCard>
                <ComponentCard><IconShowcase /></ComponentCard>
                <ComponentCard><GradientDemo /></ComponentCard>
                <ComponentCard><TypographyDemo /></ComponentCard>
                <ComponentCard><SpacingDemo /></ComponentCard>
                <ComponentCard><GridDemo /></ComponentCard>
              </div>
            </section>

            <section id="styles" className="scroll-mt-20 border-t border-tp-slate-200 pt-14 pb-14">
              <SectionHeader
                id="styles-heading"
                title="Styles"
                description="Typography, spacing, and layout token system."
              />
              <div className="mt-10">
                <ComponentCard><StylesShowcase /></ComponentCard>
              </div>
            </section>

            <section id="buttons" className="scroll-mt-20 border-t border-tp-slate-200 pt-14 pb-14">
              <SectionHeader
                id="buttons-heading"
                title="Buttons"
                description="CTA anatomy, states, themes and sizes. Click any button to copy its JSX. Dark surface variants (Primary & Violet Depth only)."
                links={[
                  { href: "#cta-anatomy", label: "Anatomy" },
                  { href: "#cta-state", label: "State × Theme" },
                  { href: "#cta-on-dark", label: "On Dark" },
                  { href: "#cta-split", label: "Dropdown CTA" },
                  { href: "#cta-real-world", label: "Real-World" },
                ]}
              />
              <div className="mt-10">
                <CtaShowcase onCopy={handleCopy} />
              </div>
            </section>

            <section id="forms" className="scroll-mt-20 border-t border-tp-slate-200 pt-14 pb-14" aria-labelledby="forms-heading">
              <SectionHeader
                id="forms-heading"
                title="Form Controls"
                description="Text inputs, search, select, checkbox, radio, toggle. Each component in its own section. State toggles for Text Input, Search, and Feedback. Iconsax icons, Linear variant."
                links={[
                  { href: "#form-text-state", label: "Text Input" },
                  { href: "#form-search-state", label: "Search" },
                  { href: "#form-feedback-state", label: "Feedback" },
                  { href: "#form-text-types", label: "Text Types" },
                  { href: "#form-textarea", label: "Textarea" },
                  { href: "#form-select", label: "Select" },
                  { href: "#form-autocomplete", label: "Autocomplete" },
                  { href: "#form-checkbox", label: "Checkbox" },
                  { href: "#form-radio", label: "Radio" },
                  { href: "#form-toggle", label: "Toggle" },
                ]}
              />
              <div className="mt-10">
                <FormShowcase />
              </div>
            </section>

            <section id="navigation" className="scroll-mt-20 border-t border-tp-slate-200 pt-14 pb-14">
              <SectionHeader
                id="navigation-heading"
                title="Navigation"
                description="Secondary nav, tabs, segmented controls, dropdowns. Wayfinding and menu patterns."
              />
              <div className="mt-10 flex flex-col gap-8">
                <ComponentCard><SecondaryNavShowcase /></ComponentCard>
                <ComponentCard><TabsShowcase /></ComponentCard>
                <ComponentCard><SegmentedControlShowcase /></ComponentCard>
                <ComponentCard><DropdownShowcase /></ComponentCard>
                <ComponentCard><SearchDropdownShowcase /></ComponentCard>
                <ComponentCard><SearchCommandShowcase /></ComponentCard>
              </div>
            </section>

            <section id="tags" className="scroll-mt-20 border-t border-tp-slate-200 pt-14 pb-14">
              <SectionHeader
                id="tags-heading"
                title="Tags & Chips"
                description="Labels, chips, banners, alerts. Compact status and categorization components."
              />
              <div className="mt-10 flex flex-col gap-8">
                <ComponentCard><LabelShowcase /></ComponentCard>
                <ComponentCard><ChipShowcase /></ComponentCard>
                <ComponentCard><BannerShowcase /></ComponentCard>
                <ComponentCard><AlertDemo /></ComponentCard>
              </div>
            </section>

            <section id="data" className="scroll-mt-20 border-t border-tp-slate-200 pt-14 pb-14">
              <SectionHeader
                id="data-heading"
                title="Data Display"
                description="Tables, pagination, tooltips, modals. Data presentation and overlay patterns."
              />
              <div className="mt-10 flex flex-col gap-8">
                <ComponentCard><DataTableShowcase /></ComponentCard>
                <ComponentCard><PaginationShowcase /></ComponentCard>
                <ComponentCard><TooltipShowcase /></ComponentCard>
                <ComponentCard><ModalShowcase /></ComponentCard>
              </div>
            </section>

            <section id="feedback" className="scroll-mt-20 border-t border-tp-slate-200 pt-14 pb-14">
              <SectionHeader
                id="feedback-heading"
                title="Feedback"
                description="Toasts, date pickers. User feedback and temporal input patterns."
              />
              <div className="mt-10 flex flex-col gap-8">
                <ComponentCard><ToastShowcase /></ComponentCard>
                <ComponentCard><DatePickerShowcase /></ComponentCard>
              </div>
            </section>

            <section id="extras" className="scroll-mt-20 border-t border-tp-slate-200 pt-14 pb-14">
              <SectionHeader
                id="extras-heading"
                title="Surfaces & Misc"
                description="Avatars, badges, dividers, sliders, ratings, progress, skeletons, lists, breadcrumbs, steppers, accordions, cards."
              />
              <div className="mt-10 flex flex-col gap-8">
                <ComponentCard><AvatarShowcase /></ComponentCard>
                <ComponentCard><BadgeShowcase /></ComponentCard>
                <ComponentCard><DividerShowcase /></ComponentCard>
                <ComponentCard><SliderShowcase /></ComponentCard>
                <ComponentCard><RatingShowcase /></ComponentCard>
                <ComponentCard><ProgressShowcase /></ComponentCard>
                <ComponentCard><SkeletonShowcase /></ComponentCard>
                <ComponentCard><ListShowcase /></ComponentCard>
                <ComponentCard><BreadcrumbsShowcase /></ComponentCard>
                <ComponentCard><StepperShowcase /></ComponentCard>
                <ComponentCard><AccordionShowcase /></ComponentCard>
                <ComponentCard><CardShowcase /></ComponentCard>
              </div>
            </section>
          </div>
        </main>
      </div>

      <CopyToast message={toastMessage} show={toastVisible} onClose={() => setToastVisible(false)} />
    </div>
  )
}

