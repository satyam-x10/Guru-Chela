// Access your API key as an environment variable (see "Set up your API key" above)
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(
    'AIzaSyDpjZeYXK_uh74AH4e2fwBOD0Q0X5WpvP4'
);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const askGemini = async (doubt, type) => {
    try {
        let prompt;
        if (type === 'ai') {
            prompt = `${doubt}`;
        }
        else if (type==='roadmap') {
            prompt = `Give me a roadmap . i want to learn the topic ${doubt?.title}. Brief description of the topic is ${doubt?.description}. also make sure that it is well formatted .`;

        } 
        else {
            prompt = `I have a doubt. The topic is ${doubt?.title}. The description of the doubt is ${doubt?.description}`;
        }

        // Assume `model` is already initialized with Google Generative AI

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        text = text.replace(/\*\*|\*|\d+\./g, ''); // Remove markdown and numbered list markers

        // Convert Markdown to HTML

        return text
    } catch (error) {
        return ('Some Error happened')
    }
};