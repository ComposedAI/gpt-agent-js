import * as ollama from "../llms/ollama";
import * as chatGPT from "../llms/chatgpt";
import { ChatSession } from "../llms/llm";

enum AIAPI {
  ollama = "ollama",
  gpt = "gpt",
}

export function getSession(api: AIAPI): ChatSession {
  const ollamaSession = ollama.createChatSession({
    model: "mistral",
    temperature: 0.1,
    stream: true,
  });

  const chatGPTSession = chatGPT.createChatSession({
    model: "gpt-3.5-turbo-0301",
    temperature: 0.1,
    stream: false,
    apiKey: process.env.OPENAI_API_KEY,
  });

  switch (api) {
    case AIAPI.gpt:
      return chatGPTSession;
    default:
      return ollamaSession;
  }
}

export function parameterToAPI(parameter: string): Promise<AIAPI> {
  switch (parameter) {
    case "--gpt":
      return Promise.resolve(AIAPI.gpt);
    default:
      return Promise.resolve(AIAPI.ollama);
  }
}
