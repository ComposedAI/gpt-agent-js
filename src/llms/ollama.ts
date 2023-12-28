import {
  ChatResponse,
  ChatRoleEnum,
  CompletionResponse,
  CreateChatSession,
  makeRequest,
} from "./llm";

interface MessageRequest {
  model: string;
  prompt: string;
  stream: boolean;
}

interface MessageResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

// TODO: Add complete chat conversation by including history in the request for context
// TODO: Add support for other endpoints

export const createChatSession: CreateChatSession = ({
  model = "mistral",
  temperature = 0.7,
  stream = false,
}) => {
  const history: string[] = [];

  function ask(prompt: string): Promise<CompletionResponse> {
    const message = { model, prompt, stream, options: { temperature } };
    let response = "";
    let streamResponse: MessageResponse;

    const streamHandler = (data: string) => {
      // if this is a buffer we are in streaming mode at least for ollama and openai APIs
      const block = JSON.parse(data) as MessageResponse;
      response += block.response;
      process.stdout.write(block.response);

      if (block.done) {
        streamResponse = { ...block, response };
      }
    };

    return makeRequest<MessageRequest>(
      "http://localhost:11434/api/generate",
      message,
      undefined,
      stream ? streamHandler : undefined
    ).then((data) =>
      stream ? streamResponse : (JSON.parse(data) as MessageResponse)
    );
  }

  function historyToChatResponse(history: string[]): ChatResponse[] {
    return history.map((message) => ({
      role: ChatRoleEnum.assistant,
      content: message,
    }));
  }

  return {
    ask,
    getHistory: () => historyToChatResponse(history),
    clearHistory: () => (history.length = 0),
  };
};
