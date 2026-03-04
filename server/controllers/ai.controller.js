const { generateAIResponse } = require("../services/ai.service.js");

const generateAI = async (req, res) => {
  try {
    const { prompt, mode } = req.body;

    if (!prompt || !mode) {
      return res.status(400).json({ error: "Prompt and mode are required" });
    }

    let structuredPrompt = "";

    if (mode == "explain") {
      structuredPrompt = `
You are an experienced university instructor.

Explain the following concept to beginner student.

Rules:
-Use simple language
-Keep explanation under 150 words

Concept:${prompt}
            `;
    }

    if (mode === "summarize") {
      structuredPrompt = `
Summarize the following text in 5 bullet points.

Text: ${prompt}
`;
    }

    if (mode === "improve") {
      structuredPrompt = `
Improve grammar, clarity, and structure of the following text.

Text: ${prompt}
`;
    }

    if (mode === "mcq") {
      structuredPrompt = `
Generate 3 multiple choice questions about the following topic.

Topic: ${prompt}

Return JSON format:

{
 "questions":[
   {
    "question":"",
    "options":["A","B","C","D"],
    "answer":""
   }
 ]
}
`;
    }

    const aiResponse = await generateAIResponse(structuredPrompt);

    res.json({ result: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "AI generation failed",
    });
  }
};

module.exports = { generateAI };
