import { createChatSession } from "./llms/chatgpt";

const chatSession = createChatSession({
  model: "gpt-3.5-turbo-0301",
  temperature: 0.1,
  stream: false,
  apiKey: process.env.OPENAI_API_KEY,
});
chatSession.ask("Write a hello world web page").then(console.log);
