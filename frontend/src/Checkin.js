import axios from "axios";
import { useState } from "react";

function Checkin() {
  const [regId, setRegId] = useState("");
  const [message, setMessage] = useState("");

  const cardStyle = {
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    maxWidth: "400px",
    margin: "40px auto",
    textAlign: "center",
    color: "#333"
  };

  const inputStyle = {
    padding: "10px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    padding: "12px",
    width: "100%",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  };

  const checkin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/checkin/", {
        reg_id: regId
      });

      setMessage(res.data.message);

    } catch (err) {
      setMessage(err.response?.data?.error || "Error");
    }
  };

  return (
    <div style={cardStyle}>
      <h2>✅ Event Check-in</h2>

      <input
        style={inputStyle}
        placeholder="Enter REG ID (e.g. REG-1)"
        value={regId}
        onChange={(e) => setRegId(e.target.value)}
      />

      <br /><br />

      <button style={buttonStyle} onClick={checkin}>
        Check In
      </button>

      {message && (
        <p style={{
          marginTop: "15px",
          fontWeight: "bold",
          color: message.includes("successful") ? "green" : "red"
        }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Checkin;