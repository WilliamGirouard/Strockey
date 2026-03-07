import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HockeyStreamDto } from "../../types/hockey";
import { getHockeyStreams } from "../../api/hockeyApi";

export default function HockeyMatchStreamsPage() {
  const { matchId, streamNo } = useParams<{
    matchId: string;
    streamNo?: string;
  }>();
  const [streams, setStreams] = useState<HockeyStreamDto[]>([]);
  const navigate = useNavigate();
  const [currentStream, setCurrentStream] = useState<HockeyStreamDto | null>(
    null,
  );
  useEffect(() => {
    if (!matchId) {
      return;
    }
    getHockeyStreams(matchId).then((allStreams) => {
      setStreams(allStreams);
      const selected: HockeyStreamDto | null = streamNo
        ? allStreams.find((s) => s.streamNo === Number(streamNo)) || null
        : allStreams[0] || null;

      setCurrentStream(selected);
      if (!streamNo && selected) {
        navigate(`/hockey/${matchId}/stream/${selected.streamNo}`, {
          replace: true,
        });
      }
    });
  }, [matchId, streamNo, navigate]);

  if (!matchId) {
    return <p>Loading match...</p>;
  }
  if (!currentStream) {
    return <p>Loading stream...</p>;
  }

  const selectStream = (s: HockeyStreamDto) => {
    setCurrentStream(s);
    navigate(`/hockey/${matchId}/stream/${s.streamNo}`, { replace: true });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Live Stream</h1>
      <Link to={`/hockey`}>← Back to Streams</Link>

      {/* Current Stream */}
      <div style={{ marginTop: "1rem" }}>
        <h2>
          {currentStream.language} {currentStream.hd ? "HD" : "SD"} (Stream{" "}
          {currentStream.streamNo})
        </h2>
        <iframe
          src={currentStream.embedUrl}
          width="800"
          height="450"
          allowFullScreen
          allow="autoplay; encrypted-media"
          title={`Stream ${currentStream.streamNo}`}
          style={{ border: "1px solid #ccc" }}
          onError={() => {
            alert("This stream cannot be embedded. Opening in a new tab.");
            window.open(currentStream.embedUrl, "_blank");
          }}
        />
      </div>

      {/* Other Streams */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Other Streams</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {streams
            .filter((s) => s.streamNo !== currentStream.streamNo)
            .map((s) => (
              <li key={s.streamNo} style={{ margin: "0.5rem 0" }}>
                <button
                  onClick={() => selectStream(s)}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {s.language} {s.hd ? "HD" : "SD"} (Stream {s.streamNo})
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
