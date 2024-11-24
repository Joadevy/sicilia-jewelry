import Image from 'next/image'
import { ProductGrid } from '../components/product-grid'
import SiciliaLogo from './public/SiciliaLogo.png'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
    <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-1">
        <Image src={SiciliaLogo} width={50} height={50} alt="Sicilia Jewelry" />
        <h1 className="text-2xl font-semibold text-gray-900">sicilia.jewelry</h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-gray-600 hover:text-gray-900">Inicio</a></li>
          <li><Link href="/pedido" className="text-gray-600 hover:text-gray-900">Pedido</Link></li>
          <li><a href="#" className="text-gray-600 hover:text-gray-900">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>


      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Ultimos ingresos</h2>
          <ProductGrid />
        </section>
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <p className="text-center text-gray-500">&copy; {new Date().getFullYear()} Sicilia Accessorios.</p>
        </div>
      </footer>
    </div>
  )
}

