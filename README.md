# GPT-AGENT-JS

Autonomous agent framework with long term memory. The goal of this project is to provide a simple to use framework for creating autonomous agents that can learn and remember. The framework is designed to be used in a browser or nodejs environment. The framework is designed to be used with a variety of large language models including:

- [GPT-3](https://openai.com/blog/openai-api/) API.
- [ollama](https://github.com/jmorganca/ollama/blob/main/docs/api.md) API.

The framework has an implementation of MemGPT to provide long term memory for the agent even when the agent is not running. This includes the ability to save and load the agent's memory for later use.

## Design Principles

- Simple to use.
- Simple to extend.
- Simple to integrate with other
  - frameworks.
  - agents.
  - APIs.
  - language models.
  - memory models.
  - planning models.
  - execution models.
  - communication models.
  - delegation models.
  - streaming models.

## Installation

```bash
npm install gpt-agent-js
```

## Usage

```javascript
const { Agent } = require("gpt-agent-js");
```

## TODO

- [ ] Add support for ollama API.
- [ ] Add support for GPT-3 API.
- [ ] Allow library to be used in node and the browser.
  - [TypeScript: create library for NodeJS and Browser](https://medium.com/collaborne-engineering/typescript-create-library-for-nodejs-and-browser-fece291d517f)
  - [How to create a TypeScript library](https://medium.com/@koresar/how-to-create-a-typescript-library-1e88a7dc1fd)
  - [ES Modules in TypeScript](https://www.typescriptlang.org/docs/handbook/modules/reference.html#node16-nodenext)
- [ ] Use Fetch API for HTTP requests consistently.
  - [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
  - [Node Fetch](https://www.npmjs.com/package/node-fetch)
- [ ] Add support for agents to learn.
- [ ] Add support for agents to remember.
- [ ] Add support for agents to communicate with each other.
- [ ] Add support for agents to plan and execute or function api calls.
  - [Ollama functions](https://github.com/langchain-ai/langchainjs/blob/main/langchain/src/experimental/chat_models/ollama_functions.ts)
  - [Ollama function api](https://js.langchain.com/docs/integrations/chat/ollama_functions)
- [ ] Add support for agents to delegate tasks to other agents.
- [ ] Add support for MemGPT.
- [ ] Add support for saving and loading agent memory.
- [ ] Add support for streaming responses
- [ ] Add support for streaming between agents

## Related Projects

### DevAI

- [Continue](https://continue.dev) - An open-source autopilot in your IDE
- [GPT Pilot](https://github.com/Pythagora-io/gpt-pilot) - GPT Pilot is a true AI developer that writes code, debugs it, talks to you when it needs help, etc.
- [Mistral as Code Assistant](https://www.e2enetworks.com/blog/how-to-leverage-mistral-7b-llm-as-a-coding-assistant)

### OpenAI

- [LocalAI](localai.io) - LocalAI is the free, Open Source OpenAI alternative
- [FastChat](https://github.com/lm-sys/FastChat/blob/main/docs/openai_api.md) - FastChat is a free, open-source, and self-hosted chatbot API service for creating chatbots with OpenAI's GPT-3.

### Memory

- [MemGPT](https://memgpt.readme.io/docs)
- [MemGPT Ollama](https://memgpt.readme.io/docs/ollama)
- [MemGPT Article](https://medium.com/@lawrenceteixeira/memgpt-unlimited-memory-without-token-constraints-for-generative-ai-platforms-like-gpt-4-lamda-0c755ece7d05)
- [Forget Rag](https://james-tn.medium.com/forget-rag-embrace-agent-design-for-a-more-intelligent-grounded-chatgpt-6c562d903c61)

### LangChain

- [LangChain](https://langchain.com) - LangChain is a decentralized, open-source, and self-hosted chatbot API service for creating chatbots with OpenAI's GPT-3.
- [LangChain Alternatives](https://blog.apify.com/langchain-alternatives)

### GameAI

- [AI Dungeon](https://play.aidungeon.io) - AI Dungeon is an infinitely generated text adventure powered by deep learning

## License

[MIT](https://choosealicense.com/licenses/mit/)
