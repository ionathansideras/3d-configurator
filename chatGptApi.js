import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function createPorsche918ChatApi(question) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: `You are an expert on the Porsche 918 Spyder. 
                    Provide detailed and accurate information about the Porsche 918 Spyder in response to user queries.
                    Your responses should be informative and cover topics such as specifications, performance, history, and unique features of the Porsche 918 Spyder.`,
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
