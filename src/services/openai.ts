import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type Model =
  | "gpt-4-turbo-preview"
  | "gpt-4"
  | "gpt-4-32k"
  | "gpt-3.5-turbo"
  | "gpt-3.5-turbo-16k";
export const openAIModel: Model = "gpt-4-turbo-preview";

export const openAIRequest = async (
  messages: OpenAI.Chat.ChatCompletionMessageParam[]
) => {
  try {
    const stream = await openai.chat.completions.create({
      model: openAIModel,
      messages,
      stream: true,
    });

    return stream;
  } catch (error) {
    console.log(error);
  }
};
