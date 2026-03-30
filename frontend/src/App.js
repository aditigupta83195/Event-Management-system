import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Checkin from "./Checkin";

function App() {
  const pageStyle = {
    background: "linear-gradient(to right, #667eea, #764ba2)",
    minHeight: "100vh",
    padding: "20px",
    color: "#fff"
  };

  const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px"
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "8px 15px",
    borderRadius: "8px",
    background: "rgba(255,255,255,0.2)"
  };

  return (
    <Router>
      <div style={pageStyle}>
        <h1 style={{ textAlign: "center" }}>
          🎉 Smart Event Management System
        </h1>

        <nav style={navStyle}>
          <Link to="/register" style={linkStyle}>Register</Link>
          <Link to="/checkin" style={linkStyle}>Check-in</Link>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/checkin" element={<Checkin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;