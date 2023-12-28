import { createChatSession } from "./llms/ollama";

const chatSession = createChatSession({ model: "codellama" });
chatSession.ask("Hello, how are you?").then(console.log);
