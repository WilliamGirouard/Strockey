import { Link } from "react-router-dom";

export interface MatchDto {
  id: string;
  title: string;
  date: number;
  popular: boolean;
  poster?: string;
  homeTeam?: { name: string; badge: string };
  awayTeam?: { name: string; badge: string };
  primarySource?: { source: string; id: string };
}

interface MatchCardProps {
  match: MatchDto;
  href: string;
  sport?: "hockey" | "motorsports";
}

function TeamBadge({ name, badge }: { name: string; badge: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return badge ? (
    <div className="w-10 h-10 flex items-center justify-center">
      <img
        src={badge}
        alt={name}
        className="w-10 h-10 object-contain"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const fallback = el.nextSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      <div
        className="w-10 h-10 rounded-xl bg-[#1c1c26] border border-[#2a2a3a] items-center justify-center text-xs font-black text-slate-400 tracking-wide hidden"
      >
        {initials}
      </div>
    </div>
  ) : (
    <div className="w-10 h-10 rounded-xl bg-[#1c1c26] border border-[#2a2a3a] flex items-center justify-center text-xs font-black text-slate-400 tracking-wide">
      {initials}
    </div>
  );
}

function formatMatchDate(timestamp: number): { date: string; time: string } {
  const d = new Date(timestamp);
  return {
    date: d.toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" }),
    time: d.toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function MatchCard({ match, href, sport = "hockey" }: MatchCardProps) {
  const { date, time } = formatMatchDate(match.date);
  const hasTeams = match.homeTeam && match.awayTeam;

  const bannerGradient = sport === "motorsports"
    ? "from-rose-900/30 via-[#0f0f13] to-[#0f0f13]"
    : "from-indigo-900/30 via-[#0f0f13] to-[#0f0f13]";

  const emoji = sport === "motorsports" ? "🏎️" : "🏒";

  return (
    <Link
      to={href}
      className="group block bg-[#0f0f13] border border-[#1c1c26] rounded-2xl overflow-hidden hover:border-[#3a3a52] hover:bg-[#13131a] transition-all duration-300"
    >
      {/* Decorative banner */}
      <div className={`relative h-16 bg-gradient-to-br ${bannerGradient} flex items-center px-5 overflow-hidden`}>
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <span className="text-3xl opacity-20 group-hover:opacity-30 transition-opacity select-none absolute right-4">
          {emoji}
        </span>
        {match.popular && (
          <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-full z-10">
            ★ Popular
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Teams vs layout */}
        {hasTeams ? (
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex flex-col items-center gap-2 flex-1">
              <TeamBadge name={match.homeTeam!.name} badge={match.homeTeam!.badge} />
              <span className="text-sm font-semibold text-white text-center leading-tight">
                {match.homeTeam!.name}
              </span>
            </div>

            <div className="shrink-0">
              <span className="text-xs font-black tracking-widest text-[#3a3a52] uppercase">vs</span>
            </div>

            <div className="flex flex-col items-center gap-2 flex-1">
              <TeamBadge name={match.awayTeam!.name} badge={match.awayTeam!.badge} />
              <span className="text-sm font-semibold text-white text-center leading-tight">
                {match.awayTeam!.name}
              </span>
            </div>
          </div>
        ) : (
          <h3 className="text-base font-semibold text-white mb-3 leading-snug group-hover:text-slate-200 transition-colors">
            {match.title}
          </h3>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1c1c26]">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
            <span className="text-slate-700">·</span>
            <span>{time}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors">
            <span>Watch</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}