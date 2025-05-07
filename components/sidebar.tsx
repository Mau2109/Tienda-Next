import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-950 text-white h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
          Shooping
        </h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-200 hover:text-white"
            >
              <span className="text-purple-400">🏠</span>
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link
              href="/productos"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-200 hover:text-white"
            >
              <span className="text-blue-400">🛍️</span>
              <span>Productos</span>
            </Link>
          </li>
          <li>
            <Link
              href="/carrito"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-200 hover:text-white"
            >
              <span className="text-purple-400">🛒</span>
              <span>Carrito</span>
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-200 hover:text-white"
            >
              <span className="text-blue-400">ℹ️</span>
              <span>Acerca de</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-400">© 2025 Mau Osorio</p>
      </div>
    </aside>
  )
}
