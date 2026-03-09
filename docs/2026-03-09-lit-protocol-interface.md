# Possible Architecture: Lit Protocol Interface

## Lit Protocol

[Lit Protocol](https://litprotocol.com) provides programmable key pairs (PKPs) secured by a distributed network. PKPs are ECDSA wallets where signing authority is controlled by JavaScript code (Lit Actions) that runs across the Lit network nodes. Users can delegate signing permissions to agents via session signatures without exposing private keys.

We could integrate Lit Protocol to provide non-custodial agent access where:
- User creates a PKP (their wallet)
- User deploys a Lit Action defining signing policy (spending caps, allowed contracts, time limits)
- User grants agent a session signature (temporary signing permission)
- Agent requests signatures through Lit network when executing DeFi transactions

### Pros

- **True non-custodial**: Private key shards distributed across Lit network nodes, never exist in one place
- **Programmable policy**: Lit Actions written in JavaScript define exactly what agent can sign
- **Session-based access**: Time-limited, revocable permissions without sharing keys
- **Chain agnostic**: PKPs work across any EVM chain (and non-EVM with adapters)
- **No smart contract deployment**: Unlike ZeroDev/account abstraction, PKPs are EOAs (no gas for deployment)
- **Existing ecosystem**: Integrates with many wallets and dapps already
- **Flexible auth**: Can use social login, passkeys, or traditional wallets to control PKPs

### Cons

- **Network dependency**: Signatures require 2/3 of Lit nodes to respond (decentralized but not self-hosted)
- **JavaScript-based policy**: Lit Actions are less auditable than Solidity smart contracts
- **Latency**: Distributed signing adds ~2-5 seconds per signature vs local signing
- **Cost model complexity**: Free tier limited, paid tiers based on requests/month (not transparent onchain)
- **Less mature**: Newer technology compared to battle-tested smart account standards
- **Policy updates**: Changing Lit Action requires minting new PKP or complex delegation patterns
- **No onchain enforcement**: Policy lives in Lit Actions (offchain code), not in smart contracts
- **Agent must be trusted with session sig**: Session signature is a bearer token (whoever has it can use it)

<aside>
🧠 **Decision 3**: Does Lit Protocol provide the right balance of security and usability for Agent Actions?
</aside>

---

## Example Transaction Flow

### Scenario
User wants agent to swap 100 USDC for ETH on Uniswap via Agent Actions.

### Setup Phase (One-time)

1. **User mints PKP** (Lit Protocol dashboard or SDK)
   - **Action**: Call Lit contracts to create new distributed key pair
   - **Cost**: ~$5-15 in ETH (gas + minting fee) paid by user
   - **Result**: User receives PKP public key (becomes their wallet address)

2. **User deploys Lit Action** (policy code)
   - **Action**: Upload JavaScript defining signing rules:
     ```javascript
     // Example Lit Action policy
     if (txValue > ethers.parseUnits("1000", 6)) return false; // Max 1000 USDC per tx
     if (!ALLOWED_CONTRACTS.includes(toAddress)) return false; // Only whitelisted contracts
     if (Date.now() > SESSION_EXPIRY) return false; // Time-limited
     return true; // Approve signature
     ```
   - **Cost**: Free (stored on Lit network)
   - **Result**: Lit Action IPFS hash becomes policy identifier

3. **User funds PKP wallet**
   - **Action**: Send ETH + USDC to PKP address for gas + swaps
   - **Cost**: Transfer fees paid by user's funding wallet
   - **Result**: PKP wallet has balance

4. **User grants agent session signature**
   - **Action**: User signs session delegation using their auth method (wallet, social login, etc.)
   - **Cost**: Free (offchain signature)
   - **Result**: Agent receives session signature (bearer token valid for X hours/days)

### Transaction Execution Phase

5. **Agent constructs transaction**
   - **Action**: Agent Actions SDK builds Uniswap swap calldata (100 USDC → ETH)
   - **Cost**: Free (local computation)
   - **Result**: Unsigned transaction object

6. **Agent requests signature from Lit**
   - **Action**: Agent calls Lit SDK with session signature + unsigned transaction
   - **Cost**: Lit network usage (counts toward plan limit or pay-per-use)
   - **Who pays**: Whoever provides Lit API key (likely Optimism Foundation if we host, or user if BYOK)
   - **Process**:
     - Lit nodes receive request
     - Each node runs Lit Action policy code
     - Policy checks: amount ≤ 1000 USDC? destination = Uniswap? session not expired?
     - If 2/3+ nodes approve, they combine signature shards
   - **Result**: Valid ECDSA signature returned to agent

7. **Agent broadcasts transaction**
   - **Action**: Agent submits signed transaction to RPC (Base, Optimism, etc.)
   - **Cost**: Gas fee paid from PKP wallet balance
   - **Who pays**: User (their PKP wallet funded in step 3)
   - **Result**: Transaction mined, swap executed

8. **User receives ETH**
   - **Action**: Uniswap contract sends ETH to PKP address
   - **Cost**: Already covered in gas (step 7)
   - **Result**: User's PKP wallet now holds ETH

---

## Cost Breakdown: Who Pays What

| Step | Action | Cost | Who Pays |
|------|--------|------|----------|
| 1 | Mint PKP | ~$5-15 (gas + mint fee) | **User** (one-time setup) |
| 2 | Deploy Lit Action | Free | N/A |
| 3 | Fund PKP wallet | Transfer gas | **User** (one-time or periodic) |
| 4 | Grant session signature | Free | N/A |
| 5 | Construct transaction | Free | N/A |
| 6 | Request Lit signature | Lit network fee* | **Optimism** (if we host) or **User** (BYOK) |
| 7 | Broadcast transaction | Gas fee (~$0.01-5) | **User** (from PKP balance) |
| 8 | Receive assets | Included in step 7 | N/A |

\* **Lit Network Pricing** (as of 2024):
- Free tier: 2000 requests/month
- Paid: Starting ~$100/month for production usage
- Enterprise: Custom pricing for high volume

**If Optimism hosts**: We pay Lit fees (~$100-500/month depending on usage)  
**If BYOK model**: User provides their own Lit API key (free tier likely sufficient for personal use)

---

## Key Architecture Questions

### 1. Policy Updates
**Problem**: Lit Actions are immutable once deployed. Updating policy requires:
- Option A: Mint new PKP (user moves funds, $5-15 fee)
- Option B: Use delegation patterns (complex, adds latency)

**Compare to**: ZeroDev session keys can be revoked/updated via onchain transaction

### 2. Session Signature Security
**Problem**: Session signature is a bearer token. If agent infrastructure is compromised:
- Attacker can use session signature until expiration
- Lit Action policy still enforces limits, but agent can drain up to those limits
- No onchain revocation mechanism (must wait for expiration)

**Compare to**: ZeroDev session keys can be revoked onchain immediately

### 3. Audibility
**Problem**: Lit Actions are JavaScript, harder to audit than Solidity
- No block explorer for Lit Action execution logs
- Policy enforcement happens offchain (trust Lit network nodes)

**Compare to**: Smart account policies are onchain, verifiable on Etherscan

### 4. Cost Transparency
**Problem**: Lit charges per-request (offchain), not visible onchain
- Users can't see Lit fees in their wallet
- Unclear who pays if we host (do we pass costs to users?)

**Compare to**: Smart account gas fees fully transparent onchain

---

## Recommendation

**Lit Protocol is best suited for:**
- ✅ Rapid prototyping (no smart contract deployment)
- ✅ Cross-chain use cases (works everywhere)
- ✅ Users who want EOA wallets (not smart accounts)

**Lit Protocol may not be ideal for:**
- ❌ Maximum security transparency (offchain policy enforcement)
- ❌ Fine-grained policy updates (requires new PKP or complex patterns)
- ❌ Immediate revocation (session signatures are bearer tokens)
- ❌ Cost transparency (offchain fees hidden from users)

**For Agent Actions**: ZeroDev's onchain session keys + spending caps provide stronger guarantees for the "agent with your money" use case, but Lit could be offered as an alternative for users who prefer EOA wallets over smart accounts.

**Hybrid approach**: Support both?
- Default: ZeroDev (strongest security, onchain enforcement)
- Advanced option: Lit Protocol (faster setup, cross-chain, EOA wallets)
