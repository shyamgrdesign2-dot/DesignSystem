"use client"

import { PageHeader } from "@/components/docs/page-header"
import { FormShowcase } from "@/components/design-system/form-showcase"
import { TokenPanel } from "@/components/design-system/token-badge"
import { inputTokens, toggleTokens } from "@/lib/component-tokens"

export default function InputsPage() {
  return (
    <div>
      <PageHeader
        title="Inputs"
        description="Text inputs, search, select, checkbox, radio, toggle — each with Lucide icons, three sizes (S/M/L), and full state coverage."
        badge="Components"
      />

      <div className="flex flex-col gap-8">
        <FormShowcase />
      </div>

      <TokenPanel title="Input Field Design Tokens" tokens={inputTokens.tokens} defaultOpen={false} />
      <TokenPanel title="Checkbox, Radio & Switch Tokens" tokens={toggleTokens.tokens} defaultOpen={false} />
    </div>
  )
}
