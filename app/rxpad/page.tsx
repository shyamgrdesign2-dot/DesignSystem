import { Mulish } from "next/font/google"
import { RxpadPage } from "@/components/rxpad/RxpadPage"

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata = {
  title: "Rxpad — TatvaPractice",
  description: "TatvaPractice prescription pad with patient records, vitals, and medical history.",
}

export default function RxpadRoute() {
  return (
    <div className={mulish.variable}>
      <RxpadPage />
    </div>
  )
}
