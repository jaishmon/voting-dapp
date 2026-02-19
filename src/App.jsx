import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import VotingSection from "./components/VotingSection.jsx";
import { useVoting } from "./hooks/useVoting.js";

export default function App() {
  const {
    userAddress, userHasVoted,
    candidates, status, loading, connected,
    connectWallet, castVote, refresh,
  } = useVoting();

  return (
    <div>
      <Navbar
        connected={connected}
        userAddress={userAddress}
        onConnect={connectWallet}
      />

      <Hero />

      <VotingSection
        connected={connected}
        userAddress={userAddress}
        userHasVoted={userHasVoted}
        candidates={candidates}
        status={status}
        loading={loading}
        onVote={castVote}
        onRefresh={refresh}
        onConnect={connectWallet}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            MOSKIN <span className="logo-dot" style={{ background: "#e63946" }} />
          </div>
          <p className="footer-copy">
            © 2026 Decentralized Voting DApp · Built on Ethereum Sepolia
          </p>
          <div className="footer-network">
            <span className="footer-network-dot" />
            Sepolia Testnet
          </div>
        </div>
      </footer>
    </div>
  );
}