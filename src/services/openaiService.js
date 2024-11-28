import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateAttributes = async (description) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `Extract the following attributes from the description: type, color, brand, and other details. Return the response in valid JSON format with keys 'type', 'color', 'brand', and 'other_details'.\nDescription: ${description}`,
                },
            ],
            max_tokens: 150,
        });

        // Extraire le texte brut de la réponse
        const rawText = response.choices[0].message.content.trim();

        // Valider si le texte est un JSON valide
        try {
            return JSON.parse(rawText);
        } catch (parseError) {
            console.error("Response is not valid JSON:", rawText);
            throw new Error("Invalid JSON format returned by OpenAI.");
        }
    } catch (error) {
        console.error('Error with OpenAI API:', error.message);
        throw new Error('Failed to generate attributes from description.');
    }
};

