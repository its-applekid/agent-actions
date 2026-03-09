import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-optimism-red">Agent Actions</span>
          </h1>
          <p className="text-2xl text-gray-300 mb-8 max-w-3xl">
            Safe DeFi for AI agents. On-chain spending limits, session keys, and smart contract enforcement.
          </p>
          <div className="flex gap-4">
            <a
              href="#comparison"
              className="px-6 py-3 bg-optimism-red text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              See Comparison
            </a>
            <a
              href="https://github.com/its-applekid/agent-actions"
              className="px-6 py-3 border border-gray-700 text-gray-300 rounded-lg font-medium hover:border-optimism-red hover:text-optimism-red transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Problem */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-6 text-optimism-red">The Problem</h2>
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-gray-300 mb-4">
            Every AI agent DeFi SDK fires transactions without safety guardrails. 
            No solution provides on-chain spending limits, transaction simulation, or user-controlled permissions.
          </p>
          <p className="text-xl text-gray-300">
            A prompt-injected agent with signing authority could drain a wallet. 
            The defense must be a <strong className="text-white">hard on-chain limit</strong> the agent cannot bypass.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-optimism-red">The Solution</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">ZeroDev Kernel</h3>
            <p className="text-gray-400">
              Smart contract wallet with session keys. Your EOA owns the account, bot gets scoped permissions.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">On-Chain Limits</h3>
            <p className="text-gray-400">
              Custom Solidity spending cap policy tracks cumulative per-token spending. Enforced at validation time.
            </p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">Web Dashboard</h3>
            <p className="text-gray-400">
              Configure limits, enable protocols, revoke access. Bot is read-only on its permissions.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-optimism-red">Architecture</h2>
        <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
          <div className="space-y-4 font-mono text-sm text-gray-300">
            <div>User (EOA) → Dashboard → ZeroDev SDK → Kernel Account (on-chain)</div>
            <div className="pl-8">├── ECDSA Validator (sudo = user)</div>
            <div className="pl-8">├── Permission Validator (regular = bot)</div>
            <div className="pl-16">│   ├── Call Policy</div>
            <div className="pl-16">│   └── SpendingCapPolicy</div>
            <div className="pl-8">└── Session Key (bot's address)</div>
            <div className="mt-4">Bot → MCP Server → ZeroDev SDK → Kernel Account → Uniswap</div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-optimism-red">Security Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-800">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">Attack Vector</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">.env File</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">AWS Secrets</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">AWS KMS</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">GOAT SDK</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">Coinbase AgentKit</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">Generic Smart Contract</th>
                <th className="px-4 py-3 text-left font-medium text-optimism-red border-b border-gray-800">Agent Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium">Direct Prompt Injection</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">⚠️ Partial</td>
                <td className="px-4 py-3">✅</td>
                <td className="px-4 py-3 font-bold text-green-400">✅ Protected</td>
              </tr>
              <tr className="border-b border-gray-800 bg-gray-900/50">
                <td className="px-4 py-3 font-medium">Indirect Prompt Injection</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">⚠️ Partial</td>
                <td className="px-4 py-3">✅</td>
                <td className="px-4 py-3 font-bold text-green-400">✅ Protected</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium">Private Key Exfiltration</td>
                <td className="px-4 py-3">🔴 Critical</td>
                <td className="px-4 py-3">❌ Critical</td>
                <td className="px-4 py-3">✅</td>
                <td className="px-4 py-3">❌ Critical</td>
                <td className="px-4 py-3">✅</td>
                <td className="px-4 py-3">✅</td>
                <td className="px-4 py-3 font-bold text-yellow-400">⚠️ Partial</td>
              </tr>
              <tr className="border-b border-gray-800 bg-gray-900/50">
                <td className="px-4 py-3 font-medium">Malicious Skill Installation</td>
                <td className="px-4 py-3">🔴 Critical</td>
                <td className="px-4 py-3">❌ Critical</td>
                <td className="px-4 py-3">⚠️</td>
                <td className="px-4 py-3">❌ Critical</td>
                <td className="px-4 py-3">⚠️</td>
                <td className="px-4 py-3">⚠️</td>
                <td className="px-4 py-3 font-bold text-yellow-400">⚠️ Partial</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium">Autonomous Exploitation</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">⚠️ Partial</td>
                <td className="px-4 py-3">✅</td>
                <td className="px-4 py-3 font-bold text-green-400">✅ Protected</td>
              </tr>
              <tr className="border-b border-gray-800 bg-gray-900/50">
                <td className="px-4 py-3 font-medium">Agent Self-Modification</td>
                <td className="px-4 py-3">🔴 Critical</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">⚠️</td>
                <td className="px-4 py-3">❌</td>
                <td className="px-4 py-3">⚠️</td>
                <td className="px-4 py-3">✅</td>
                <td className="px-4 py-3 font-bold text-green-400">✅ Protected</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium">Custodial Provider Compromise</td>
                <td className="px-4 py-3">N/A</td>
                <td className="px-4 py-3">N/A</td>
                <td className="px-4 py-3">N/A</td>
                <td className="px-4 py-3">N/A</td>
                <td className="px-4 py-3">🔴 Critical</td>
                <td className="px-4 py-3">N/A</td>
                <td className="px-4 py-3 font-bold text-green-400">✅ Self-Custody</td>
              </tr>
              <tr className="border-b border-gray-800 bg-gray-900/50">
                <td className="px-4 py-3 font-medium">Key Exposure Surface</td>
                <td className="px-4 py-3">🔴 Plaintext</td>
                <td className="px-4 py-3">❌ Plaintext</td>
                <td className="px-4 py-3 text-green-400">✅ Never exposed</td>
                <td className="px-4 py-3">❌ In-memory</td>
                <td className="px-4 py-3 text-green-400">✅ TEE</td>
                <td className="px-4 py-3 text-green-400">✅ Contract</td>
                <td className="px-4 py-3 font-bold text-yellow-400">⚠️ Session key local</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium">Guardrail Enforcement</td>
                <td className="px-4 py-3">❌ Config</td>
                <td className="px-4 py-3">❌ MCP</td>
                <td className="px-4 py-3">⚠️ IAM</td>
                <td className="px-4 py-3">❌ Config</td>
                <td className="px-4 py-3">⚠️ CDP</td>
                <td className="px-4 py-3 text-green-400">✅ Contract</td>
                <td className="px-4 py-3 font-bold text-green-400">✅ On-chain</td>
              </tr>
              <tr className="border-b border-gray-800 bg-gray-900/50">
                <td className="px-4 py-3 font-medium">Cost of Breach</td>
                <td className="px-4 py-3">🔴 Total loss</td>
                <td className="px-4 py-3">🔴 Total loss</td>
                <td className="px-4 py-3">🟡 IAM-limited</td>
                <td className="px-4 py-3">🔴 Total loss</td>
                <td className="px-4 py-3">🟢 Cap-limited</td>
                <td className="px-4 py-3">🟢 Policy-limited</td>
                <td className="px-4 py-3 font-bold text-green-400">🟢 Cap-limited</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Operational Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-optimism-red">Operational Capabilities</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-800">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">Feature</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">.env</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">AWS Secrets</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">AWS KMS</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">GOAT</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">AgentKit</th>
                <th className="px-4 py-3 text-left font-medium text-gray-300 border-b border-gray-800">Generic SC</th>
                <th className="px-4 py-3 text-left font-medium text-optimism-red border-b border-gray-800">Agent Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium">DeFi Protocol Access</td>
                <td className="px-4 py-3">If built</td>
                <td className="px-4 py-3">If built</td>
                <td className="px-4 py-3">If built</td>
                <td className="px-4 py-3 text-green-400">✅ 200+</td>
                <td className="px-4 py-3">~5</td>
                <td className="px-4 py-3">If built</td>
                <td className="px-4 py-3 font-bold text-green-400">✅ Registry</td>
              </tr>
              <tr className="border-b border-gray-800 bg-gray-900/50">
                <td className="px-4 py-3 font-medium">Setup Cost</td>
                <td className="px-4 py-3">Free</td>
                <td className="px-4 py-3">Free</td>
                <td className="px-4 py-3">$20-100</td>
                <td className="px-4 py-3">Free</td>
                <td className="px-4 py-3">Free</td>
                <td className="px-4 py-3">$20-100</td>
                <td className="px-4 py-3 font-bold">~$20-50</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium">Custodial Risk</td>
                <td className="px-4 py-3 text-green-400">✅ Self</td>
                <td className="px-4 py-3 text-green-400">✅ Self</td>
                <td className="px-4 py-3 text-green-400">✅ Self</td>
                <td className="px-4 py-3 text-green-400">✅ Self</td>
                <td className="px-4 py-3 text-red-400">🔴 Custodial</td>
                <td className="px-4 py-3 text-green-400">✅ Self</td>
                <td className="px-4 py-3 font-bold text-green-400">✅ Self-Custody</td>
              </tr>
              <tr className="border-b border-gray-800 bg-gray-900/50">
                <td className="px-4 py-3 font-medium">Vendor Lock-In</td>
                <td className="px-4 py-3">None</td>
                <td className="px-4 py-3">⚠️ AWS</td>
                <td className="px-4 py-3">⚠️ AWS</td>
                <td className="px-4 py-3">None</td>
                <td className="px-4 py-3 text-red-400">🔴 High</td>
                <td className="px-4 py-3">None</td>
                <td className="px-4 py-3 font-bold text-green-400">None</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="px-4 py-3 font-medium">Chain Support</td>
                <td className="px-4 py-3">Any EVM</td>
                <td className="px-4 py-3">Any EVM</td>
                <td className="px-4 py-3">Any EVM</td>
                <td className="px-4 py-3">30+ chains</td>
                <td className="px-4 py-3">Base + ETH</td>
                <td className="px-4 py-3">Any EVM</td>
                <td className="px-4 py-3 font-bold text-green-400">✅ Any EVM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-optimism-red">Unique Features</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">Composable Spending Caps</h3>
            <p className="text-gray-400 mb-3">
              Four modes that can be combined: USD cap (Chainlink), per-token amount cap, asset allowlist, unrestricted.
            </p>
            <p className="text-sm text-gray-500">Most restrictive rule wins.</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">Curated DeFi Registry</h3>
            <p className="text-gray-400 mb-3">
              Pre-vetted catalog of safe protocols. User opts in via dashboard. On-chain Call Policy enforces.
            </p>
            <p className="text-sm text-gray-500">Starting with Uniswap, expanding to Morpho, Polymarket, Aave.</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">Session Keys</h3>
            <p className="text-gray-400 mb-3">
              Bot gets ephemeral key with scoped permissions. User's EOA retains full control.
            </p>
            <p className="text-sm text-gray-500">Revoke access instantly from dashboard.</p>
          </div>
          
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-3 text-white">Defense-in-Depth</h3>
            <p className="text-gray-400 mb-3">
              Three layers: off-chain registry check, on-chain Call Policy, on-chain Spending Cap.
            </p>
            <p className="text-sm text-gray-500">Even fully compromised bot cannot bypass on-chain limits.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">
              Built on <span className="text-optimism-red font-medium">Optimism</span>
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/its-applekid/agent-actions"
                className="text-gray-400 hover:text-optimism-red transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="https://docs.zerodev.app/"
                className="text-gray-400 hover:text-optimism-red transition-colors"
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
