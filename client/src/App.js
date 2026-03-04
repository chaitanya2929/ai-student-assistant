import { useState } from "react";
import axios from "axios";
import { FaCopy, FaMoon, FaSun } from "react-icons/fa";

function App() {
  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("explain");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) return;

    const userMessage = { role: "user", text: prompt };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await axios.post("https://ai-student-assistant-vmts.onrender.com/api/ai/generate", {
        prompt,
        mode,
      });

      const aiMessage = {
        role: "ai",
        text: res.data.result,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
    }

    setPrompt("");
    setLoading(false);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  // Detect and parse MCQ JSON
  const renderAIMessage = (text) => {
    try {
      // extract JSON inside ```json ```
      const match = text.match(/```json([\s\S]*?)```/);

      if (match) {
        const parsed = JSON.parse(match[1]);

        return parsed.questions.map((q, i) => (
          <div key={i} className="mb-4">
            <p className="font-semibold">
              {i + 1}. {q.question}
            </p>

            {q.options.map((opt, index) => (
              <p key={index} className="ml-4">
                {opt}
              </p>
            ))}

            <p className="text-green-600 ml-4 font-semibold">
              Answer: {q.answer}
            </p>
          </div>
        ));
      }
    } catch (err) {
      console.log("JSON parsing failed");
    }

    return <p className="whitespace-pre-wrap">{text}</p>;
  };

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-gray-100"
      }
    >
      <div className="max-w-3xl mx-auto p-6">
        {/* Header */}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">AI Student Assistant</h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 border rounded-lg"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Chat Window */}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-[400px] overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-3 rounded-lg max-w-[80%]
                ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.role === "ai" ? renderAIMessage(msg.text) : msg.text}

                {msg.role === "ai" && (
                  <button
                    onClick={() => copyText(msg.text)}
                    className="ml-3 text-sm"
                  >
                    <FaCopy />
                  </button>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 animate-pulse">AI is thinking...</div>
          )}
        </div>

        {/* Input Area */}

        <textarea
          className="w-full border rounded-lg p-3 mb-3 text-black"
          rows="3"
          placeholder="Ask something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className="flex gap-3">
          <select
            className="border p-2 rounded text-black"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="explain">Explain Concept</option>
            <option value="mcq">Generate MCQs</option>
            <option value="summarize">Summarize</option>
            <option value="improve">Improve Writing</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
