"use client"

import { PageHeader } from "@/components/docs/page-header"
import { ComponentCard } from "@/components/design-system/design-system-section"
import { IconShowcase } from "@/components/design-system/foundation-showcase"

export default function IconsPage() {
  return (
    <div>
      <PageHeader
        title="Icons"
        description="Three icon families: iconsax (all UI icons, Linear/Bulk variants), TP Medical (clinical icons, line/bulk variants), and Lucide (accordions, arrows, plus/minus only)."
        badge="Foundations"
      />

      <ComponentCard>
        <IconShowcase />
      </ComponentCard>
    </div>
  )
}
