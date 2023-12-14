import React from "react";
import { conversation } from "../signals/chat";
import OpenAI from "openai";
import { Marked } from "marked";
import DOMPurify from "dompurify";
import "highlight.js/styles/github.css";
import "./ChatWindow.css";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

const ChatWindow: React.FC = () => {
  const renderMessage = (
    message: OpenAI.Chat.ChatCompletionMessageParam,
    index: number
  ) => {
    const markdownContent = marked.parse(message.content as string);
    const cleanHTML = DOMPurify.sanitize(markdownContent as string);

    return (
      <div key={index} className={`message ${message.role}`}>
        <div
          className="message-content"
          dangerouslySetInnerHTML={{ __html: cleanHTML }}
        />
      </div>
    );
  };

  return (
    <div className="chat-window">{conversation.value.map(renderMessage)}</div>
  );
};

export default ChatWindow;
