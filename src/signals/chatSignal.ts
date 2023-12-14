import { signal } from "@preact/signals-react";

export const chatMessages = signal<string[]>([]);
export const currentInput = signal("");
