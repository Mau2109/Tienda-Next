export default function ProductosPage() {
    // Datos de ejemplo para productos
    const productos = [
      { id: 1, nombre: "Auriculares Bluetooth", precio: 89.99, categoria: "Electrónica" },
      { id: 2, nombre: "Camiseta Premium", precio: 29.99, categoria: "Ropa" },
      { id: 3, nombre: "Zapatillas Deportivas", precio: 119.99, categoria: "Calzado" },
      { id: 4, nombre: "Smartwatch", precio: 199.99, categoria: "Electrónica" },
      { id: 5, nombre: "Mochila Resistente", precio: 59.99, categoria: "Accesorios" },
      { id: 6, nombre: "Botella Térmica", precio: 24.99, categoria: "Hogar" },
    ]
  
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Nuestros Productos</h1>
          <p className="text-gray-400">Explora nuestra selección de productos de alta calidad</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="border border-gray-800 rounded-lg overflow-hidden bg-gray-950/50 hover:bg-gray-900/50 transition-colors"
            >
              <div className="relative h-48 bg-gray-800 flex items-center justify-center text-gray-500">
                {producto.nombre}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">{producto.nombre}</h3>
                <p className="text-sm text-gray-400">{producto.categoria}</p>
                <p className="text-gray-300 my-2">
                  Descripción del producto con características principales y beneficios.
                </p>
                <p className="text-xl font-bold mt-2 text-purple-400">${producto.precio}</p>
                <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                  Añadir al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  