# GPT-AGENT-JS

Autonomous agent framework with long term memory. The goal of this project is to provide a simple to use framework for creating autonomous agents that can learn and remember. The framework is designed to be used in a browser or nodejs environment. The framework is designed to be used with a variety of large language models including:

- [GPT-3](https://openai.com/blog/openai-api/) API.
- [ollama](https://github.com/jmorganca/ollama/blob/main/docs/api.md) API.

The framework has an implementation of MemGPT to provide long term memory for the agent even when the agent is not running. This includes the ability to save and load the agent's memory for later use.

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
- [ ] Add support for agents to plan and execute.
- [ ] Add support for agents to communicate with each other.
- [ ] Add support for MemGPT.
- [ ] Add support for running agent in browser by using web workers.
- [ ] Add support for saving and loading agent memory.
- [ ] Add support for streaming responses
- [ ] Add support for streaming between agents

## License

[MIT](https://choosealicense.com/licenses/mit/)
