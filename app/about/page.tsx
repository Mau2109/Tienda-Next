export default function AboutPage() {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Acerca de Nosotros</h1>
          <p className="text-gray-400">Conoce más sobre nuestra tienda y nuestra misión</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="border border-gray-800 rounded-lg bg-gray-950/50">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-semibold text-lg">Nuestra Historia</h2>
                <p className="text-sm text-gray-400">Cómo comenzamos y hacia dónde vamos</p>
              </div>
              <div className="p-4 space-y-4 text-gray-300">
                <p>
                  Fundada en Mayo del 2025, Mi Tienda nació con la visión de ofrecer productos de alta calidad a precios
                  accesibles un tipo de relacion calidad-precio na mentira es para un proyecto escolar xD. Lo que comenzó como un pequeño emprendimiento se ha convertido en una tienda de referencia
                  en el mercado mas pro que el Amazon o el Mercado Libre.
                </p>
                <p>
                  Nuestro compromiso con la calidad y la satisfacción del cliente nos ha permitido crecer y expandir
                  nuestra oferta de productos, manteniendo siempre los valores que nos definen.
                </p>
              </div>
            </div>
  
            <div className="border border-gray-800 rounded-lg bg-gray-950/50">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-semibold text-lg">Nuestra Misión</h2>
                <p className="text-sm text-gray-400">Lo que nos impulsa cada día</p>
              </div>
              <div className="p-4 space-y-4 text-gray-300">
                <p>
                  Nuestra misión es proporcionar a nuestros clientes una experiencia de compra excepcional, ofreciendo
                  productos innovadores y de calidad que mejoren su vida cotidiana.
                </p>
              </div>
            </div>
          </div>
  
          <div className="space-y-6">
            <div className="border border-gray-800 rounded-lg bg-gray-950/50">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-semibold text-lg">Nuestros Valores</h2>
                <p className="text-sm text-gray-400">Principios que guían nuestras decisiones</p>
              </div>
              <div className="p-4">
                <ul className="space-y-4 text-gray-300">
                  <li>
                    <h3 className="font-medium text-white">Calidad</h3>
                    <p>Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad.</p>
                  </li>
                  <hr className="my-2 border-gray-800" />
                  <li>
                    <h3 className="font-medium text-white">Innovación</h3>
                    <p>Buscamos constantemente nuevas tendencias y productos para ofrecer lo mejor.</p>
                  </li>
                  <hr className="my-2 border-gray-800" />
                  <li>
                    <h3 className="font-medium text-white">Servicio al Cliente</h3>
                    <p>Nuestros clientes son nuestra prioridad, y trabajamos para superar sus expectativas.</p>
                  </li>
                  <hr className="my-2 border-gray-800" />
                  <li>
                    <h3 className="font-medium text-white">Sostenibilidad</h3>
                    <p>Comprometidos con prácticas comerciales responsables y sostenibles.</p>
                  </li>
                </ul>
              </div>
            </div>
  
            <div className="border border-gray-800 rounded-lg bg-gray-950/50">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-semibold text-lg">Contacto</h2>
              </div>
              <div className="p-4">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400">📍</span>
                    <span className="text-gray-300">Av. Dr. Modesto Seara, Acatlima, Huajuapan de Leon, Oax. Mex.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-blue-400">📞</span>
                    <span className="text-gray-300">+953 194 15 89</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-purple-400">📧</span>
                    <span className="text-gray-300">oorm030921@gs.utm.mx</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-purple-400">📧</span>
                    <span className="text-gray-300">mauriosorio444@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  