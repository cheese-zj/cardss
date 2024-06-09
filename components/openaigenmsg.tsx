import axios from 'axios';

const API_KEY = "removed";

export const generateFunMessage = async (description: string, instruction: string): Promise<string> => {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3-turbo', // Ensure you have access to this model and it's correctly spelled
            messages: [
                {
                    role: 'system',
                    content: 'You are a playful assistant that generates fun and playful messages based on card descriptions and instructions. Use the card information to make a fun guess about the user\'s luckiness today.'
                },
                {
                    role: 'user',
                    content: `
        Now generate a fun and playful message for the following card description: "${description}" amd "${instruction}" 
        to only tell about user's luckiness, add some randomness, do not include emoji, you may make a short story 
        about user and relate it to the card and user's luckiness. 
        Note that you may choose randomly from making user a bad luck or either a good one. Bad jokes allowed. Use a RNG if you find it hard generating a joke: ${Math.random()}`
                }
            ],
            max_tokens: 50,
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('API Response:', response.data);

        const message = response.data.choices[0]?.message?.content || 'No fun message generated.';
        return message;

    } catch (error) {
        // Log full error details for troubleshooting
        console.error('Error generating message:', error);

        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data);
        }

        return 'Oops! Something went wrong. Try again later.';
    }
};

