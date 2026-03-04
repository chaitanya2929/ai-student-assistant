import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("explain");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/ai/generate", {
        prompt,
        mode,
      });

      setResponse(res.data.result);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>AI Student Assistant</h1>

      <textarea
        rows="6"
        cols="60"
        placeholder="Enter your question..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <br />
      <br />

      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="explain">Explain Concept</option>
        <option value="mcq">Generate MCQs</option>
        <option value="summarize">Summarize</option>
        <option value="improve">Improve Writing</option>
      </select>

      <br />
      <br />

      <button onClick={handleSubmit}>Generate</button>

      <br />
      <br />

      {loading && <p>Generating response...</p>}

      <h3>AI Response</h3>
      <p>{response}</p>
    </div>
  );
}

export default App;
