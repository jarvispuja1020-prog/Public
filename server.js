import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/ask", async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-6-astra",
      input: req.body.message
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error("OpenAI request failed:", error.message);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("JARVIS server started");
});