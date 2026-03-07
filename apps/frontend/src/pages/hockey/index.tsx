import { useEffect, useState } from "react";
import { HockeyMatchDto } from "../../types/hockey";
import { getHockeyMatches } from "../../api/hockeyApi";
import { Link } from "react-router-dom";

export default function HockeyMatchesPage() {
  const [matches, setMatches] = useState<HockeyMatchDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        const allMatches = await getHockeyMatches();
        setMatches(allMatches);
      } catch (err) {
        console.error("Failed to load NHL matches:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, []);

  if (loading) {
    return <p>Loading NHL matches...</p>;
  }

  if (matches.length === 0) {
    return <p>No NHL matches available.</p>;
  }
  return (
    <div>
      <Link to={`/`}>← Back to Homepage</Link>
      <h1>Hockey Matches</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {matches.map((match) => (
          <li key={match.id} style={{ margin: "0.5rem 0" }}>
            <Link
              to={`/hockey/${match.id}/streams`}
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
  );
}
