import './App.css'
import { SecurityCell } from './components/SecurityCell'

function App() {
  return (
    <div className="min-h-screen bg-terminal-bg">
      {/* Header */}
      <header className="border-b border-terminal-border">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-display text-red terminal-glow">
            AGENT_ACTIONS
          </h1>
          <div className="flex gap-6">
            <a
              href="#comparison"
              className="text-terminal-text hover:text-red transition-colors"
            >
              Security
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-5xl font-display mb-6 text-terminal-cream">
            Safe DeFi for AI agents
          </h2>
          <p className="text-xl text-terminal-text mb-8 leading-relaxed">
            Onchain spending limits, session keys, and smart contract enforcement.
            <br />
            Even a compromised agent can't drain your wallet.
          </p>
          <div className="flex gap-4">
            <a
              href="#comparison"
              className="px-6 py-3 bg-red text-terminal-bg font-mono font-medium hover:opacity-90 transition-opacity"
            >
              See Comparison →
            </a>
          </div>
        </div>

        {/* Problem */}
        <section className="max-w-4xl mx-auto mb-24">
          <h3 className="text-3xl font-display mb-8 text-terminal-cream">
            THE_PROBLEM
          </h3>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot bg-red"></div>
              <div className="terminal-dot bg-yellow"></div>
              <div className="terminal-dot bg-green"></div>
              <span className="ml-2 text-sm text-terminal-muted">problem.txt</span>
            </div>
            <div className="p-6">
              <p className="text-terminal-text mb-4">
                <span className="text-red">$</span> AI agents with wallet access keep getting hacked:
              </p>
              <ul className="list-none space-y-2 pl-4 text-terminal-text">
                <li><span className="text-yellow">•</span> Lobstar Wilde: $450K to random reply guy</li>
                <li><span className="text-yellow">•</span> AIXBT: $106K via dashboard compromise</li>
                <li><span className="text-yellow">•</span> Freysa: $47K prompt injection</li>
                <li><span className="text-yellow">•</span> 2025 total crypto theft: $3.4B</li>
              </ul>
              <p className="text-terminal-muted mt-6 text-sm italic">
                OpenAI: "Prompt injection is a frontier security challenge that may never be fully solved"
              </p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="max-w-4xl mx-auto mb-24">
          <h3 className="text-3xl font-display mb-8 text-terminal-cream">
            THE_SOLUTION
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="terminal-window">
              <div className="p-6">
                <h4 className="text-lg font-mono text-yellow mb-3">Smart Account</h4>
                <p className="text-terminal-text text-sm leading-relaxed">
                  Smart contract wallet with session keys. Your EOA owns the account,
                  bot gets scoped permissions.
                </p>
              </div>
            </div>
            <div className="terminal-window">
              <div className="p-6">
                <h4 className="text-lg font-mono text-aqua mb-3">Onchain Limits</h4>
                <p className="text-terminal-text text-sm leading-relaxed">
                  Custom Solidity spending cap policy tracks cumulative per-token spending.
                  Enforced at validation time.
                </p>
              </div>
            </div>
            <div className="terminal-window">
              <div className="p-6">
                <h4 className="text-lg font-mono text-purple mb-3">Web Dashboard</h4>
                <p className="text-terminal-text text-sm leading-relaxed">
                  Configure limits, enable protocols, revoke access. Bot is read-only
                  on its permissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="max-w-7xl mx-auto mb-24">
          <h3 className="text-3xl font-display mb-8 text-terminal-cream">
            SECURITY_COMPARISON
          </h3>
          <p className="text-terminal-muted text-sm mb-6 px-4">
            💡 <span className="text-terminal-text">Hover or tap any underlined cell</span> for detailed security explanations
          </p>
          <div className="terminal-window overflow-x-auto">
            <div className="terminal-header">
              <div className="terminal-dot bg-red"></div>
              <div className="terminal-dot bg-yellow"></div>
              <div className="terminal-dot bg-green"></div>
              <span className="ml-2 text-sm text-terminal-muted">comparison.csv</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-terminal-border">
                  <th className="px-4 py-3 text-left font-mono text-terminal-cream">Attack Vector</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">.env</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">AWS KMS</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">GOAT</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">AgentKit</th>
                  <th className="px-4 py-3 text-left font-mono text-red">Agent Actions</th>
                </tr>
              </thead>
              <tbody className="text-terminal-text">
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Prompt Injection</td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="No protection - agent has full signing authority with zero guardrails against malicious instructions"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="No protection - KMS signs whatever the agent requests via API, regardless of prompt source"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="No protection - agent controls wallet directly with no spending limits or prompt filtering"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="⚠️" 
                      detail="Partial - spending caps limit damage but agent can still be manipulated within allowed permissions"
                      severity="yellow"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="⚠️" 
                      detail="Partial - onchain spending caps limit damage but agent can still be manipulated within allowed permissions; similar attack surface to AgentKit"
                      severity="yellow"
                    />
                  </td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Private Key Exfiltration</td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="Critical risk - plaintext file readable by any process or malicious npm package"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="✅" 
                      detail="Protected - private key never leaves Hardware Security Module, signing is remote"
                      severity="green"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="Critical risk - private key accessible in process memory with no additional isolation or protection"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="✅" 
                      detail="Protected - key in TEE (Trusted Execution Environment), hardware-isolated from agent process"
                      severity="green"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value={<span className="font-bold">✅</span>} 
                      detail="Protected - session key has limited scope; if stolen, attacker is restricted to permissions defined in Call Policy and spending caps"
                      severity="green"
                    />
                  </td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Autonomous Exploitation</td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="No protection - agent can interact with any smart contract including malicious ones"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="No protection - KMS signs any valid transaction regardless of destination"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="No protection - access to 60+ integrated protocols and services with zero restrictions"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="⚠️" 
                      detail="Partial - limited to CDP-approved protocols; agent can still be exploited within allowed protocols"
                      severity="yellow"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="⚠️" 
                      detail="Partial - curated DeFi registry limits protocols; agent can still be exploited within allowed protocols; advantage: onchain enforcement vs CDP off-chain"
                      severity="yellow"
                    />
                  </td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Agent Self-Modification</td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="Critical risk - agent can edit config file to remove all spending limits and guardrails"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="⚠️" 
                      detail="Partial protection - IAM policy limits permission changes, but IAM itself could be compromised"
                      severity="yellow"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="❌" 
                      detail="Vulnerable - agent can edit configuration to remove all guardrails and allowlists"
                      severity="red"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="⚠️" 
                      detail="Partial - CDP policy framework is external to agent BUT Coinbase controls what policies are available; users cannot configure their own spending limits"
                      severity="yellow"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value={<span className="font-bold">✅</span>} 
                      detail="Protected - bot's session key has restricted permissions and cannot modify its own policy; owner's sudo key controls policy changes"
                      severity="green"
                    />
                  </td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Service Provider Control</td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="N/A" 
                      detail="N/A - self-custody, user controls private key directly"
                      severity="neutral"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="N/A" 
                      detail="N/A - self-custody, keys in user's AWS HSM"
                      severity="neutral"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="N/A" 
                      detail="N/A - self-custody, no third-party custodian"
                      severity="neutral"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="⚠️" 
                      detail="Policy control - Coinbase decides what the bot can do, not the user; provider controls spending limits and protocol access centrally"
                      severity="yellow"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value={<span className="font-bold">✅</span>} 
                      detail="True self-custody - user's EOA owns smart account onchain; no middleman, works independently of any service provider"
                      severity="green"
                    />
                  </td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Guardrail Enforcement</td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="Config" 
                      detail="Config file - agent can modify to remove limits, no external enforcement"
                      severity="neutral"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="IAM" 
                      detail="IAM policy enforces - external to agent but requires deep AWS expertise to configure properly"
                      severity="neutral"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="Config" 
                      detail="Config file - no enforcement mechanism, purely developer responsibility"
                      severity="neutral"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value="CDP" 
                      detail="CDP enforces centrally-controlled policy; Coinbase decides limits, not users; can block transactions"
                      severity="neutral"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <SecurityCell 
                      value={<span className="font-bold">Onchain</span>} 
                      detail="Onchain enforcement - user-owned smart account with Call Policy + spending caps; works independently of any service provider"
                      severity="green"
                    />
                  </td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Custodial Risk</td>
                  <td className="px-4 py-3 text-green">Self</td>
                  <td className="px-4 py-3 text-green">Self</td>
                  <td className="px-4 py-3 text-green">Self</td>
                  <td className="px-4 py-3 text-yellow">Service-Dependent</td>
                  <td className="px-4 py-3 text-green font-bold">Self</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Vendor Lock-In</td>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3 text-yellow">AWS</td>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3 text-red">High</td>
                  <td className="px-4 py-3 text-green font-bold">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Chain Support</td>
                  <td className="px-4 py-3">Any EVM</td>
                  <td className="px-4 py-3">Any EVM</td>
                  <td className="px-4 py-3">Multi-chain</td>
                  <td className="px-4 py-3">Base + ETH</td>
                  <td className="px-4 py-3 text-green font-bold">Any EVM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-4xl mx-auto mb-24">
          <h3 className="text-3xl font-display mb-8 text-terminal-cream">
            UNIQUE_FEATURES
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="terminal-window">
              <div className="p-6">
                <h4 className="text-lg font-mono text-red mb-3">Composable Spending Caps</h4>
                <p className="text-terminal-text text-sm leading-relaxed mb-3">
                  Four modes that can be combined: USD cap, per-token amount cap,
                  asset allowlist, unrestricted.
                </p>
                <p className="text-terminal-muted text-xs">Most restrictive rule wins.</p>
              </div>
            </div>
            
            <div className="terminal-window">
              <div className="p-6">
                <h4 className="text-lg font-mono text-yellow mb-3">Curated DeFi Registry</h4>
                <p className="text-terminal-text text-sm leading-relaxed mb-3">
                  Pre-vetted catalog of safe protocols. User opts in via dashboard.
                  Onchain Call Policy enforces.
                </p>
                <p className="text-terminal-muted text-xs">Wraps <a href="https://actions.optimism.io" target="_blank" rel="noopener noreferrer" className="text-aqua hover:text-purple underline">Actions SDK</a> — Aave, Morpho, and Uniswap support on Day One.</p>
              </div>
            </div>
            
            <div className="terminal-window">
              <div className="p-6">
                <h4 className="text-lg font-mono text-aqua mb-3">Session Keys + Pluggable Storage</h4>
                <p className="text-terminal-text text-sm leading-relaxed mb-3">
                  Bot gets ephemeral key with scoped permissions. User's EOA retains full control.
                  Key storage is configurable: local keychain, AWS KMS, HSM, or custom signer.
                </p>
                <p className="text-terminal-muted text-xs">Revoke access instantly from dashboard.</p>
              </div>
            </div>
            
            <div className="terminal-window">
              <div className="p-6">
                <h4 className="text-lg font-mono text-purple mb-3">Defense-in-Depth</h4>
                <p className="text-terminal-text text-sm leading-relaxed mb-3">
                  Three layers: off-chain registry check, onchain Call Policy, onchain Spending Cap.
                </p>
                <p className="text-terminal-muted text-xs">Even fully compromised bot cannot bypass onchain limits.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-terminal-border mt-24">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center text-sm">
            <p className="text-terminal-muted">
              {/* Footer content intentionally minimal */}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
