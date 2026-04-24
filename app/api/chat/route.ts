import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const MODEL_NAME = "gemini-3.1-flash-lite-preview";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

type ChatRequestMessage = {
  role: "user" | "ai";
  text: string;
};

type ChatRequestBody = {
  messages?: ChatRequestMessage[];
};

export async function POST(request: Request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 });
  }

  try {
    const body = (await request.json()) as ChatRequestBody;
    const messages = body.messages ?? [];

    const normalizedMessages = messages
      .filter((message) => message.text?.trim())
      .map((message) => ({
        role: message.role === "ai" ? "model" : "user",
        parts: [{ text: message.text.trim() }],
      }));

    if (normalizedMessages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: normalizedMessages,
    });

    const reply = response.text?.trim();
    if (!reply) {
      return NextResponse.json({ error: "Empty model response" }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 });
  }
}
