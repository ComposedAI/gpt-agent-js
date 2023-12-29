import {
  ChatResponse,
  ChatRoleEnum,
  CompletionCallBack,
  CompletionResponse,
  CreateChatSession,
  makeRequest,
} from "./llm";

interface Message {
  role: ChatRoleEnum;
  content: string;
}

interface ChatRequest {
  model: string;
  messages: Message[];
  stream: boolean;
  options: {
    temperature: number;
  };
}

interface MessageResponse {
  model: string;
  created_at: string;
  message: Message;
  done: boolean;
}

// TODO: Add complete chat conversation by including history in the request for context

export const createChatSession: CreateChatSession = ({
  model = "mistral",
  temperature = 0.7,
  stream = false,
}) => {
  const history: string[] = [];

  async function ask(
    prompt: string,
    streamCallback?: CompletionCallBack
  ): Promise<CompletionResponse> {
    const body: ChatRequest = {
      model,
      messages: [
        {
          role: ChatRoleEnum.user,
          content: prompt,
        },
      ],
      stream,
      options: { temperature },
    };

    let response = "";
    let streamResponse: MessageResponse;

    const streamHandler = (data: string) => {
      // if this is a buffer we are in streaming mode at least for ollama and openai APIs
      const block = JSON.parse(data) as MessageResponse;
      response += block.message.content;
      if (streamCallback) {
        streamCallback(block.message.content);
      }

      if (block.done) {
        streamResponse = {
          ...block,
          message: { ...block.message, content: response },
        };
      }
    };

    const messageToCompletionResponse = (
      message: MessageResponse
    ): CompletionResponse => ({
      model: message.model,
      response: message.message.content,
    });

    return makeRequest<ChatRequest>({
      url: "http://localhost:11434/api/chat",
      body,
      callback: stream ? streamHandler : undefined,
    }).then((data) =>
      messageToCompletionResponse(
        stream ? streamResponse : (JSON.parse(data) as MessageResponse)
      )
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
