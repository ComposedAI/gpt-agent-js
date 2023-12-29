import { createChatSession } from "./llms/ollama";

const session = createChatSession({
  model: "mistral",
  temperature: 0.1,
  stream: true,
});

session
  .ask("Can you search the internet to answer questions?", (resp) =>
    process.stdout.write(resp)
  )
  .then(console.log);
