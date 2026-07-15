import { GoogleGenAI } from "@google/genai";

// Create client only once
let ai;

function getClient() {
  console.log("========== GEMINI DEBUG ==========");
  console.log("API Key exists:", !!process.env.GEMINI_API_KEY);

  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }

  if (!ai) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    console.log("Gemini client initialized.");
  }

  return ai;
}

/**
 * Sends the user's message to Gemini and returns the reply.
 */
export async function getChatResponse(history = [], userMessage) {
  try {
    const chat = getClient().chats.create({
      model: "gemini-2.5-flash",
      history,
    });

    const response = await chat.sendMessage({
      message: userMessage,
    });

    console.log("Gemini response received.");

    return response.text;
  } catch (err) {
    console.error("========== GEMINI SERVICE ERROR ==========");
    console.error(err);
    console.error("==========================================");

    throw err;
  }
}