import { useEffect, useState } from "react";
import { MotorsportsMatchDto } from "../../types/motorsports";
import { getMotorsportsMatches } from "../../api/motorsportsApi";
import { Link } from "react-router-dom";

export default function MotorsportsMatchesPage() {
  const [matches, setMatches] = useState<MotorsportsMatchDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        const allMatches = await getMotorsportsMatches();
        setMatches(allMatches);
      } catch (err) {
        console.error("Failed to fetch F1 races:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  if (loading) {
    return <p>Loading F1 races...</p>;
  }

  if (matches.length === 0) {
    return <p>No F1 races available.</p>;
  }
  return (
    <div>
      <Link to={`/`}>← Back to Homepage</Link>
      <div style={{ padding: "1rem" }}>
        <h1>Formula 1 Races</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {matches.map((match) => (
            <li key={match.id} style={{ margin: "0.5rem 0" }}>
              <Link
                to={`/motorsports/${match.id}/streams`}
                style={{
                  display: "block",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: "4px",
                }}
              >
                <div>{match.title}</div>
                <div style={{ fontSize: "0.85rem", color: "#eee" }}>
                  {new Date(match.date).toLocaleString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
