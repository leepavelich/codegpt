import React from "react";
import { openAIRequest } from "../services/openai";
import { currentInput } from "../signals/chatSignal";
import OpenAI from "openai";

const ChatInput: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputVal = currentInput.value.trim();
    if (!inputVal.trim()) return;

    const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
      role: "user",
      content: inputVal,
    };

    try {
      const responseStream = await openAIRequest([userMessage]);

      if (responseStream) {
        for await (const chunk of responseStream) {
          console.log(chunk.choices[0]?.delta?.content || "");
        }
      }
    } catch (error) {
      console.error("Error handling OpenAI response:", error);
    }

    currentInput.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={currentInput.value}
        onChange={(e) => (currentInput.value = e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default ChatInput;
