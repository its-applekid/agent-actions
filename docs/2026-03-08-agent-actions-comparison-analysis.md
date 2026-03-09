# Agent Actions Security Model: Comprehensive Comparison Analysis

**Date:** 2026-03-08  
**Status:** Research Document  
**Related Documents:**
- `2026-03-08-wallet-security-threat-model.md` (threat analysis)
- `2026-03-08-agent-actions-proposal.md` (proposal details)
- `aws-kms-wallet-migration.md` (KMS implementation guide)

---

## Executive Summary

This document analyzes the **Agent Actions** security model against 6 existing wallet approaches for AI agent access. Agent Actions is a ZeroDev Kernel smart contract wallet with session keys, custom on-chain spending caps, and a curated DeFi registry.

**Key finding:** Agent Actions provides the strongest security against all 11 identified attack vectors while maintaining broad DeFi access through its registry model.

---

## Comparison Matrix: Agent Actions vs. Existing Approaches

| Feature / Attack Vector | .env File | AWS Secrets | AWS KMS | GOAT SDK | Coinbase AgentKit | Generic Smart Contract | **Agent Actions** (ZeroDev + Custom Policy) |
|-------------------------|-----------|-------------|---------|----------|-------------------|------------------------|---------------------------------------------|
| **1. Direct Prompt Injection** | ❌ | ❌ | ❌ | ❌ | ⚠️ Partial | ✅ Protected | ✅ **Protected** (on-chain Call Policy + spending cap) |
| **2. Indirect Prompt Injection** | ❌ | ❌ | ❌ | ❌ | ⚠️ Partial | ✅ Protected | ✅ **Protected** (contract validates before execution) |
| **3. Private Key Exfiltration** | 🔴 Critical | ❌ Critical | ✅ Protected | ❌ Critical | ✅ Protected | ✅ Protected | ✅ **Protected** (pluggable key storage: local keychain, KMS, TEE, etc.) |
| **4. Malicious Skill Installation** | 🔴 Critical | ❌ Critical | ⚠️ Partial | ❌ Critical | ⚠️ Partial | ⚠️ Partial | ⚠️ **Partial** (skill could steal bot's session key, but limited by on-chain policy) |
| **5. API Key Compromise** | 🔴 Critical | ❌ Critical | ❌ | ❌ | ⚠️ Partial | ⚠️ Partial | ⚠️ **Partial** (attacker gets session key permissions only, still limited by on-chain policy) |
| **6. Autonomous Exploitation** | ❌ | ❌ | ❌ | ❌ | ⚠️ Partial | ✅ Protected | ✅ **Protected** (registry allowlist + Call Policy) |
| **7. Social Engineering** | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ Partial | ⚠️ **Partial** (dashboard UX mitigates, spending caps limit damage) |
| **8. Context Pollution** | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ Partial | ⚠️ **Partial** (contract enforces policy regardless) |
| **9. Agent Self-Modification** | 🔴 Critical | ❌ | ⚠️ Partial | ❌ | ⚠️ Partial | ✅ Protected | ✅ **Protected** (dashboard-only management, bot cannot modify) |
| **10. File System Access** | 🔴 Critical | ⚠️ Partial | ✅ Protected | ❌ | ✅ Protected | ✅ Protected | ⚠️ **Partial** (bot's session key in keychain, but limited scope) |
| **11. Custodial Provider Compromise** | N/A | N/A | N/A | N/A | 🔴 Critical | N/A | ✅ **Protected** (self-custody) |
| **Audit Trail** | ❌ None | ❌ None | ✅ CloudTrail | ❌ None | ✅ CDP telemetry | ✅ On-chain | ✅ **On-chain** (every tx permanent) |
| **Key Exposure Surface** | 🔴 Plaintext file | ❌ Plaintext API | ✅ Never exposed | ❌ In-memory | ✅ Never exposed (TEE) | ✅ Contract-controlled | ✅ **Configurable** (local, KMS, TEE - user's choice) |
| **Guardrail Enforcement** | ❌ Config file | ❌ MCP server | ⚠️ IAM policy | ❌ Config file | ⚠️ CDP policy | ✅ Smart contract | ✅ **On-chain** (Call Policy + Cumulative Spending Cap + Signature Allowlist) |
| **Custodial Risk** | ✅ Self-custody | ✅ Self-custody | ✅ Self-custody | ✅ Self-custody | 🔴 Custodial | ✅ Self-custody | ✅ **Self-custody** (user's EOA owns account) |
| **Single Point of Failure** | ❌ Agent machine | ❌ AWS account | ❌ AWS account | ❌ Agent machine | 🔴 Coinbase infra | ⚠️ Contract + signer | ⚠️ **Contract + bot's session key** |
| **Cost of Breach** | 🔴 Total loss | 🔴 Total loss | 🟡 IAM-limited | 🔴 Total loss | 🟢 Cap-limited | 🟢 Policy-limited | 🟢 **Spending cap-limited** (hourly/daily/weekly) |

---

## Operational Capabilities Comparison

| Feature | .env File | AWS Secrets | AWS KMS | GOAT SDK | Coinbase AgentKit | Generic Smart Contract | **Agent Actions** |
|---------|-----------|-------------|---------|----------|-------------------|------------------------|-------------------|
| **DeFi Protocol Access** | Unlimited (if built) | Unlimited (if built) | Unlimited (if built) | ✅ 200+ protocols | ⚠️ Limited (~5 protocols) | Unlimited (if built) | ✅ **Curated registry** (opt-in, extensible) |
| **Composability** | ✅ Full | ✅ Full | ✅ Full | ✅ High | ❌ Low | ✅ High | ✅ **High** (user opts into protocols) |
| **Setup Complexity** | Low | Medium | High | Low | Low | High | ⚠️ **Medium** (web dashboard + on-chain tx) |
| **Setup Cost** | Free | Free | $20-100 | Free | Free | $20-100 | **~$20-50** (deploy smart account + policy) |
| **Per-Transaction Cost** | Gas only | Gas only | Gas + KMS | Gas only | Gasless (Base) | Gas + overhead | **Gas + minimal overhead** (<$0.001 on L2) |
| **Platform Fees** | None | None | None | None | ⚠️ CDP fees (undisclosed) | None | **None** |
| **Chain Support** | Any EVM | Any EVM | Any EVM | 30+ chains | Base + ETH | Any EVM | ✅ **Any EVM** (per-chain budgets) |
| **Vendor Lock-In** | None | ⚠️ AWS | ⚠️ AWS | None | 🔴 High (CDP) | None | **None** (open source, self-hostable) |
| **Migration Path** | Easy | Easy | Hard (no export) | Easy | 🔴 Difficult | Easy | ✅ **Easy** (user owns account, can change signer) |
| **Gas Optimization** | ✅ Can use flashbots | ✅ Can use flashbots | ✅ Can use flashbots | ✅ Can use flashbots | ❌ Cannot customize | ⚠️ Limited | ⚠️ **Limited** (but can use private RPC) |

---

## Unique Features of Agent Actions

### 1. Four Composable Spending Cap Modes

Agent Actions is the only solution offering multiple cap strategies that can be combined:

| Mode | Description | Use Case | Protection Level |
|------|-------------|----------|------------------|
| **USD Cap (Chainlink)** | Single USD-denominated cap across all tokens | "$500/day regardless of asset" | 🟢 High (normalized across assets) |
| **Per-Token Amount Cap** | Explicit rules per token | "500 USDC/day AND 0.5 ETH/hour" | 🟢 High (granular control) |
| **Asset Allowlist** | Only specified tokens allowed | "USDC, ETH, WETH only" | 🟢 High (deny unknown tokens) |
| **Unrestricted** | No token limits | Testing/advanced use | 🔴 None |

**Most restrictive rule wins** when modes are combined. Example: User sets "$500/day USD cap" AND "1000 USDC/day token cap". If ETH price rises, the $500 USD cap kicks in before the 1000 USDC limit.

**Comparison:**
- **Coinbase AgentKit:** Fixed CDP-defined limits, not user-configurable per token
- **Generic Smart Contract:** Must implement custom logic (Agent Actions provides this out-of-the-box)
- **GOAT SDK / .env / AWS:** No spending caps

### 2. Recommended DeFi Contract Registry

**Innovation:** Pre-curated catalog of safe DeFi protocols, user opts in via dashboard.

**How it works:**
- Registry bundled as signed JSON in npm package
- Contains tuples: `(chainId, contractAddress, functionSelector)`
- Updated via package releases
- User enables protocols in web dashboard
- On-chain Call Policy enforces (bot cannot bypass)

**Protocols (v1 focus: Uniswap):**
- Uniswap (v3, Universal Router)
- Future: Morpho, Polymarket, Aave, Curve, Balancer, etc.

**User can add custom contracts** beyond the registry.

**Comparison:**
- **GOAT SDK:** 200+ protocols integrated, but no allowlist enforcement
- **AgentKit:** ~5 protocols, Coinbase-controlled, cannot add custom
- **Generic Smart Contract:** No registry (user must manually specify every contract)
- **Agent Actions:** Curated registry + custom additions + on-chain enforcement

### 3. Session Keys with Scoped Permissions

**Architecture:**
- User's EOA owns the smart account (full control)
- Bot gets a **session key** (ephemeral, scoped permissions)
- Session key validated by on-chain policies:
  - **Call Policy:** Allowed contracts + function selectors
  - **Cumulative Spending Cap Policy:** Per-token limits per time window
  - **Signature Allowlist:** Only known-good signature types (blocks `permit()` attacks)

**Bot's session key is compromised → attacker still limited by on-chain policy**

**Comparison:**
- **AWS KMS / AgentKit:** Signing happens remotely (key never on agent machine) — stronger key security
- **Agent Actions:** Key on agent machine (weaker), but scoped permissions (stronger blast radius containment)
- **.env / Secrets / GOAT:** Full key on machine, no scoping

**Tradeoff:** Agent Actions prioritizes operational simplicity (bot runs locally) over maximum key security (TEE/HSM). Mitigates with session key scoping.

### 4. Defense-in-Depth: Three Layers

| Layer | Enforcement Point | Purpose |
|-------|------------------|---------|
| **1. Off-chain registry check** | Bot code | Fast rejection, user feedback |
| **2. Call Policy (on-chain)** | Smart contract validation | Blocks unapproved contracts + selectors |
| **3. Cumulative Spending Cap (on-chain)** | Smart contract validation | Enforces per-token limits per time window |

**Even if bot is fully compromised,** layers 2 and 3 cannot be bypassed.

**Comparison:**
- **Coinbase AgentKit:** CDP policy (centralized, off-chain verification)
- **Generic Smart Contract:** Only layer 2 (Call Policy) — no spending caps unless custom-built
- **Agent Actions:** All 3 layers

### 5. Web Dashboard for Management

**User experience:**
- Connect wallet (MetaMask, etc.) → authentication
- Configure limits, enable protocols, add custom contracts
- Review live spending (current window usage)
- Revoke bot access instantly

**Bot is read-only on its permissions** — cannot modify allowlist, spending caps, or dashboard URL.

**Comparison:**
- **Coinbase AgentKit:** CDP web console (custodial context)
- **Generic Smart Contract:** No dashboard (must interact with contract directly)
- **Agent Actions:** Purpose-built dashboard for agent wallet management

### 6. Signature Allowlist (Prevents `permit()` Attacks)

**Problem:** ERC-2612 `permit()` allows off-chain gasless approvals via EIP-712 signatures. Malicious agent could trick user into signing a permit message, granting unlimited allowance.

**Agent Actions solution:**
- `checkSignaturePolicy` hook in spending cap validator
- Allowlist of approved signature types (UserOperation signatures only)
- **All other signature types rejected** (including EIP-712 permit messages)

**Comparison:**
- **No other solution explicitly addresses this** (except manual Call Policy configuration)

---

## Attack Vector Analysis: Why Agent Actions Outperforms

### Attack #1 & #2: Direct/Indirect Prompt Injection

**Threat:** Agent told to send $200K via malicious prompt.

| Solution | Protection | Why |
|----------|-----------|-----|
| .env / Secrets / KMS / GOAT | ❌ None | Agent has full signing authority |
| AgentKit | ⚠️ Partial | CDP spending limits (centralized, opaque) |
| Generic Smart Contract | ✅ Protected | On-chain policy enforces limits |
| **Agent Actions** | ✅ **Protected** | On-chain Call Policy + Cumulative Spending Cap + Signature Allowlist |

**Agent Actions advantage:** Triple enforcement (off-chain check + Call Policy + spending cap). Even if LLM is fully compromised, cannot exceed configured limits.

### Attack #3: Private Key Exfiltration

**Threat:** Malicious skill reads bot's private key.

| Solution | Exposure | Mitigation |
|----------|----------|-----------|
| .env | 🔴 Plaintext file | None |
| AWS Secrets | ❌ Plaintext via API | Requires AWS creds |
| AWS KMS | ✅ Never exposed | HSM signing |
| GOAT SDK | ❌ In-memory | None |
| AgentKit | ✅ Never exposed (TEE) | Custodial |
| **Agent Actions** | ✅ **Configurable** | **Local keychain, KMS, TEE, or custom signer** |

**Agent Actions flexibility:** Key storage is **pluggable** - users choose their security/convenience tradeoff:
- **Local keychain:** Simple setup, session key has limited scope (spending cap + Call Policy)
- **AWS KMS:** Never exposed, remote signing via HSM
- **OS HSM:** Secure Enclave (macOS), TPM (Linux/Windows)
- **Custom signer:** Any signing service compatible with ERC-4337

**Security advantage:** Even with local keychain, attacker only gets session key permissions (capped spending, approved contracts only). Much better than .env/Secrets/GOAT (unlimited access).

### Attack #9: Agent Self-Modification of Guardrails

**Threat:** Prompt injection → agent edits config to remove spending caps.

| Solution | Guardrail Location | Agent Can Modify? |
|----------|-------------------|-------------------|
| .env / Secrets / GOAT | Config file | 🔴 Yes (prompt injection) |
| AWS KMS | IAM policy | ⚠️ No (but can try to social engineer user) |
| AgentKit | CDP policy (external) | ⚠️ No (Coinbase controls) |
| Generic Smart Contract | On-chain | ✅ No (owner-only) |
| **Agent Actions** | **On-chain + dashboard-only** | ✅ **No** (bot has no write access) |

**Agent Actions advantage:** Bot cannot modify its own permissions. Dashboard is the only management interface. Bot's session key has no upgrade/modify rights on the smart account.

### Attack #11: Custodial Provider Compromise

**Threat:** Coinbase hacked → all AgentKit wallets drained.

| Solution | Custodial Risk | Impact |
|----------|---------------|--------|
| All except AgentKit | Self-custody | ✅ N/A |
| Coinbase AgentKit | Custodial (Coinbase) | 🔴 Total loss if Coinbase breached |
| **Agent Actions** | **Self-custody** (user's EOA) | ✅ **N/A** |

**Agent Actions advantage:** User owns the smart account. Coinbase cannot freeze, seize, or lose access to funds.

---

## Cost-Benefit Analysis

| Solution | Setup Cost | Ongoing Cost | Security Level | DeFi Access | Best For |
|----------|-----------|--------------|----------------|-------------|----------|
| **.env File** | Free | Gas | 🔴 Critical risk | Unlimited (if built) | ❌ **Never use with real funds** |
| **AWS Secrets** | Free | Gas | ❌ High risk | Unlimited (if built) | Hot wallet <$500 |
| **AWS KMS** | $20-100 | Gas + KMS fee | 🟢 Strong | Unlimited (if built) | Production <$10k |
| **GOAT SDK** | Free | Gas | ❌ No guardrails | ✅ 200+ protocols | Testing only (no safety) |
| **Coinbase AgentKit** | Free | Gas (Base gasless) | 🟡 Strong (but custodial) | ⚠️ Very limited (~5) | Small-scale, simple txs <$5k |
| **Generic Smart Contract** | $20-100 | Gas + overhead | 🟢 Strong | Unlimited (if built) | Custom solutions |
| **Agent Actions** | **$20-50** | **Gas + minimal** | 🟢 **Strongest** | ✅ **Curated registry** | **Production DeFi agents** |

**Agent Actions sweet spot:** Combines strong security (on-chain enforcement) with broad DeFi access (curated registry + extensible) at reasonable cost.

---

## Weaknesses & Limitations of Agent Actions

### 1. Key Storage is User-Configurable (Not Opinionated)

**Design decision:** Agent Actions doesn't prescribe where the session key is stored - users choose based on their security requirements.

**Options:**
- **Local keychain:** Simplest, session key still has limited scope
- **AWS KMS / Cloud HSM:** Remote signing, key never exposed
- **Hardware wallet:** Ledger/Trezor as session key signer
- **OS-level HSM:** Secure Enclave, TPM

**Tradeoff:** More flexibility means more configuration complexity for users who want maximum security.

**Comparison:** Weaker than AWS KMS / AgentKit (key never exposed). Stronger than .env / Secrets (full key exposure = unlimited access).

**Improvement path:** Support remote signing via AWS KMS or Secure Enclave for session key (future).

### 2. Setup Complexity Higher Than AgentKit

**Weakness:** User must:
1. Visit dashboard
2. Connect wallet
3. Configure limits/protocols
4. Sign on-chain tx (deploy smart account)
5. Paste address back to bot

**Comparison:**
- **AgentKit:** 3 env vars, done
- **Agent Actions:** Multi-step setup

**Mitigation:** Dashboard UX designed for simplicity. Setup wizard walks user through each step.

### 3. Gas Costs Higher Than Native EOA

**Weakness:** Smart contract execution adds overhead (~5-10% higher gas than EOA signing).

**Comparison:**
- **EOA (.env, Secrets):** Lowest gas
- **Smart Contract (Agent Actions, Safe):** +5-10% gas overhead
- **AgentKit (Base):** Gasless (Coinbase subsidizes)

**Mitigation:** On L2 (Optimism, Base), gas costs are negligible (<$0.001/tx). Overhead is acceptable trade for security.

### 4. Time Window Boundary Racing

**Weakness:** User can spend 2x daily cap in seconds by timing transactions at window boundary (11:59pm + 12:01am).

**Comparison:** All time-window-based limits have this issue (including AgentKit).

**Mitigation:** Use shorter windows (hourly caps) to reduce blast radius. Document clearly in dashboard.

### 5. Registry Maintenance Burden

**Weakness:** Curated registry must be kept up-to-date as new protocols launch.

**Comparison:**
- **GOAT SDK:** Community-maintained, 200+ protocols
- **AgentKit:** Coinbase maintains (but very limited)
- **Agent Actions:** Optimism team maintains registry

**Mitigation:** Open source registry (community can contribute). User can add custom contracts to bypass registry delay.

---

## Recommendations

### Use Agent Actions When:
- ✅ Production DeFi agent operations (>$1k funds)
- ✅ Broad DeFi access needed (not just transfers)
- ✅ Self-custody is required
- ✅ User can handle multi-step setup
- ✅ Operating on L2 (low gas costs)

### Do NOT Use Agent Actions When:
- ❌ Maximum key security required (use AWS KMS instead)
- ❌ User cannot handle setup complexity (use AgentKit for simple txs)
- ❌ Only simple transfers needed (AgentKit or Safe Allowance Module sufficient)
- ❌ Testing/development only (use .env on testnet)

### Hybrid Approach (Best of Both Worlds):
**Agent Actions + AWS KMS for Session Key**
- User's EOA owns smart account (Agent Actions architecture)
- Bot's session key stored in AWS KMS (never on machine)
- On-chain spending caps + Call Policy (Agent Actions policies)

**Result:** Strongest key security (KMS) + scoped permissions (session key) + on-chain enforcement (policies).

**Tradeoff:** Higher complexity, +50-200ms latency per signature.

---

## Conclusion

**Agent Actions provides the strongest overall security** against prompt injection attacks while maintaining broad DeFi access and self-custody.

| Dimension | Winner | Runner-Up |
|-----------|--------|-----------|
| **Key Security** | AWS KMS / AgentKit | Agent Actions (session key scoping compensates) |
| **Guardrail Enforcement** | **Agent Actions** | Generic Smart Contract |
| **DeFi Access** | GOAT SDK (200+ protocols) | **Agent Actions** (curated registry) |
| **Self-Custody** | Tie (all except AgentKit) | **Agent Actions** (user-owned smart account) |
| **Setup Simplicity** | AgentKit | AWS Secrets |
| **Cost Efficiency** | .env / Secrets | **Agent Actions** (L2 gas minimal) |
| **Prompt Injection Defense** | **Agent Actions** | Generic Smart Contract |
| **Overall (Production Use)** | **🏆 Agent Actions** | AWS KMS (if no DeFi needed) |

**For AI agents doing real DeFi operations with meaningful funds:** Agent Actions is the recommended solution.

---

## Next Steps

1. Review comparison table with stakeholders
2. Validate weaknesses are acceptable for target use case
3. Consider hybrid approach (Agent Actions + KMS for session key) if maximum security needed
4. Proceed with Agent Actions implementation per original proposal
