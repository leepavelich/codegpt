import { signal } from "@preact/signals-react";
import OpenAI from "openai";

export const conversation = signal<OpenAI.Chat.ChatCompletionMessageParam[]>(
  []
);
export const currentInput = signal("");
export const isSending = signal(false);
export const errorMessage = signal<string | null>(null);
