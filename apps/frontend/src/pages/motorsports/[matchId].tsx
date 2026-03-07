import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MotorsportsStreamDto } from "../../types/motorsports";
import { getMotorsportsStreams } from "../../api/motorsportsApi";

export default function MotorsportsMatchStreamsPage() {
  const { matchId, streamNo } = useParams<{
    matchId: string;
    streamNo?: string;
  }>();
  const [streams, setStreams] = useState<MotorsportsStreamDto[]>([]);
  const navigate = useNavigate();
  const [currentStream, setCurrentStream] =
    useState<MotorsportsStreamDto | null>(null);
  useEffect(() => {
    if (!matchId) {
      return;
    }
    getMotorsportsStreams(matchId).then((allStreams) => {
      setStreams(allStreams);
      const selected: MotorsportsStreamDto | null = streamNo
        ? allStreams.find((s) => s.streamNo === Number(streamNo)) || null
        : allStreams[0] || null;

      setCurrentStream(selected);
      if (!streamNo && selected) {
        navigate(`/motorsports/${matchId}/stream/${selected.streamNo}`, {
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

  const selectStream = (s: MotorsportsStreamDto) => {
    setCurrentStream(s);
    navigate(`/motorsports/${matchId}/stream/${s.streamNo}`, { replace: true });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Live Stream</h1>
      <Link to={`/motorsports`}>← Back to Streams</Link>

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
