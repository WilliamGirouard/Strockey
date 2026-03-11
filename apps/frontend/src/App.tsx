import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HockeyMatchesPage from "./pages/hockey";
import HockeyMatchStreamsPage from "./pages/hockey/[matchId]";
import MotorsportsMatchesPage from "./pages/motorsports";
import MotorsportsMatchStreamsPage from "./pages/motorsports/[matchId]";
import HomePage from "./pages/Homepage/homepage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hockey" element={<HockeyMatchesPage />} />
          <Route path="/hockey/:matchId/streams" element={<HockeyMatchStreamsPage />} />
          <Route path="/hockey/:matchId/stream/:streamNo" element={<HockeyMatchStreamsPage />} />
          <Route path="/motorsports" element={<MotorsportsMatchesPage />} />
          <Route path="/motorsports/:matchId/streams" element={<MotorsportsMatchStreamsPage />} />
          <Route path="/motorsports/:matchId/stream/:streamNo" element={<MotorsportsMatchStreamsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;