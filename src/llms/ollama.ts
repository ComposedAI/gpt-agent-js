import {
  ChatResponse,
  ChatRoleEnum,
  CompletionCallBack,
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

  async function ask(prompt: string, streamCallback?: CompletionCallBack) {
    const body = { model, prompt, stream, options: { temperature } };
    let response = "";
    let streamResponse: MessageResponse;

    const streamHandler = (data: string) => {
      // if this is a buffer we are in streaming mode at least for ollama and openai APIs
      const block = JSON.parse(data) as MessageResponse;
      response += block.response;
      if (streamCallback) {
        streamCallback(block.response);
      }

      if (block.done) {
        streamResponse = { ...block, response };
      }
    };

    return makeRequest<MessageRequest>({
      url: "http://localhost:11434/api/generate",
      body,
      callback: stream ? streamHandler : undefined,
    }).then((data) =>
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
