// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const sessionId = request.cookies.get("session_id")

  if (!sessionId) {
    response.cookies.set("session_id", uuidv4(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
  }

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Aplica a todo excepto rutas públicas
}
