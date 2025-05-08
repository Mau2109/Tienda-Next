import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

// Gestión de sesiones para usuarios no autenticados
export async function getSessionId(): Promise<string> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")

  if (sessionId) {
    return sessionId.value
  }

  // Crear un nuevo ID de sesión si no existe
  const newSessionId = uuidv4()
  cookieStore.set("session_id", newSessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  })

  return newSessionId
}
