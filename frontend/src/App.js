import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);

  const submitForm = async () => {
    await axios.post("http://backend:5000/api/messages", { name, message });
    fetchMessages();
  };

  const fetchMessages = async () => {
    const res = await axios.get("http://backend:5000/api/messages");
    setData(res.data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Interactive Message App</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={submitForm}>Send</button>
      <hr />
      <ul>
        {data.map((msg, i) => (
          <li key={i}>
            <strong>{msg.name}:</strong> {msg.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

