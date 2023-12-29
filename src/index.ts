import * as ollama from "./llms/ollama";
import * as chatGPT from "./llms/chatgpt";

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

const devMessage = "Write a hello world web page";
const genQuestion = "Can you search the internet to answer questions?";

ollamaSession
  .ask(genQuestion, (resp) => process.stdout.write(resp))
  .then(console.log);
