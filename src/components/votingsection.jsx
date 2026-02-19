import StatusBar from "./StatusBar.jsx";
import CandidateCard from "./CandidateCard.jsx";

export default function VotingSection({
  connected, userAddress, userHasVoted,
  candidates, status, loading,
  onVote, onRefresh, onConnect,
}) {
  const totalVotes = candidates.reduce((s, c) => s + c.votes, 0);
  const maxVotes   = candidates.length > 0 ? Math.max(...candidates.map(c => c.votes)) : 0;
  const short      = userAddress
    ? userAddress.slice(0, 6) + "..." + userAddress.slice(-4)
    : null;

  return (
    <section id="voting">
      <div className="voting-section">

        {/* Intro */}
        <div className="section-intro">
          <p className="section-intro-text">
            Deploy applications of the future. Get all functionality of Ethereum
            with the power of tamper-proof smart contracts on Sepolia.
          </p>
          <div className="network-badges">
            <span className="network-badge">EVM Compatible</span>
            <span className="network-badge">Sepolia Network</span>
          </div>
        </div>

        {/* Title */}
        <span className="section-label">01 — Ecosystem</span>
        <h2 className="section-title">
          Decentralized{" "}
          <span className="section-title-ghost">Voting</span>
        </h2>
        <p className="section-tagline">Immutable Governance · On-Chain Democracy</p>

        {/* Stats row */}
        {candidates.length > 0 && (
          <div className="stats-row">
            {[
              { label: "Candidates",  value: candidates.length },
              { label: "Total Votes", value: totalVotes },
              { label: "Network",     value: "Sepolia" },
            ].map(({ label, value }) => (
              <div key={label} className="stat-box">
                <p className="stat-label">{label}</p>
                <p className="stat-value">{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Status */}
        <StatusBar status={status} />

        {/* Wallet bar */}
        {connected && (
          <div className="wallet-bar">
            <span className="wallet-dot" />
            <span className="wallet-label">Connected</span>
            <span className="wallet-addr">{short}</span>
            <span className={`wallet-status ${userHasVoted ? "voted" : ""}`}>
              {userHasVoted ? "✓ Voted" : "Pending Vote"}
            </span>
          </div>
        )}

        {/* Main content */}
        {!connected ? (
          <div className="not-connected">
            <div className="not-connected-icon">⬡</div>
            <p>Wallet Not Connected</p>
            <button className="not-connected-btn" onClick={onConnect}>
              Connect MetaMask →
            </button>
          </div>

        ) : loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Fetching On-Chain Data</p>
          </div>

        ) : candidates.length === 0 ? (
          <div className="loading-state">
            <p>No Candidates Found — Check contract.js</p>
          </div>

        ) : (
          <div className="candidates-grid">
            {candidates.map((c, i) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                index={i}
                totalVotes={totalVotes}
                isWinner={c.votes === maxVotes}
                userHasVoted={userHasVoted}
                onVote={onVote}
              />
            ))}
          </div>
        )}

        {/* Refresh */}
        {connected && !loading && (
          <div className="refresh-wrap">
            <button className="refresh-btn" onClick={onRefresh}>
              ↻ Refresh Results
            </button>
          </div>
        )}

      </div>
    </section>
  );
}