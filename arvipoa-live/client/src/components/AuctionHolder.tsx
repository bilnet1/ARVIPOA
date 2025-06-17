import { useEffect, useState } from "react";

export default function AuctionHolder() {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  const [bid, setBid] = useState(12500);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <section className="px-4 py-10 bg-[#0e1e1c] text-white">
      <h2 className="text-2xl font-bold text-gold-400 text-center mb-6">Ongoing Auction</h2>

      <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-6 text-center shadow-lg">
        <h3 className="text-xl font-semibold mb-2">🔥 Prime Land - Madina</h3>
        <p className="text-sm text-gray-300 mb-4">Current Bid:</p>
        <div className="text-3xl font-bold text-gold-400 mb-2">GHC {bid.toLocaleString()}</div>
        <p className="mb-4 text-sm">Time left: <span className="font-mono">{formatTime(timeLeft)}</span></p>
        <button
          className="bg-gold-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-gold-400 transition"
          onClick={() => setBid(bid + 500)}
        >
          Place Bid + GHC 500
        </button>
      </div>
    </section>
  );
}
