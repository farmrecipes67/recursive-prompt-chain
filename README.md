<!-- Recursive Prompt Chain – A Node.js utility for building recursive prompt chains, enabling iterative and self-referencing prompt workflows. -->

# recursive-prompt-chain

A Node.js utility for building **recursive prompt chains** — enabling iterative, self-referencing prompt workflows where the output of one step feeds into the next until a desired result or termination condition is reached.

[![GitHub last commit](https://img.shields.io/github/last-commit/farmrecipes67/recursive-prompt-chain)](https://github.com/farmrecipes67/recursive-prompt-chain/commits/main)
[![License](https://img.shields.io/github/license/farmrecipes67/recursive-prompt-chain)](./LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/farmrecipes67/recursive-prompt-chain)

---

## Overview

**recursive-prompt-chain** provides a framework for chaining prompts recursively. Each iteration can refine, expand, or transform the output of the previous step, making it useful for scenarios such as:

- Iterative text refinement
- Multi-step reasoning pipelines
- Self-correcting prompt workflows
- Recursive summarization or expansion

## Project Structure

```
recursive-prompt-chain/
├── .gitignore
├── LICENSE
├── README.md
├── package.json
└── src/
    └── index.js
```

| File / Directory | Description |
|---|---|
| `src/index.js` | Main entry point containing the core recursive prompt chain logic |
| `package.json` | Node.js project manifest with dependencies and scripts |
| `LICENSE` | Project license |
| `.gitignore` | Git ignore rules |

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- npm or yarn

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/farmrecipes67/recursive-prompt-chain.git
   cd recursive-prompt-chain
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

Run the main entry point:

```bash
node src/index.js
```

Or, if scripts are defined in `package.json`:

```bash
npm start
```

### Importing as a Module

You can also import the module directly in your own project:

```javascript
const recursivePromptChain = require('./src/index');

// Usage will depend on the exported API — see src/index.js for details.
```

> **Note:** Refer to `src/index.js` for the full API surface, available configuration options, and termination conditions for the recursive chain.

## How It Works

At a high level, a recursive prompt chain operates by:

1. **Initializing** with a starting prompt or input.
2. **Executing** the prompt and capturing the output.
3. **Evaluating** whether a termination condition has been met (e.g., max iterations, convergence, or a stop signal).
4. **Feeding** the output back as input to the next iteration if the chain should continue.
5. **Returning** the final result once the chain terminates.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "Add my feature"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate documentation.

## License

This project is licensed under the terms of the license included in the [LICENSE](./LICENSE) file.

---

<sub>*This README was auto-generated based on the repository structure and metadata.*</sub>