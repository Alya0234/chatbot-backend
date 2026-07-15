import { getChatResponse } from "../services/gemini.service.js";

export async function handleChat(req, res) {
  const { message, history } = req.body;

  // Validate input
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      error: "Message is required.",
    });
  }

  try {
    const reply = await getChatResponse(history || [], message);

    return res.status(200).json({
      reply,
    });
  } catch (err) {
    // Print the complete error in Render logs
    console.error("========== GEMINI ERROR ==========");
    console.error(err);
    console.error("==================================");

    return res.status(500).json({
      error: err.message || "Internal Server Error",
      details: err.stack || "",
    });
  }
}