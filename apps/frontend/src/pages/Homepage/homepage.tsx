import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "2rem",
      }}
    >
      <h1>Welcome to Strockey</h1>
      <div style={{ display: "flex", gap: "2rem" }}>
        <Link
          to="/hockey"
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "1.2rem",
          }}
        >
          Hockey
        </Link>
        <Link
          to="/motorsports"
          style={{
            padding: "1rem 2rem",
            backgroundColor: "#28a745",
            color: "#fff",
            borderRadius: "6px",
            textDecoration: "none",
            fontSize: "1.2rem",
          }}
        >
          Motorsports
        </Link>
      </div>
    </div>
  );
}
