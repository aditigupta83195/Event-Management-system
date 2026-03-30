import axios from "axios";
import { useEffect, useState } from "react";

function Register() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState("");
  const [eventId, setEventId] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [qrLink, setQrLink] = useState("");

  const cardStyle = {
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    maxWidth: "420px",
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
    background: "linear-gradient(to right, #667eea, #764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/")
      .then(res => setUsers(res.data));

    axios.get("http://127.0.0.1:8000/events/")
      .then(res => setEvents(res.data));
  }, []);

  const register = async () => {
    if (!userId || !eventId) {
      alert("Please select user and event");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/register/", {
        user_id: userId,
        event_id: eventId
      });

      setQrImage(res.data.qr);
      setQrLink(res.data.link);

      alert(res.data.message);

    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div style={cardStyle}>
      <h2>🎟️ Register for Event</h2>

      {/* 👤 USER DROPDOWN */}
      <select style={inputStyle} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Select User</option>
        {users.map(u => (
          <option key={u.id} value={u.id}>
            👤 {u.name}
          </option>
        ))}
      </select>

      <br /><br />

      {/* 🎯 EVENT DROPDOWN */}
      <select style={inputStyle} onChange={(e) => setEventId(e.target.value)}>
        <option value="">Select Event</option>

        {events.map(e => (
          <option key={e.id} value={e.id}>
            {e.title} • {e.status} • {e.count}/{e.capacity}
          </option>
        ))}
      </select>

      <br /><br />

      <button style={buttonStyle} onClick={register}>
        Register
      </button>

      {/* 🎟️ TICKET UI */}
      {qrImage && (
        <div style={{
          marginTop: "25px",
          padding: "15px",
          borderRadius: "12px",
          background: "#f8f9ff",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
          <h3>🎟️ Your Ticket</h3>

          <img src={qrImage} alt="QR" width="180" />

          <p style={{ marginTop: "10px" }}>
            Scan or click below to check-in
          </p>

          <a
            href={qrLink}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px 15px",
              backgroundColor: "#28a745",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none"
            }}
          >
            Check-in Now
          </a>
        </div>
      )}
    </div>
  );
}

export default Register;