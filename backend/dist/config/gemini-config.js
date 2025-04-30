import { GoogleGenerativeAI } from "@google/generative-ai";
export const geminiConfig = () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
    // Here, you set the default model (you can change the model if needed)
    const genModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    return genModel;
};
//# sourceMappingURL=gemini-config.js.map