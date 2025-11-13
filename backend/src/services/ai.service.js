const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const persona = `You are Syncie, an AI assistant inside the StudySync app.
Your job is to help students understand, improve, and summarize their notes.
Speak like a friendly study buddy — encouraging, smart, and slightly playful.
Keep explanations clear and short. Use emojis only when it feels natural.
Never go off-topic — stay focused on education, productivity, and note content.`

async function genrateResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: persona,
    },
  });
  return response.text;
}

module.exports = genrateResponse;