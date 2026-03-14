import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();


router.post("/summary", async(req, res) => {
  try{
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const {name, experience, education, skills} = req.body;
    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash-lite"});
    const prompt = `Write a professional resume Summary for candidate. Name: ${name}
    Skills: ${skills} Experience: ${JSON.stringify(experience)} Education: ${JSON.stringify(education)} Keep it concise and professional in 2 to 3 lines.`
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res.json({summary: text});
  } catch(err) {
    console.error("AI error:", err);
    res.status(500).json({err: "AI generation failed"});
  }
});

export default router;