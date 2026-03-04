import axios from "axios";

export const generateAI = async (prompt, mode) => {
  const response = await axios.post(
    "http://localhost:5000/api/ai/generate",
    { prompt, mode }
  );

  return response.data.result;
};