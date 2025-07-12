import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-brand-light text-stone-800">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-brand-dark">
                🏠 RK Vysočina
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link href="/nemovitosti" className="text-gray-600 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">
                  🏘️ Nemovitosti
                </Link>
                <Link href="/makleri" className="text-gray-600 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">
                  👥 Naši makléři
                </Link>
                <Link href="/kontakt" className="text-gray-600 hover:text-brand-dark px-3 py-2 rounded-md text-sm font-medium">
                  ⚙️ Služby
                </Link>
                <Link href="/kontakt" className="bg-brand-dark text-white hover:bg-stone-800 px-4 py-2 rounded-md text-sm font-medium">
                  📞 Kontakt
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <button className="bg-brand-dark inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-stone-800 focus:outline-none">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center text-center text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-dark via-green-800 to-stone-800 z-5">
          {/* Decorative elements */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
        </div>
        <div className="relative z-20 px-4">
          <div className="mb-6">
            <span className="text-6xl mb-4 block">🏡</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-shadow-lg">
            Váš nový domov na Vysočině
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 mb-8">
            Objevte exkluzivní nemovitosti v srdci České republiky s experty, kteří regionu skutečně rozumí.
          </p>
          <Link
            href="/nemovitosti"
            className="bg-brand-dark hover:bg-stone-800 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 inline-flex items-center gap-2"
          >
            🏘️ Zobrazit nabídku
          </Link>
        </div>
      </header>

      {/* Featured Properties Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <span className="text-4xl">🏠</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Doporučené nemovitosti
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Aktuální výběr toho nejlepšího z našeho portfolia.
            </p>
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            <Link href="/nemovitosti/1" className="group block bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="overflow-hidden">
                <div className="w-full h-56 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <span className="text-6xl mb-2 block">🏡</span>
                    <p className="text-sm text-gray-600 font-medium">Moderní dům</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500">🏠 Rodinný dům</p>
                <h3 className="mt-2 text-xl font-semibold">Vila s výhledem, Jihlava</h3>
                <p className="mt-3 text-2xl font-bold text-brand-dark">15 900 000 Kč</p>
                <div className="mt-4 border-t pt-4 text-sm text-gray-600 flex justify-between">
                  <span>🛏️ 5 pokojů</span>
                  <span>📐 240 m²</span>
                  <span>🌳 Zahrada 1200 m²</span>
                </div>
              </div>
            </Link>
            <Link href="/nemovitosti/2" className="group block bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="overflow-hidden">
                <div className="w-full h-56 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <span className="text-6xl mb-2 block">🌲</span>
                    <p className="text-sm text-gray-600 font-medium">Srub u lesa</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500">🌲 Chata / Srub</p>
                <h3 className="mt-2 text-xl font-semibold">Srub na samotě, Žďárské vrchy</h3>
                <p className="mt-3 text-2xl font-bold text-brand-dark">8 250 000 Kč</p>
                <div className="mt-4 border-t pt-4 text-sm text-gray-600 flex justify-between">
                  <span>🛏️ 3 pokoje</span>
                  <span>📐 110 m²</span>
                  <span>🌲 U lesa</span>
                </div>
              </div>
            </Link>
            <Link href="/nemovitosti/3" className="group block bg-white rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
              <div className="overflow-hidden">
                <div className="w-full h-56 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center">
                    <span className="text-6xl mb-2 block">🏢</span>
                    <p className="text-sm text-gray-600 font-medium">Byt v centru</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500">🏢 Byt 4+kk</p>
                <h3 className="mt-2 text-xl font-semibold">Mezonetový byt, Třebíč</h3>
                <p className="mt-3 text-2xl font-bold text-brand-dark">7 800 000 Kč</p>
                <div className="mt-4 border-t pt-4 text-sm text-gray-600 flex justify-between">
                  <span>🛏️ 4 pokoje</span>
                  <span>📐 135 m²</span>
                  <span>🌿 Terasa</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto py-16 sm:py-24 px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-4">
              <span className="text-4xl">👨‍💼</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Váš prémiový lokální expert
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Nejsme jen další realitní kancelář. Jsme tým patriotů s hlubokou znalostí každého koutu Vysočiny. Rozumíme místnímu trhu, lidem i krajině. Právě proto vám dokážeme najít nejen dům, ale domov.
            </p>
            <div className="mt-8">
              <Link href="/makleri" className="text-lg font-medium text-brand-dark hover:text-stone-800 inline-flex items-center gap-2">
                👥 Více o nás &rarr;
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-brand-light p-6 rounded-lg">
              <span className="text-3xl mb-2 block">📅</span>
              <p className="text-4xl font-bold text-brand-dark">15+</p>
              <p className="text-sm text-gray-600 mt-1">Let zkušeností v regionu</p>
            </div>
            <div className="bg-brand-light p-6 rounded-lg">
              <span className="text-3xl mb-2 block">😊</span>
              <p className="text-4xl font-bold text-brand-dark">500+</p>
              <p className="text-sm text-gray-600 mt-1">Spokojených klientů</p>
            </div>
            <div className="bg-brand-light p-6 rounded-lg col-span-2">
              <span className="text-3xl mb-2 block">🎯</span>
              <p className="text-2xl font-bold text-brand-dark">Specialisté na Vysočinu</p>
              <p className="text-sm text-gray-600 mt-1">Od Jihlavy po Žďárské vrchy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white">🏠 RK Vysočina</h3>
              <p className="mt-4 text-sm">Najdeme vám domov, ne jen adresu.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400">🧭 Navigace</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/nemovitosti" className="hover:text-white">🏘️ Nemovitosti</Link></li>
                <li><Link href="/makleri" className="hover:text-white">👥 O nás</Link></li>
                <li><Link href="/kontakt" className="hover:text-white">📞 Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400">⚙️ Služby</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/nemovitosti" className="hover:text-white">🏠 Prodej nemovitosti</Link></li>
                <li><Link href="/kontakt" className="hover:text-white">💰 Odhady cen</Link></li>
                <li><Link href="/kontakt" className="hover:text-white">🏦 Hypoteční poradenství</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-400">📞 Kontakt</h3>
              <ul className="mt-4 space-y-2">
                <li>📍 Náměstí 1, Jihlava</li>
                <li>📱 +420 123 456 789</li>
                <li>✉️ info@rkvysocina.cz</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-stone-700 pt-8 text-center text-sm">
            <p>&copy; 2025 RK Vysočina. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
