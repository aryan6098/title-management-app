import { useCallback, useState } from "react";
import { toast } from "react-toastify";

declare global {
  interface Window {
    ethereum: any;
  }
}
export const useWalletConnection = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        toast.success(`Connected to wallet: ${accounts[0].slice(0, 6)}...`);
      } catch (err) {
        setError("Failed to connect wallet");
        toast.error("Failed to connect wallet. Please try again.");
      }
    } else {
      setError("MetaMask not installed");
      toast.error("MetaMask not installed. Please install it to connect your wallet.");
    }
  }, []);




  return { walletAddress, connectWallet, error };
};
