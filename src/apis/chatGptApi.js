import OpenAI from "openai";

const key = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true,
});

export async function createPorsche918ChatApi(question) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `Given your expertise in the Porsche 918 Spyder, your responses should be strictly limited to information about the Porsche 918. Please ensure your answers are concise and directly related to the Porsche 918, avoiding any deviations or unrelated content.`,
            },
            {
                role: "user",
                content: question,
            },
        ],
        model: "gpt-3.5-turbo",
    });

    console.log(chatCompletion.choices[0].message.content);
    // Assuming the response format you require is text, not a JSON object like in the Korean language teacher example.
    // If you need a specific response format, adjust the response processing accordingly.
    return chatCompletion.choices[0].message.content;
}
