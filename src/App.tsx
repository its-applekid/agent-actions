import './App.css'

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
            <a
              href="https://github.com/its-applekid/agent-actions"
              className="text-terminal-text hover:text-red transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
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
            On-chain spending limits, session keys, and smart contract enforcement.
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
            <a
              href="https://github.com/its-applekid/agent-actions"
              className="px-6 py-3 border border-terminal-border text-terminal-text hover:border-red hover:text-red transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Problem */}
        <section className="max-w-4xl mx-auto mb-24">
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
                <h4 className="text-lg font-mono text-yellow mb-3">ZeroDev Kernel</h4>
                <p className="text-terminal-text text-sm leading-relaxed">
                  Smart contract wallet with session keys. Your EOA owns the account,
                  bot gets scoped permissions.
                </p>
              </div>
            </div>
            <div className="terminal-window">
              <div className="p-6">
                <h4 className="text-lg font-mono text-aqua mb-3">On-Chain Limits</h4>
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

        {/* Architecture */}
        <section className="max-w-4xl mx-auto mb-24">
          <h3 className="text-3xl font-display mb-8 text-terminal-cream">
            ARCHITECTURE
          </h3>
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot bg-red"></div>
              <div className="terminal-dot bg-yellow"></div>
              <div className="terminal-dot bg-green"></div>
              <span className="ml-2 text-sm text-terminal-muted">architecture.txt</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <pre className="text-terminal-text leading-relaxed">
{`User (EOA)
  ↓
  Dashboard
  ↓
  ZeroDev SDK
  ↓
  Kernel Account (on-chain)
    ├── ECDSA Validator (sudo = user)
    ├── Permission Validator (regular = bot)
    │   ├── Call Policy
    │   └── SpendingCapPolicy
    └── Session Key (bot's address)

Bot
  ↓
  MCP Server
  ↓
  ZeroDev SDK
  ↓
  Kernel Account
  ↓
  Uniswap`}
              </pre>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section id="comparison" className="max-w-7xl mx-auto mb-24">
          <h3 className="text-3xl font-display mb-8 text-terminal-cream">
            SECURITY_COMPARISON
          </h3>
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
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">AWS Secrets</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">AWS KMS</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">GOAT</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">AgentKit</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">Generic SC</th>
                  <th className="px-4 py-3 text-left font-mono text-red">Agent Actions</th>
                </tr>
              </thead>
              <tbody className="text-terminal-text">
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Direct Prompt Injection</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3 text-yellow">⚠️</td>
                  <td className="px-4 py-3 text-green">✅</td>
                  <td className="px-4 py-3 text-green font-bold">✅</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Indirect Prompt Injection</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3 text-yellow">⚠️</td>
                  <td className="px-4 py-3 text-green">✅</td>
                  <td className="px-4 py-3 text-green font-bold">✅</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Private Key Exfiltration</td>
                  <td className="px-4 py-3 text-red">🔴</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3 text-green">✅</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3 text-green">✅</td>
                  <td className="px-4 py-3 text-green">✅</td>
                  <td className="px-4 py-3 text-green font-bold">✅</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Autonomous Exploitation</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3 text-yellow">⚠️</td>
                  <td className="px-4 py-3 text-green">✅</td>
                  <td className="px-4 py-3 text-green font-bold">✅</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Agent Self-Modification</td>
                  <td className="px-4 py-3 text-red">🔴</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3 text-yellow">⚠️</td>
                  <td className="px-4 py-3">❌</td>
                  <td className="px-4 py-3 text-yellow">⚠️</td>
                  <td className="px-4 py-3 text-green">✅</td>
                  <td className="px-4 py-3 text-green font-bold">✅</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Custodial Provider Compromise</td>
                  <td className="px-4 py-3 text-terminal-muted">N/A</td>
                  <td className="px-4 py-3 text-terminal-muted">N/A</td>
                  <td className="px-4 py-3 text-terminal-muted">N/A</td>
                  <td className="px-4 py-3 text-terminal-muted">N/A</td>
                  <td className="px-4 py-3 text-red">🔴</td>
                  <td className="px-4 py-3 text-terminal-muted">N/A</td>
                  <td className="px-4 py-3 text-green font-bold">✅</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Guardrail Enforcement</td>
                  <td className="px-4 py-3">Config</td>
                  <td className="px-4 py-3">MCP</td>
                  <td className="px-4 py-3">IAM</td>
                  <td className="px-4 py-3">Config</td>
                  <td className="px-4 py-3">CDP</td>
                  <td className="px-4 py-3 text-green">Contract</td>
                  <td className="px-4 py-3 text-green font-bold">On-chain</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Cost of Breach</td>
                  <td className="px-4 py-3 text-red">Total loss</td>
                  <td className="px-4 py-3 text-red">Total loss</td>
                  <td className="px-4 py-3 text-yellow">IAM-limited</td>
                  <td className="px-4 py-3 text-red">Total loss</td>
                  <td className="px-4 py-3 text-green">Cap-limited</td>
                  <td className="px-4 py-3 text-green">Policy-limited</td>
                  <td className="px-4 py-3 text-green font-bold">Cap-limited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Operational */}
        <section className="max-w-7xl mx-auto mb-24">
          <h3 className="text-3xl font-display mb-8 text-terminal-cream">
            OPERATIONAL_CAPABILITIES
          </h3>
          <div className="terminal-window overflow-x-auto">
            <div className="terminal-header">
              <div className="terminal-dot bg-red"></div>
              <div className="terminal-dot bg-yellow"></div>
              <div className="terminal-dot bg-green"></div>
              <span className="ml-2 text-sm text-terminal-muted">capabilities.csv</span>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-terminal-border">
                  <th className="px-4 py-3 text-left font-mono text-terminal-cream">Feature</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">.env</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">AWS Secrets</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">AWS KMS</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">GOAT</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">AgentKit</th>
                  <th className="px-4 py-3 text-left font-mono text-terminal-muted">Generic SC</th>
                  <th className="px-4 py-3 text-left font-mono text-red">Agent Actions</th>
                </tr>
              </thead>
              <tbody className="text-terminal-text">
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">DeFi Protocol Access</td>
                  <td className="px-4 py-3 text-terminal-muted">If built</td>
                  <td className="px-4 py-3 text-terminal-muted">If built</td>
                  <td className="px-4 py-3 text-terminal-muted">If built</td>
                  <td className="px-4 py-3 text-green">200+</td>
                  <td className="px-4 py-3">~5</td>
                  <td className="px-4 py-3 text-terminal-muted">If built</td>
                  <td className="px-4 py-3 text-green font-bold">Registry</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Setup Cost</td>
                  <td className="px-4 py-3">Free</td>
                  <td className="px-4 py-3">Free</td>
                  <td className="px-4 py-3">$20-100</td>
                  <td className="px-4 py-3">Free</td>
                  <td className="px-4 py-3">Free</td>
                  <td className="px-4 py-3">$20-100</td>
                  <td className="px-4 py-3 font-bold">~$20-50</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Custodial Risk</td>
                  <td className="px-4 py-3 text-green">Self</td>
                  <td className="px-4 py-3 text-green">Self</td>
                  <td className="px-4 py-3 text-green">Self</td>
                  <td className="px-4 py-3 text-green">Self</td>
                  <td className="px-4 py-3 text-red">Custodial</td>
                  <td className="px-4 py-3 text-green">Self</td>
                  <td className="px-4 py-3 text-green font-bold">Self-Custody</td>
                </tr>
                <tr className="border-b border-terminal-border/50">
                  <td className="px-4 py-3">Vendor Lock-In</td>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3 text-yellow">AWS</td>
                  <td className="px-4 py-3 text-yellow">AWS</td>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3 text-red">High</td>
                  <td className="px-4 py-3">None</td>
                  <td className="px-4 py-3 text-green font-bold">None</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Chain Support</td>
                  <td className="px-4 py-3">Any EVM</td>
                  <td className="px-4 py-3">Any EVM</td>
                  <td className="px-4 py-3">Any EVM</td>
                  <td className="px-4 py-3">30+ chains</td>
                  <td className="px-4 py-3">Base + ETH</td>
                  <td className="px-4 py-3">Any EVM</td>
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
                  Four modes that can be combined: USD cap (Chainlink), per-token amount cap,
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
                  On-chain Call Policy enforces.
                </p>
                <p className="text-terminal-muted text-xs">Starting with Uniswap, expanding to Morpho, Polymarket, Aave.</p>
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
                  Three layers: off-chain registry check, on-chain Call Policy, on-chain Spending Cap.
                </p>
                <p className="text-terminal-muted text-xs">Even fully compromised bot cannot bypass on-chain limits.</p>
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
              Built on <span className="text-red">Optimism</span>
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/its-applekid/agent-actions"
                className="text-terminal-muted hover:text-red transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://docs.zerodev.app/"
                className="text-terminal-muted hover:text-red transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                ZeroDev Docs
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
