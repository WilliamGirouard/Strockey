import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHockeyMatches } from "../../api/hockeyApi";
import { getMotorsportsMatches } from "../../api/motorsportsApi";
import { HockeyMatchDto } from "../../types/hockey";
import { MotorsportsMatchDto } from "../../types/motorsports";
import MatchCard, { MatchDto } from "../../components/MatchCard";

function SportCard({
  emoji, label, sublabel, href, count, accentText, accentGlow,
}: {
  emoji: string; label: string; sublabel: string; href: string;
  count: number | null; accentText: string; accentGlow: string;
}) {
  return (
    <Link
      to={href}
      className="group relative overflow-hidden rounded-2xl border border-[#1c1c26] bg-[#0f0f13] p-6 sm:p-8 flex flex-col gap-4 hover:border-[#3a3a52] transition-all duration-300"
    >
      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${accentGlow}`} />
      <div className="flex items-start justify-between">
        <span className="text-4xl sm:text-5xl">{emoji}</span>
        {count !== null && (
          <span className="text-xs font-bold text-slate-600 bg-[#1c1c26] px-2.5 py-1 rounded-full">
            {count} matches
          </span>
        )}
      </div>
      <div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">{label}</h2>
        <p className="text-sm text-slate-500 mt-1">{sublabel}</p>
      </div>
      <div className={`flex items-center gap-1.5 text-sm font-semibold ${accentText} opacity-60 group-hover:opacity-100 transition-opacity`}>
        <span>Watch now</span>
        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}

function SectionHeader({ emoji, title, href, linkLabel }: { emoji: string; title: string; href: string; linkLabel: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <span>{emoji}</span>
        <h2 className="text-xs font-black tracking-widest uppercase text-slate-500">{title}</h2>
      </div>
      <Link to={href} className="text-xs text-slate-600 hover:text-indigo-400 transition-colors flex items-center gap-1">
        {linkLabel}
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

function SkeletonGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#0f0f13] border border-[#1c1c26] rounded-2xl h-44 animate-pulse" />
      ))}
    </div>
  );
}

export default function HomePage() {
  const [hockeyMatches, setHockeyMatches] = useState<HockeyMatchDto[]>([]);
  const [motorsportsMatches, setMotorsportsMatches] = useState<MotorsportsMatchDto[]>([]);
  const [loadingHockey, setLoadingHockey] = useState(true);
  const [loadingMotorsports, setLoadingMotorsports] = useState(true);

  useEffect(() => {
    getHockeyMatches().then(setHockeyMatches).catch(console.error).finally(() => setLoadingHockey(false));
    getMotorsportsMatches().then(setMotorsportsMatches).catch(console.error).finally(() => setLoadingMotorsports(false));
  }, []);

  const hockeyToShow: MatchDto[] = (hockeyMatches.filter((m) => m.popular).slice(0, 3).length
    ? hockeyMatches.filter((m) => m.popular).slice(0, 3)
    : hockeyMatches.slice(0, 3));

  const motorsportsToShow: MatchDto[] = (motorsportsMatches.filter((m) => m.popular).slice(0, 3).length
    ? motorsportsMatches.filter((m) => m.popular).slice(0, 3)
    : motorsportsMatches.slice(0, 3));

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            Free live sports streaming
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white leading-none mb-4">
            Watch sports,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              live & free.
            </span>
          </h1>

          <p className="text-slate-500 text-base sm:text-lg max-w-md mx-auto mb-8 sm:mb-10">
            Stream NHL hockey and motorsports races from multiple sources — no sign-up needed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/hockey"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-bold rounded-xl transition-colors"
            >
              🏒 Watch NHL
            </Link>
            <Link
              to="/motorsports"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-[#1c1c26] hover:bg-[#252535] border border-[#2a2a3a] text-slate-300 hover:text-white text-sm font-bold rounded-xl transition-colors"
            >
              🏎️ Watch Motorsports
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 flex flex-col gap-14">

        {/* Sport cards */}
        <section>
          <p className="text-xs font-black tracking-widest uppercase text-slate-600 mb-4">Browse by sport</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SportCard
              emoji="🏒" label="NHL Hockey" sublabel="Live games from across the league"
              href="/hockey" count={loadingHockey ? null : hockeyMatches.length}
              accentText="text-indigo-400" accentGlow="bg-indigo-500"
            />
            <SportCard
              emoji="🏎️" label="Motorsports" sublabel="F1, MotoGP and more races"
              href="/motorsports" count={loadingMotorsports ? null : motorsportsMatches.length}
              accentText="text-rose-400" accentGlow="bg-rose-500"
            />
          </div>
        </section>

        {/* Featured hockey */}
        <section>
          <SectionHeader emoji="🏒" title="Featured NHL" href="/hockey" linkLabel="All matches" />
          {loadingHockey ? <SkeletonGrid /> : hockeyToShow.length === 0 ? (
            <p className="text-slate-600 text-sm">No matches available right now.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hockeyToShow.map((match) => (
                <MatchCard key={match.id} match={match} href={`/hockey/${match.id}/streams`} sport="hockey" />
              ))}
            </div>
          )}
        </section>

        {/* Featured motorsports */}
        <section>
          <SectionHeader emoji="🏎️" title="Featured Races" href="/motorsports" linkLabel="All races" />
          {loadingMotorsports ? <SkeletonGrid /> : motorsportsToShow.length === 0 ? (
            <p className="text-slate-600 text-sm">No races available right now.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {motorsportsToShow.map((match) => (
                <MatchCard key={match.id} match={match} href={`/motorsports/${match.id}/streams`} sport="motorsports" />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer — hidden on mobile since bottom nav takes its place */}
      <footer className="hidden sm:block border-t border-[#1c1c26] py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-indigo-500 rounded-md flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 8h16v2H4zm0 6h16v2H4z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-sm font-black text-slate-600">Strockey</span>
          </div>
          <p className="text-xs text-slate-700">Free live sports streaming</p>
        </div>
      </footer>
    </div>
  );
}