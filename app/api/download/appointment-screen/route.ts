import { readFileSync } from "fs"
import { join } from "path"
import { NextResponse } from "next/server"

export function GET() {
  try {
    const filePath = join(process.cwd(), "components/dr-agent/DrAgentPage.tsx")
    const content = readFileSync(filePath, "utf-8")

    return new NextResponse(content, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="AppointmentScreen.tsx"',
      },
    })
  } catch {
    return new NextResponse("File not found", { status: 404 })
  }
}
