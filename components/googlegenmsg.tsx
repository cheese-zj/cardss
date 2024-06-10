const API_KEY = "AIzaSyAJ7d3zwzctLLKyGmQdER2qvMgweoBllSA";
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export const generateFunMessage = async (description: string, instruction: string, name: string, seed: string): Promise<string> => {
    
    const prompt = `You are a creative assistant that generates fun and playful messages based on card. 
        Now generate a fun and playful message for the following card information: name:${name} description: "${description}" and instruction: "${instruction}" 
        to only tell about user's luckiness, add some randomness, do not include emoji, you may make a short story 
        about user and relate it to the card and user's luckiness. 
        Note that you may choose randomly from making user a bad luck or either a good one. Bad jokes allowed. Use a RNG if you find it hard generating a joke: ${Math.random()}, also there's a customised seed: ${seed}`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
        return text;
    } catch (error) {
        console.error("Error generating message:", error);
        return "An error occurred while generating the message.";
    }
};
