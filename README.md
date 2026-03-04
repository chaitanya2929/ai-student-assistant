# AI-Powered Student Assistant (MERN + AI Integration)

## Project Overview

AI-Powered Student Assistant is a small MERN-based web application that allows users to input questions or text, select a task mode, and receive an AI-generated response using an LLM API.

The project demonstrates how an AI service can be integrated into a MERN stack application while controlling the AI output using structured prompts.

Users can perform multiple AI-powered tasks such as explaining concepts, summarizing text, improving writing quality, and generating multiple-choice questions.

---

# Features

### AI Task Modes

The application supports four AI task modes:

1. **Explain Concept**

   * Explains technical or academic topics in simple language.

2. **Generate MCQs**

   * Generates structured multiple-choice questions in JSON format.

3. **Summarize Text**

   * Produces concise summaries of long text inputs.

4. **Improve Writing Quality**

   * Enhances grammar, clarity, and structure of user text.

---

### UI Features

* ChatGPT-style conversational interface
* Dark mode toggle
* Copy AI response button
* Loading indicator during AI response generation
* Clean responsive UI using Tailwind CSS

---

# Tech Stack

### Frontend

* React.js (Functional Components)
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* REST API architecture

### AI Integration

* OpenRouter API (LLM API gateway)
* LLaMA / GPT-style models

---

# Project Architecture

```
ai-student-assistant
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.js
│   │
│   └── package.json
│
├── server
│   ├── routes
│   │   └── ai.routes.js
│   │
│   ├── controllers
│   │   └── ai.controller.js
│   │
│   ├── services
│   │   └── ai.service.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# API Endpoint

### Generate AI Response

**POST**

```
/api/ai/generate
```

### Request Body

```json
{
  "prompt": "Explain JavaScript closures",
  "mode": "explain"
}
```

### Response

```json
{
  "result": "AI generated response"
}
```

---

# Prompt Engineering Approach

The application uses structured prompts instead of sending raw user input to the AI model.

Each task mode constructs a different prompt template.

### Explain Concept Mode

```
You are an experienced university instructor.

Explain the following concept to a beginner student.

Rules:
- Use simple language
- Keep explanation under 150 words
- If unsure, respond that the information may not be reliable.

Concept: {{user_input}}
```

### MCQ Generation Mode

The AI is instructed to produce structured JSON output.

```
Generate 3 multiple choice questions about the following topic.

Topic: {{user_input}}

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
```

### Summarization Mode

```
Summarize the following text in 5 bullet points.

Text: {{user_input}}
```

### Improve Writing Mode

```
Improve grammar, clarity, and structure of the following text.

Text: {{user_input}}
```

---

# Guardrails Against Hallucination

Prompt instructions include constraints such as:

* Respond with uncertainty if reliable information is not available.
* Follow strict output formatting.
* Limit response length when required.

These guardrails help reduce hallucinated or irrelevant outputs.

---

# Environment Variables

Create a `.env` file inside the **server** directory.

```
AI_API_KEY=your_api_key_here
PORT=5000
```

Important: `.env` must not be committed to GitHub.

---

# Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/yourusername/ai-student-assistant.git
cd ai-student-assistant
```

---

### 2. Install Backend Dependencies

```
cd server
npm install
```

---

### 3. Start Backend Server

```
node server.js
```

Server will run at:

```
http://localhost:5000
```

---

### 4. Install Frontend Dependencies

Open another terminal:

```
cd client
npm install
```

---

### 5. Start React App

```
npm start
```

Application will open at:

```
http://localhost:3000
```

---

# Example Usage

1. Enter a topic such as:

```
JavaScript Closures
```

2. Select a task mode:

```
Explain Concept
```

3. Click **Generate**

4. The AI-generated explanation will appear in the chat interface.

---

# Bonus Features

* Chat-style UI similar to ChatGPT
* Dark mode support
* Copy-to-clipboard button for responses
* Structured MCQ rendering
* Clean modular backend architecture

---

# Future Improvements

Possible enhancements include:

* Authentication system
* Chat history storage in MongoDB
* Markdown rendering for AI responses
* Deployment using Vercel / Render
* Streaming AI responses

---

# Author

Developed as part of the **OneVarsity IT Internship Assignment**.

Author:
Naga Sai Chaitanya Addepalli

---

# License

This project is intended for educational and internship evaluation purposes.
