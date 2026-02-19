import { useState, useCallback } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, SEPOLIA_CHAIN_ID } from "../contract.js";

export function useVoting() {
  const [contract,     setContract]     = useState(null);
  const [userAddress,  setUserAddress]  = useState(null);
  const [userHasVoted, setUserHasVoted] = useState(false);
  const [candidates,   setCandidates]   = useState([]);
  const [status,       setStatus]       = useState({ msg: "", type: "" });
  const [loading,      setLoading]      = useState(false);
  const [connected,    setConnected]    = useState(false);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      setStatus({ msg: "MetaMask not detected. Please install MetaMask.", type: "error" });
      return;
    }
    try {
      setStatus({ msg: "Requesting wallet access...", type: "" });
      let web3Provider = new ethers.BrowserProvider(window.ethereum);
      await web3Provider.send("eth_requestAccounts", []);

      const network = await web3Provider.getNetwork();
      const targetChainId = BigInt(parseInt(SEPOLIA_CHAIN_ID, 16));
      if (network.chainId !== targetChainId) {
        setStatus({ msg: "Switching to Sepolia Testnet...", type: "" });
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: SEPOLIA_CHAIN_ID }],
          });
          web3Provider = new ethers.BrowserProvider(window.ethereum);
        } catch {
          setStatus({ msg: "Please switch to Sepolia Testnet in MetaMask.", type: "error" });
          return;
        }
      }

      const signer   = await web3Provider.getSigner();
      const address  = await signer.getAddress();
      const deployed = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setContract(deployed);
      setUserAddress(address);
      setConnected(true);

      const voted = await deployed.hasVoted(address);
      setUserHasVoted(voted);
      await loadCandidates(deployed);
      setStatus({ msg: "", type: "" });

      window.ethereum.on("accountsChanged", () => window.location.reload());
      window.ethereum.on("chainChanged",    () => window.location.reload());
    } catch (err) {
      console.error(err);
      setStatus({ msg: "Connection failed: " + (err.message || "Unknown error"), type: "error" });
    }
  }, []);

  const loadCandidates = useCallback(async (c) => {
    setLoading(true);
    setStatus({ msg: "Loading candidates from chain...", type: "" });
    try {
      const count = await c.candidatesCount();
      const list  = [];
      for (let i = 1; i <= Number(count); i++) {
        const [name, votes] = await c.getCandidate(i);
        list.push({ id: i, name, votes: Number(votes) });
      }
      setCandidates(list);
      setStatus({ msg: "", type: "" });
    } catch (err) {
      console.error(err);
      setStatus({ msg: "Failed to load candidates. Check contract address in contract.js", type: "error" });
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (contract) await loadCandidates(contract);
  }, [contract, loadCandidates]);

  const castVote = useCallback(async (candidateId) => {
    if (!contract || userHasVoted) return;
    try {
      setStatus({ msg: "Confirm transaction in MetaMask...", type: "" });
      const tx = await contract.vote(candidateId);
      setStatus({ msg: "Transaction submitted. Mining...", type: "" });
      await tx.wait();
      setUserHasVoted(true);
      setStatus({ msg: "✓ Vote recorded on-chain!", type: "success" });
      setTimeout(() => setStatus({ msg: "", type: "" }), 4000);
      await loadCandidates(contract);
    } catch (err) {
      console.error(err);
      let msg = "Transaction failed.";
      if (err.reason)                                  msg = err.reason;
      else if (err.message?.includes("Already"))       msg = "You have already voted.";
      else if (err.message?.includes("user rejected")) msg = "Transaction rejected.";
      setStatus({ msg, type: "error" });
      setTimeout(() => setStatus({ msg: "", type: "" }), 5000);
    }
  }, [contract, userHasVoted, loadCandidates]);

  return {
    userAddress, userHasVoted, candidates,
    status, loading, connected,
    connectWallet, castVote, refresh,
  };
}