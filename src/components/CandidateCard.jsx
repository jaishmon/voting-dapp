import { useEffect, useRef } from "react";

export default function CandidateCard({
  candidate, index, totalVotes, isWinner, userHasVoted, onVote,
}) {
  const barRef = useRef(null);
  const pct = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;

  useEffect(() => {
    const t = setTimeout(() => {
      if (barRef.current) barRef.current.style.width = pct + "%";
    }, 300 + index * 100);
    return () => clearTimeout(t);
  }, [pct, index]);

  const stagger = `s${Math.min(index, 5)}`;
  const cardClass = [
    "candidate-card",
    stagger,
    isWinner && totalVotes > 0 ? "is-winner" : "",
    userHasVoted ? "has-voted" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={cardClass}>

      {/* Top row */}
      <div className="card-top">
        <span className="card-num">{String(candidate.id).padStart(2, "0")}</span>
        {isWinner && totalVotes > 0 ? (
          <span className="winner-badge">Leading</span>
        ) : (
          <div className="card-dot">
            <div className="card-dot-inner" />
          </div>
        )}
      </div>

      {/* Name */}
      <div className={`card-name ${isWinner && totalVotes > 0 ? "shimmer" : ""}`}>
        {candidate.name}
      </div>
      <div className="card-sub">Candidate</div>

      {/* Votes */}
      <div className="card-votes-label">Votes</div>
      <div className="card-votes-num">{candidate.votes}</div>
      <div className="card-pct">{pct}%</div>

      {/* Bar */}
      <div className="vote-bar-track">
        <div
          ref={barRef}
          className={`vote-bar-fill ${isWinner && totalVotes > 0 ? "accent" : "plain"}`}
        />
      </div>

      {/* Spacer pushes button to bottom */}
      <div className="card-spacer" />

      {/* Button */}
      <button
        onClick={() => !userHasVoted && onVote(candidate.id)}
        disabled={userHasVoted}
        className={`vote-btn ${userHasVoted ? "voted" : ""}`}
      >
        {userHasVoted ? "✓  Vote Cast" : "Cast Vote →"}
      </button>
    </div>
  );
}