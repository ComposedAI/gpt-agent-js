import * as ollama from "./llms/ollama";
import * as chatGPT from "./llms/chatgpt";

function parameterToAPI(parameter?: string) {
  switch (parameter) {
    case "openai":
      return chatGPT.createChatSession({
        model: "gpt-3.5-turbo-0301",
        temperature: 0.1,
        stream: false,
        apiKey: process.env.OPENAI_API_KEY,
      });
    default:
      return ollama.createChatSession({
        model: "mistral",
        temperature: 0.1,
        stream: true,
      });
  }
}

function parameterToPrompt(parameter: string): string {
  switch (parameter) {
    case "coding":
      return "Write a hello world web page";
    default:
      return "Can you search the internet to answer questions?";
  }
}

const exampleRunner = (promptParam: string, apiParam?: string) => {
  const prompt = parameterToPrompt(promptParam);
  const api = parameterToAPI(apiParam);
  api.ask(prompt, (resp) => process.stdout.write(resp)).then(console.log);
};

function parseCommandLineParameters(): { [key: string]: string } {
  const parameters: { [key: string]: string } = {};

  for (let i = 2; i < process.argv.length; i++) {
    const parameter = process.argv[i];
    const [key, value] = parameter.split("=");

    if (key.startsWith("--")) {
      parameters[key.substring(2)] = value;
    }
  }

  return parameters;
}

const parameters = parseCommandLineParameters();

if (!parameters["prompt"] || parameters["help"]) {
  console.log("Usage: node src/index.ts --prompt=<prompt> --api=<api>");
  process.exit(1);
}

exampleRunner(parameters["prompt"], parameters["api"]);
