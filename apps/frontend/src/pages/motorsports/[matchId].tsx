import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MotorsportsStreamDto } from "../../types/motorsports";
import { getMotorsportsStreams } from "../../api/motorsportsApi";

export default function MotorsportsMatchStreamsPage() {
  const { matchId, streamNo } = useParams<{ matchId: string; streamNo?: string }>();
  const [streams, setStreams] = useState<MotorsportsStreamDto[]>([]);
  const [currentStream, setCurrentStream] = useState<MotorsportsStreamDto | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!matchId) return;
    setLoading(true);
    getMotorsportsStreams(matchId).then((allStreams) => {
      setStreams(allStreams);
      const selected = streamNo
        ? allStreams.find((s) => s.streamNo === Number(streamNo)) || null
        : allStreams[0] || null;
      setCurrentStream(selected);
      if (!streamNo && selected) {
        navigate(`/motorsports/${matchId}/stream/${selected.streamNo}`, { replace: true });
      }
      setLoading(false);
    });
  }, [matchId, streamNo, navigate]);

  const selectStream = (s: MotorsportsStreamDto) => {
    setCurrentStream(s);
    navigate(`/motorsports/${matchId}/stream/${s.streamNo}`, { replace: true });
  };

  const otherStreams = streams.filter((s) => s.streamNo !== currentStream?.streamNo);

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

        {/* Left: video + stream tabs */}
        <div className="flex flex-col flex-1 min-w-0 gap-4">
          <div className="relative w-full bg-black rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
            {loading || !currentStream ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0f0f13]">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-slate-500">Loading stream…</span>
                </div>
              </div>
            ) : (
              <iframe
                key={currentStream.embedUrl}
                src={currentStream.embedUrl}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title={`Stream ${currentStream.streamNo}`}
              />
            )}
          </div>

          {streams.length > 1 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-600">Available Streams</p>
              <div className="flex flex-wrap gap-2">
                {streams.map((s) => {
                  const isActive = s.streamNo === currentStream?.streamNo;
                  return (
                    <button
                      key={s.streamNo}
                      onClick={() => selectStream(s)}
                      className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-500/10 border-indigo-500/40 text-indigo-300"
                          : "bg-[#0f0f13] border-[#1c1c26] text-slate-400 hover:border-[#3a3a52] hover:text-white"
                      }`}
                    >
                      <span>{s.language}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
                        s.hd
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                      }`}>
                        {s.hd ? "HD" : "SD"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="lg:w-72 lg:shrink-0 flex flex-col gap-4">
          <div className="bg-[#0f0f13] border border-[#1c1c26] rounded-2xl p-4 sm:p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-4">Now Playing</p>
            {currentStream ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 mb-4">
                  {[
                    { label: "Language", value: currentStream.language },
                    { label: "Source", value: currentStream.source },
                    { label: "Stream", value: `#${currentStream.streamNo}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-0.5">
                      <span className="text-xs text-slate-500">{label}</span>
                      <span className="text-sm font-semibold text-white">{value}</span>
                    </div>
                  ))}
                  <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-0.5">
                    <span className="text-xs text-slate-500">Quality</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-md border w-fit ${
                      currentStream.hd
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                    }`}>
                      {currentStream.hd ? "HD" : "SD"}
                    </span>
                  </div>
                </div>
                <a
                  href={currentStream.embedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#1c1c26] hover:bg-[#252535] border border-[#2a2a3a] text-sm text-slate-400 hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Open in new tab
                </a>
              </>
            ) : (
              <div className="h-24 animate-pulse bg-[#1c1c26] rounded-xl" />
            )}
          </div>

          {otherStreams.length > 0 && (
            <div className="bg-[#0f0f13] border border-[#1c1c26] rounded-2xl p-4 sm:p-5">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-3">Other Streams</p>
              <div className="flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0">
                {otherStreams.map((s) => (
                  <button
                    key={s.streamNo}
                    onClick={() => selectStream(s)}
                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#13131a] border border-[#1c1c26] hover:border-[#3a3a52] hover:bg-[#1a1a24] transition-all duration-200 text-left group shrink-0 lg:shrink min-w-[160px] lg:min-w-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
                        {s.language}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md border ${
                        s.hd
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                      }`}>
                        {s.hd ? "HD" : "SD"}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-slate-700 group-hover:text-indigo-400 transition-all ml-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#0f0f13] border border-[#1c1c26] rounded-2xl p-4 sm:p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-600 mb-3">Tips</p>
            <ul className="flex flex-col gap-2 text-xs text-slate-500">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5 shrink-0">→</span>
                If a stream won't load, try switching to another source.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5 shrink-0">→</span>
                Use "Open in new tab" if the embed is blocked.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-0.5 shrink-0">→</span>
                HD streams may require a stable connection.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}