import { useEffect, useState } from "react";
import { MotorsportsMatchDto } from "../../types/motorsports";
import { getMotorsportsMatches } from "../../api/motorsportsApi";
import MatchCard from "../../components/MatchCard";

export default function MotorsportsMatchesPage() {
  const [matches, setMatches] = useState<MotorsportsMatchDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMotorsportsMatches()
      .then(setMatches)
      .catch((err) => console.error("Failed to load motorsports matches:", err))
      .finally(() => setLoading(false));
  }, []);

  const popularMatches = matches.filter((m) => m.popular);
  const regularMatches = matches.filter((m) => !m.popular);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">🏎️</span>
        <div>
          <h1 className="text-xl font-black tracking-tight text-white">Motorsports</h1>
          <p className="text-sm text-slate-500">
            {loading ? "Loading…" : `${matches.length} races available`}
          </p>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0f0f13] border border-[#1c1c26] rounded-2xl h-48 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && matches.length === 0 && (
        <div className="text-center py-24">
          <p className="text-4xl mb-4">🏎️</p>
          <p className="text-slate-500 text-lg">No races available right now.</p>
          <p className="text-slate-700 text-sm mt-1">Check back later for upcoming events.</p>
        </div>
      )}

      {!loading && popularMatches.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-amber-400 text-sm">★</span>
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-500">Featured</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularMatches.map((match) => (
              <MatchCard key={match.id} match={match} href={`/motorsports/${match.id}/streams`} sport="motorsports" />
            ))}
          </div>
        </section>
      )}

      {!loading && regularMatches.length > 0 && (
        <section>
          {popularMatches.length > 0 && (
            <h2 className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-5">All Races</h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularMatches.map((match) => (
              <MatchCard key={match.id} match={match} href={`/motorsports/${match.id}/streams`} sport="motorsports" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}