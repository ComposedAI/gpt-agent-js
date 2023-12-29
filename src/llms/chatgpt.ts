import {
  ChatResponse,
  ChatRoleEnum,
  CompletionResponse,
  CreateChatSession,
  makeRequest,
} from "./llm";

enum MessageRoleEnum {
  system = "system",
  user = "user",
  assistant = "assistant",
}

type Message = {
  role: MessageRoleEnum;
  content: string;
};

type MessageRequest = {
  model: string;
  messages: Message[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  stop?: string;
};

type MessageResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
    logprobs: any;
  }[];
};

// TODO: Add support for streaming responses
// TODO: Add complete chat conversation by including history in the request for context
// TODO: Add support for other endpoints

async function chatCompletion(
  apiKey: string,
  model: string,
  temperature: number,
  messages: Message[] = []
) {
  const body: MessageRequest = {
    model,
    messages,
    temperature,
    top_p: 1,
  };

  try {
    const data = await makeRequest<MessageRequest>({
      url: "https://api.openai.com/v1/chat/completions",
      body,
      apiKey,
    });
    return JSON.parse(data) as MessageResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const createChatSession: CreateChatSession = ({
  model = "gpt-3.5-turbo-0301",
  temperature = 0.7,
  stream = false,
  apiKey,
}) => {
  if (!apiKey) {
    throw new Error("API key is required");
  }

  const history: Message[] = [];

  async function ask(prompt: string): Promise<CompletionResponse> {
    const message = { role: MessageRoleEnum.user, content: prompt };

    const response = await chatCompletion(apiKey!, model, temperature, [
      ...history,
      message,
    ]);
    const messages = response.choices.map((choice) => choice.message);
    history.push(message, ...messages);
    const response_1 = response;
    return {
      model: response_1.model,
      response: response_1.choices
        .map((choice_1) => choice_1.message.content)
        .join("\n"),
    };
  }

  function historyToChatResponse(history: Message[]): ChatResponse[] {
    return history.map((message) => ({
      role:
        message.role === MessageRoleEnum.user
          ? ChatRoleEnum.user
          : ChatRoleEnum.assistant,
      content: message.content,
    }));
  }

  return {
    ask,
    getHistory: () => historyToChatResponse(history),
    clearHistory: () => (history.length = 0),
  };
};
