
import { GoogleGenAI } from "@google/genai";

export async function getTravelAdvice(prompt: string) {
  try {
    // Initializing the Gemini API client using the API key from environment variables exclusively.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    // Using gemini-3-flash-preview for the basic text advice task.
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "Bạn là chuyên gia tư vấn eSIM du lịch của eSim Tabi. Hãy trả lời ngắn gọn, chuyên nghiệp.",
      },
    });

    // Accessing .text property directly as per SDK guidelines.
    return response.text || "Tôi chưa tìm được câu trả lời phù hợp.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Kết nối AI đang bận, bạn vui lòng thử lại sau nhé!";
  }
}
