import React from "react";
import { openAIRequest } from "../services/openai";
import { currentInput, conversation, isSending } from "../signals/chat";
import OpenAI from "openai";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import "./ChatInput.css";

const ChatInput: React.FC = () => {
  const addMessageToConversation = (
    message: OpenAI.Chat.ChatCompletionMessageParam
  ) => {
    conversation.value = [...conversation.value, message];
  };

  const addChunkToLastMessage = (chunkContent: string) => {
    const newConversation = [...conversation.value];
    if (
      newConversation.length > 0 &&
      newConversation[newConversation.length - 1].role === "assistant"
    ) {
      newConversation[newConversation.length - 1].content += chunkContent;
    } else {
      newConversation.push({ role: "assistant", content: chunkContent });
    }
    conversation.value = newConversation;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("conversation", conversation.value);
    e.preventDefault();
    isSending.value = true;
    const inputVal = currentInput.value;
    if (!inputVal) return;

    const userMessage: OpenAI.Chat.ChatCompletionMessageParam = {
      role: "user",
      content: inputVal,
    };

    addMessageToConversation(userMessage);
    addMessageToConversation({ role: "assistant", content: "" });

    currentInput.value = "";

    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 500);

    try {
      const responseStream = await openAIRequest([
        ...conversation.value,
        { role: "user", content: inputVal },
      ]);
      if (responseStream) {
        for await (const chunk of responseStream) {
          const contentChunk = chunk.choices[0]?.delta?.content || "";

          if (conversation.value.length > 0) {
            addChunkToLastMessage(contentChunk);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      isSending.value = false;
    }
  };

  const handleNewConversation = () => {
    conversation.value = [
      { role: "system", content: "New conversation started." },
    ];
    currentInput.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the user pressed Enter without the Shift key
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent the default behavior of adding a new line
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>); // Submit the form
    }
  };

  return (
    <>
      <div className="input-group">
        <textarea
          className="chat-textarea"
          rows={3}
          value={currentInput.value}
          onChange={(e) => (currentInput.value = e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isSending.value}
        />
        <button
          type="submit"
          className="send-button"
          disabled={isSending.value}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>

      <button
        onClick={handleNewConversation}
        style={{ backgroundColor: "red", color: "white" }}
      >
        Create New Conversation
      </button>
    </>
  );
};

export default ChatInput;
