# Agent Actions

Safe DeFi for AI agents. On-chain spending limits, session keys, and smart contract enforcement.

## Overview

Agent Actions is a wallet security architecture for AI agents using ZeroDev Kernel smart accounts with session keys and on-chain spending caps.

### The Problem

Every AI agent DeFi SDK fires transactions without safety guardrails. A prompt-injected agent with signing authority could drain a wallet.

### The Solution

- **ZeroDev Kernel:** Smart contract wallet with session keys
- **On-Chain Limits:** Custom Solidity spending cap policy
- **Web Dashboard:** Configure limits, enable protocols, revoke access

## Architecture

```
User (EOA) → Dashboard → ZeroDev SDK → Kernel Account (on-chain)
├── ECDSA Validator (sudo = user)
├── Permission Validator (regular = bot)
│   ├── Call Policy
│   └── SpendingCapPolicy
└── Session Key (bot's address)

Bot → MCP Server → ZeroDev SDK → Kernel Account → Uniswap
```

## Features

- **Composable Spending Caps:** USD cap, per-token cap, allowlist, unrestricted
- **Curated DeFi Registry:** Pre-vetted protocols (starting with Uniswap)
- **Session Keys:** Bot gets scoped permissions, user retains full control
- **Defense-in-Depth:** Three layers of protection

## Documentation

See the [comparison analysis](https://its-applekid.github.io/agent-actions/) for detailed security analysis vs. other approaches.

## Status

🚧 Under development. Not ready for production use.

## Built on Optimism

This project is optimized for Optimism and other L2 networks.

## License

MIT
