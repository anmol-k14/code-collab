import * as ai from '../services/ai.service.js';


export const getResult = async (req, res) => {
    try {
        const { prompt } = req.query;
        const result = await ai.generateResult(prompt);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

  
export const chatAI = async (req, res) => {
  try {
      const { message, code } = req.body;
      const prompt = JSON.stringify({
          message: message,
          code: code
      });
      console.log("Prompt for chatAI:", prompt); // Log the prompt for debugging
      const result = await ai.chat(prompt);
      console.log("Result from chatAI:", result); // Log the result for debugging
      res.send(result);
  } catch (error) {
      res.status(500).send({ message: error.message });
  }
}
