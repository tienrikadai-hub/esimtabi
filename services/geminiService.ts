
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTravelAdvice(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `Bạn là trợ lý ảo của eSim Tabi. Hãy tư vấn cho khách hàng về việc chọn eSIM du lịch. 
        Hãy giữ câu trả lời ngắn gọn, thân thiện và tập trung vào lợi ích của việc sử dụng eSIM. 
        Nếu khách hỏi về điểm đến, hãy giới thiệu các gói của eSim Tabi như Nhật Bản, Hàn Quốc, Thái Lan, Singapore, Trung Quốc, Châu Âu.`,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Xin lỗi, tôi đang gặp chút sự cố. Bạn có thể liên hệ hotline 0123.456.789 để được hỗ trợ trực tiếp nhé!";
  }
}
