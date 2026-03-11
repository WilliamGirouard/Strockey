import { Link, useLocation } from "react-router-dom";

function Header() {
  const { pathname } = useLocation();

  const navItems = [
    { href: "/hockey", emoji: "🏒", label: "NHL" },
    { href: "/motorsports", emoji: "🏎️", label: "Motorsports" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1c1c26] bg-[#09090d]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:bg-indigo-400 transition-colors">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 8h16v2H4zm0 6h16v2H4z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
          <span className="text-base font-black tracking-tight text-white">Strockey</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-1">
          {navItems.map(({ href, emoji, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                to={href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-[#1c1c26] text-white font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-[#1c1c26]"
                }`}
              >
                <span>{emoji}</span>
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Live pill */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest shrink-0">
          <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
          <span className="hidden sm:inline">Live Now</span>
        </div>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#09090d]/95 backdrop-blur-md border-t border-[#1c1c26] flex">
        {[{ href: "/", emoji: "🏠", label: "Home" }, ...navItems].map(({ href, emoji, label }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              to={href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
                active ? "text-indigo-400" : "text-slate-600 hover:text-slate-400"
              }`}
            >
              <span className="text-xl leading-none">{emoji}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#09090d] text-white">
      <Header />
      {/* pt-14 for fixed header, pb-16 on mobile for bottom tab bar */}
      <main className="pt-14 pb-4 sm:pb-0 mb-16 sm:mb-0">
        {children}
      </main>
    </div>
  );
}