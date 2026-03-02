import { Mulish } from "next/font/google"
import { DrAgentPage } from "@/components/dr-agent/DrAgentPage"

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata = {
  title: "Dr Agent Appointments — TatvaPractice",
  description: "Figma-aligned Dr Agent appointments board with queue tabs and action table.",
}

export default function DrAgentRoute() {
  return (
    <div className={mulish.variable}>
      <DrAgentPage />
    </div>
  )
}
