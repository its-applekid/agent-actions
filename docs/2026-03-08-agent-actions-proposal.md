# Agent Actions: Safe DeFi for AI Agents on Any EVM Chain

Date: 2026-02-24  
Status: Brainstorm complete — ready for comparison analysis  
Repo: ethereum-optimism/agent-actions (separate repo, monorepo: core library + web dashboard)

---

## Architecture

A ZeroDev Kernel smart account + session keys + custom on-chain daily cap validator:

1. User's EOA owns the smart account — full sudo access, can withdraw/revoke/change anything without bot cooperation
2. Bot gets a scoped session key — approved contract restrictions enforced on-chain by ZeroDev Call Policy
3. Custom on-chain cumulative spending cap policy — four composable modes: USD cap via Chainlink oracle, per-token amount cap, asset allowlist, or unrestricted. Tracks approve(), transfer(), increaseAllowance() plus native ETH value. Handles batch execution decoding. Signature allow-list blocks all unapproved off-chain signing. Most restrictive rule wins when modes are combined.
4. Recommended DeFi contract registry — curated catalog of approved (chainId, contractAddress, functionSelector) tuples. Users opt in via the dashboard. Users can also add custom contracts.
5. Web dashboard — hosted on GitHub Pages (self-hostable). Setup flow + ongoing management. Only way to change permissions. Wallet connection = auth.
6. v1: OP Mainnet + Uniswap — single chain, single protocol. Multi-chain via pre-allocated per-chain budgets (no cross-chain aggregation needed).

---

## What We're Building

An open-source toolkit that lets AI agents (Claude, OpenAI, etc.) interact with DeFi protocols on any EVM chain safely. Ships as an npm package with MCP server + CLI interfaces and a web dashboard.

The core innovations are:

1. A smart account where the user has full ownership — the bot has a scoped session key with on-chain spending limits and contract restrictions. The user can withdraw, revoke, or change anything at any time without the bot's cooperation.
2. A recommended DeFi contract registry — curated catalog of approved DeFi contracts. Users opt in to protocols via the dashboard and can add custom contracts.
3. A web dashboard for onboarding and ongoing management — connect wallet, configure limits, enable protocols. Bot cannot modify its own permissions.

### Summary

Setup:
1. User asks their OpenClaw to install agent-actions from a skill marketplace
2. Bot installs the npm package, generates its own wallet, saves the private key locally
3. Bot gives user a setup URL with the bot's public key embedded in the query string
4. User visits URL, connects their wallet, sets per-chain per-asset daily spending limits, opts into protocols from a recommended DeFi contract registry, optionally adds custom contract addresses
5. User signs one on-chain tx — deploys a smart account (user = owner) with a scoped session key for the bot and a custom on-chain spending cap policy that enforces cumulative limits per token per time window
6. User copies the smart account address from the dashboard, pastes it back to the bot
7. Dashboard prompts user to save the address and set up wallet transaction alerts
8. Bot saves the smart account address and dashboard URL to persistent local config
9. Bot is live

Usage:
- Read-only (prices, balances, portfolio): bot queries APIs or on-chain RPC, no tx needed, instant response
- Trade within limits ("swap 100 USDC for ETH"): bot checks the registry, gets a quote, confirms with user, signs with its session key, on-chain validator checks cumulative daily spend, executes, reports the result
- Trade over limits: on-chain validator rejects the transaction, bot tells user the daily cap has been reached
- Unapproved contract: on-chain Call Policy rejects the tx — the bot is incapable, not just refusing. User can enable the protocol in the dashboard or add a custom contract address
- No restrictions mode: user can opt out of the contract registry and/or token amount limits entirely via the dashboard. The bot gets a broad session key with no contract or spending constraints. Clearly labeled dangerous.
- Manage permissions: user returns to the dashboard anytime — adjust limits, enable/disable protocols, add custom contracts, revoke bot access. Bot cannot modify its own permissions

### The Threat We're Solving

An AI agent with signing authority gets prompt-injected (via a tweet, webpage, tool output, etc.) and is told to send $200,000. This must be impossible. The defense must be a hard on-chain limit that the agent cannot bypass regardless of what the LLM decides to do.

### End-User Experience

The primary end user is an agent owner — someone who wants their AI agent to interact with DeFi on their behalf. The entry point is the AI agent's skill marketplace (e.g., OpenClaw).

Setup flow (bot + user, interleaved):
1. User asks their AI agent (OpenClaw, etc.) to install the agent-actions skill from the marketplace
2. Bot follows skill setup steps: installs the agent-actions npm package
3. Bot generates its own keypair, securely stores its private key
4. Bot presents a setup URL to the user: `https://agent-actions.optimism.io/setup?botKey=0xBOT_PUBLIC_KEY`
5. User visits the URL in their browser
6. User connects wallet (MetaMask, WalletConnect, etc.) — wallet connection is the auth
7. User configures:
   - Per-chain, per-asset daily spending limits (e.g., 500 USDC/day on OP Mainnet, 200 USDC/day on Base)
   - Enabled protocols from the recommended DeFi contract registry (opt-in, not auto-enabled)
   - Custom contract addresses + chain IDs (optional, beyond the registry)
   - "Skip all limits" toggle (optional, clearly labeled dangerous)
8. User approves → on-chain transaction deploys smart account (user = owner) + creates session key for the bot's address + deploys custom cumulative daily cap validator
9. Dashboard shows the smart account address + prompts user to:
   - Save the address for their own records (in case the bot loses its config)
   - Set up transaction alerts via a third-party service (Tenderly, Alchemy Notify, or Forta — dashboard provides direct links)
10. User pastes the smart account address back to the bot
11. Bot saves the smart account address and dashboard URL to persistent storage (local config file, not the bot's context window) so it survives across sessions
12. Bot is now configured and operational

Wallet alerts (recommended during setup):
The dashboard should make it easy for the user to set up alerts on the smart account address via third-party services:
- **Tenderly Alerts (recommended)** — 12 trigger types (token transfers, balance changes, function calls, failed txs). Notifies via email, Slack, Telegram, Discord, webhooks, PagerDuty. Free tier available, no code needed.
- **Alchemy Notify** — Webhook-based address activity alerts (inbound/outbound transfers, mined/dropped txs). Broad EVM chain support.
- **Forta Network** — Decentralized monitoring network with community-built detection bots for suspicious activity and large transfers. More security-focused.

The dashboard should provide direct links to each service pre-filled with the smart account address where possible.

Ongoing management:
- User can return to the dashboard anytime to adjust limits, enable/disable protocols, add custom contracts, or revoke bot access
- Bot is read-only on its own permissions — cannot modify anything

What the agent does (runtime):
1. Reads session key config (spending limits, enabled protocols)
2. Before any transaction: checks the recommended DeFi contract registry + user's enabled protocols (off-chain)
3. For DeFi operations, uses thin TypeScript wrappers around official SDKs
4. Signs with the session key — on-chain validation enforces limits
5. If within session key limits: executes autonomously
6. If over limits: on-chain validator rejects the tx. Bot tells user the daily cap has been reached.
7. Reports results back to the owner

Over-limit user approval flow (future):
On-chain proposal mechanism where the bot submits transaction intent on-chain (~30 lines Solidity), and the user reviews and approves from the dashboard. Deferred — v1 only needs to block over-limit transactions.

### Architecture Diagram

```
Skill Marketplace (OpenClaw, etc.)
↓ user installs agent-actions skill
↓ bot installs npm package, generates keypair
↓ bot gives user setup URL with bot's public key

Web Dashboard (GitHub Pages, self-hostable)
↓ user connects wallet, configures limits + protocols
↓ deploys smart account, creates session key for bot (on-chain tx)
↓ user pastes smart account address back to bot

Smart Account (ZeroDev Kernel, user's EOA = owner)
+ Session Key (bot's key, scoped policies):
  │
  ├─ Call Policy: approved contracts + selectors (user opts in from registry)
  ├─ Call Policy: custom contracts added by user
  ├─ Per-call value cap (built-in ZeroDev)
  │
  └─ Custom Cumulative Spending Cap Policy (ZeroDev PolicyBase):
     ├─ Tracks: approve(), transfer(), increaseAllowance(), native ETH value
     ├─ Decodes executeBatch() and checks each call
     ├─ Signature allow-list via checkSignaturePolicy (only known-good types)
     ├─ Four composable modes: USD cap (Chainlink), per-token cap, asset allowlist, unrestricted
     ├─ USD mode: reads Chainlink price feeds on-chain, tokens without feeds denied
     ├─ Configurable windows (hourly, daily, weekly, custom)
     └─ Most restrictive rule wins when modes are combined
↓

Bot (npm package, runs locally on agent's machine)
├── MCP Server: structured tools for AI agents (stdio)
├── CLI: agent-actions <command> for scripting/debugging
├── Core library: wallet management, protocol integrations
│   └── Uniswap: Trading API REST + viem (v1)
│   └── Morpho: @morpho-org/bundler-sdk-viem (future)
│   └── Polymarket: @polymarket/clob-client (future)
└── Off-chain registry check (defense-in-depth)
```

**Key security property:** Even if the bot is prompt-injected, the on-chain cumulative spending cap policy prevents spending more than the configured limit per token per time window. The Call Policy restricts which contracts can be called. These are enforced at the ERC-4337 validation level — the bot's code cannot bypass them.

**User override:** User's EOA is the owner of the smart account. Can withdraw all funds, revoke the session key, change limits, or do anything else — no bot cooperation needed.

---

## Market Landscape

The ecosystem is post-hype, infrastructure-building phase. AI agent tokens crashed 70-90%, serious engineering continues.

Competitive landscape:
- **GOAT SDK:** 70+ DeFi plugins, 15+ chains, NO safety features
- **Coinbase AgentKit:** ~5 protocols, Base-first, CDP Policy APIs (off-chain)
- **ElizaOS:** 17.6k GitHub stars, ETH+SOL plugins, no safety
- **thirdweb MCP:** Contract interactions, no safety
- **Privy:** Wallet infra only, policy engine (server-side)

Key gaps we fill:
- No agent toolkit has on-chain spending enforcement
- MCP ecosystem has near-zero DeFi execution capability (all read-only)
- No human-in-the-loop approval flow for agent transactions
- No standard way for a user to give an agent limited, revocable spending authority

Market sentiment:
- Security community deeply skeptical (Freysa $47K prompt injection incident)
- Infrastructure builders converging on "agents never hold keys directly"
- Consensus: constrained autonomy with tiered permissions

---

## Security Threat Model

Six approaches evaluated:

| Approach | Stops $200K prompt injection? | Limitation |
|---|---|---|
| MCP server config (off-chain) | Weak — agent can bypass | Just an if-statement in JS |
| Privy/Turnkey policies (server-side) | Strong | Centralized trust |
| Coinbase Spend Permissions (on-chain) | Strong for transfers only | Can't scope DeFi function calls |
| Safe multisig + Allowance Module (on-chain) | Strong for transfers only | Can't scope DeFi function calls (same as Coinbase) |
| **ZeroDev Kernel + Session Keys (on-chain)** | **Strongest for all tx types** | **Chosen approach** |

---

## Research Findings

### 1. Safe Allowance Module — Token transfers only

**Finding:** The Allowance Module is hardcoded to `transfer(address,uint256)`. It cannot execute arbitrary DeFi contract calls. Same limitation as Coinbase Spend Permissions.

This is why the architecture uses ZeroDev Kernel instead of Safe.

### 2. Uniswap AI (`uniswap-ai`) — Claude Code plugin system, not a protocol client

**Finding:** uniswap-ai is a Nx monorepo of Claude Code plugins. It teaches Claude how to use Uniswap, but has no signing infrastructure and no importable SDK.

**Integration plan:** Call Uniswap Trading API directly (REST) from our TypeScript code. Sign with the bot's session key using viem. No dependency on uniswap-ai.

Uniswap Trading API: REST endpoint at `https://trade-api.gateway.uniswap.org/v1` — quote, approve, swap. Supports 16 chains including Optimism, Base, Arbitrum.

### 3. Polymarket CLI (`polymarket-cli`) — Pre-production, deferred to v2

**Finding:** Rust CLI, version 0.1.4. Critical bugs (broken Safe support, wrong address derivation, plaintext key storage). Polygon-only.

**Integration plan (v2):** Use `@polymarket/clob-client` TypeScript SDK directly.

### 4. Morpho tooling — No native agent tool, deferred to v2

**Finding:** No Morpho CLI, MCP server, or AI agent tool exists.

**Integration plan (v2):** Use `@morpho-org/bundler-sdk-viem` to construct multicall bundles. Bundler3 handles approve+deposit atomically.

**Security note:** Never set raw token approvals to Bundler3. Use the SDK's Permit/Permit2 flow.

### 5. Protocol integration summary

| Protocol | Integration method | Chains | Status |
|----------|-------------------|--------|--------|
| Uniswap | Trading API REST + viem (Universal Router) | 16 EVM chains | v1 |
| Polymarket | @polymarket/clob-client TypeScript SDK | Polygon only | v2 |
| Morpho | @morpho-org/bundler-sdk-viem | Ethereum, Base, + others | v2 |

### 6. ZeroDev Session Key Policies

**Built-in policies:** Call Policy (contract + selector restrictions, per-call value cap), Gas Policy, Rate Limit Policy (tx count per interval), Timestamp Policy, Sudo Policy.

**Gap:** No native cumulative spending cap. Rate Limit Policy caps transaction count, not value. Call Policy's valueLimit is per-call, not cumulative.

**Solution:** Custom cumulative spending cap policy (~200-250 lines Solidity) implementing ZeroDev's PolicyBase interface. Supports multiple rules per asset with configurable time windows (e.g., 500 USDC/day AND 2000 USDC/week). Negligible gas overhead on L2 (<$0.001/tx). No protocol-specific decoders.

**Tracked selectors** (all have `(address, uint256)` calldata layout):
- `transfer(address, uint256)` — 0xa9059cbb — direct ERC-20 send
- `approve(address, uint256)` — 0x095ea7b3 — grant allowance (routers pull via transferFrom)
- `increaseAllowance(address, uint256)` — 0x39509351 — OpenZeppelin extension, common in many ERC-20s

**Additional enforcement:**
- **Native ETH value:** check the value field in execute calls. If value > 0, count against ETH spending rules.
- **Batch execution:** decode `executeBatch(Call[])` and check each call individually. Sum amounts across the batch before comparing to caps.
- **ERC-2612 permits:** Call Policy must not allow `permit()` selector on tokens. Additionally, `checkSignaturePolicy` rejects permit-shaped (EIP-712) signatures to prevent off-chain gasless approvals.
- **`transferFrom()`:** Call Policy should not allow the bot to call `transferFrom()` directly. If needed, add selector 0x23b872dd with amount at calldata offset 68.

**Defense-in-depth model** (two policies working together):

| Vector | Call Policy (built-in) | Spending Cap Policy (custom) |
|--------|----------------------|------------------------------|
| transfer() | Allows only to approved contracts | Tracks cumulative amount |
| approve() | Allows only to approved contracts | Tracks cumulative amount |
| increaseAllowance() | Allows only to approved contracts | Tracks cumulative amount |
| Native ETH send | Can restrict value > 0 | Checks value field against ETH rules |
| executeBatch() | Checks each call in batch | Decodes batch, sums amounts |
| permit() signatures | Block permit() selector | Reject in checkSignaturePolicy |
| transferFrom() | Block selector (bot shouldn't call this) | Optional: add selector |
| Unknown selectors | Block — only approved selectors pass | Ignore (Call Policy handles) |

### 7. DeFi Call Patterns

- **Lending (Morpho/Aave):** `token.approve(vault, amount)` + `vault.deposit(amount, receiver)` — two contract calls
- **Swaps (Uniswap):** `token.approve(permit2)` + `permit2.approve(router)` + `router.execute(swap)` — up to three calls
- **All operations:** batched into single transactions by the smart wallet
- **Key insight:** all DeFi spending flows through `approve()`, `transfer()`, or `increaseAllowance()`, so capping those functions plus native ETH value caps all spending without protocol-specific logic

---

## Key Design Decisions

### Core principles

1. **On-chain enforcement is non-negotiable** — the bot must not be able to bypass spending limits even if prompt-injected
2. **Everything is configurable** — spending limits, time windows, enabled protocols, enabled chains
3. **"Skip all limits" escape hatches** — user can independently opt out of contract registry restrictions (broad session key) and/or token amount limits (no daily cap validator). Both toggles in the dashboard, clearly labeled dangerous.
4. **Block unknown calldata** — only allow transactions to contracts in the user's enabled list
5. **Simulation before execution** — calldata parsing + optional Anvil fork to verify transaction effects
6. **Bundled default infrastructure** — public RPCs, default gas settings. Zero-config bot startup.
7. **Open source** — everything ships open source

### Wallet & security

8. **ZeroDev Kernel smart account** — user's EOA is the owner. Bot has a scoped session key. No Safe, no multisig.
9. **Custom cumulative spending cap policy** — on-chain Solidity contract implementing ZeroDev's PolicyBase interface. Tracks `approve()`, `transfer()`, `increaseAllowance()` amounts plus native ETH value per token per configurable time window. Handles `executeBatch()` decoding. Blocks unapproved signature types via `checkSignaturePolicy` (allow-list for signatures — only known-good message types permitted). Works in tandem with Call Policy (which restricts allowed contracts + selectors + recipient addresses). Negligible gas overhead on L2 (<$0.001/tx).
10. **Four composable spending cap modes** (user chooses per their risk tolerance, most restrictive rule wins):
    - **USD cap via Chainlink oracle** — single USD-denominated cap across all tokens with Chainlink price feeds. Tokens without feeds denied by default. (e.g., "$500/day")
    - **Per-token amount cap** — explicit amount rules per token with configurable time windows (e.g., "500 USDC/day AND 0.5 ETH/hour")
    - **Asset allowlist** — bot can only touch specified tokens, everything else denied
    - **Unrestricted** — bot can spend unknown tokens freely (clearly labeled dangerous)
11. **Per-chain budgets** — caps are pre-allocated per chain. No cross-chain aggregation needed.

### Registry & protocols

12. **Recommended DeFi contract registry** — curated catalog of approved (chainId, contractAddress, functionSelector) tuples. Bundled as JSON in the npm package, updated via releases.
13. **Registry is opt-in** — new protocols appear in dashboard but are disabled until user enables them.
14. **User can add custom contracts** — (chainId, contractAddress) entries beyond the registry.
15. **Off-chain registry check as defense-in-depth** — bot checks registry before signing, in addition to on-chain Call Policy enforcement.

### Dashboard & UX

16. **Over-limit transactions are simply blocked** — on-chain validator rejects the tx, bot informs the user. User approval flow for over-limit txs deferred (on-chain proposal mechanism).
17. **Web dashboard** — hosted on GitHub Pages, self-hostable from the open source repo. Setup wizard + management dashboard. Wallet connection = auth.
18. **Dashboard is the only way to change permissions** — bot is read-only on its config. Bot cannot update the registry, session key, or any permission.
19. **Wallet alerts** — dashboard prompts user to set up transaction alerts via third-party services (Tenderly, Alchemy Notify, Forta) with direct links pre-filled with the smart account address.
20. **Bot persists config locally** — smart account address and dashboard URL saved to local config file, not the bot's context window.

### Distribution

21. **MCP server + CLI** — thin wrappers around a shared core TypeScript library. Both run locally on the user's machine. No infrastructure dependency.
22. **Separate repo** — ethereum-optimism/agent-actions. Monorepo containing core library + web dashboard.
23. **No infrastructure dependency** — everything runs locally. Dashboard is a static site. Registry is bundled JSON.

### Scope

24. **OP Mainnet + Uniswap first** — Trading API REST + viem. Morpho and Polymarket documented, deferred.

---

## Security Audit Findings & Decisions

Full security audit performed with threat model: user is non-technical, bot is assumed fully compromised.

### Critical — resolved

| Finding | Decision |
|---------|----------|
| Bot generates phishing setup URL | Hardcode dashboard domain in npm package. Bot can only generate URLs to the official domain. |
| Swap output directed to attacker | Hybrid recipient restriction: Call Policy rules for transfer/approve (built-in), custom Uniswap decoder for execute() recipient check. Recipients restricted to smart account + user wallet. |
| Infinite approve(type(uint256).max) breaks cap | Block infinite approvals entirely. Reject any approve where amount exceeds remaining cap for current window. Force exact-amount approvals. |
| Stale allowances bypass new windows | Exact-amount approvals solve this — no leftover allowance after operations. |
| Custom Solidity is single point of failure | Internal review + comprehensive fuzz testing (Foundry/Echidna) before mainnet. |
| Bot private key in plaintext | OS keychain (macOS Keychain, etc.) as default. Environment variable as fallback. |
| Unconfigured tokens have no caps | Four composable spending cap modes including USD cap via Chainlink oracle and asset allowlist. Tokens without Chainlink feeds denied in USD mode. |

### High — resolved

| Finding | Decision |
|---------|----------|
| executeDelegate (delegatecall) bypass | Verify ZeroDev blocks delegatecall for session keys. Add explicit tests. |
| Incomplete permit() blocking | Signature allow-list in checkSignaturePolicy. Only known-good message types permitted. All unapproved signature types rejected by default. |
| "Skip all limits" one-click exploit | Typed confirmation phrase required (e.g., "I understand I am removing all safety limits"). |
| npm supply chain attack on registry | Sign the registry JSON with a known key. Dashboard and bot verify signature. |
| User-added custom contracts social engineering | Dashboard validates contracts (verified source, deployment age). Prominent warning for unverified contracts. |
| Dashboard calldata unverifiable | Human-readable tx summary shown before signing in v1. |
| Local config tampering (dashboard URL swap) | Hardcode official dashboard domain in the npm package. |

### Medium — documented, address during implementation

- **Time window boundary racing:** fixed windows allow 2x spending in seconds at boundary. Document clearly. Users can mitigate with shorter windows (hourly caps).
- **No key rotation:** dashboard shows session key status + revoke button for v1. Auto-rotation deferred.
- **Cross-chain total exposure:** dashboard should display aggregate exposure across all chains.
- **Bridge contracts:** exclude from recommended registry for v1.
- **Sandwich attacks:** use Uniswap Trading API slippage protection. Consider private tx submission (Flashbots Protect).
- **Dashboard CSP headers:** configure strict CSP, use SRI hashes, bundle dependencies locally.
- **npm provenance:** enable npm provenance attestations. Pin all dependencies to exact versions.
- **Domain takeover:** ensure GitHub Pages CNAME is always active. Monitor subdomain.
- **Fee-on-transfer tokens:** spending cap overcounts (conservative). Document behavior.
- **Gas griefing:** use ZeroDev Gas Policy to cap gas spending per UserOp.
- **Policy immutability:** version the policy contract. Dashboard detects outdated versions and prompts migration.

---

## Open Questions

None — all questions resolved. Ready for comparison analysis with other wallet security approaches.
