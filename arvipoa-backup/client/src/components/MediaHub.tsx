import { useState } from "react";

const platforms = [
  { name: "Netflix", icon: "🎬", preview: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { name: "YouTube", icon: "▶️", preview: "https://www.w3schools.com/html/movie.mp4" },
  { name: "Spotify", icon: "🎧", preview: "" },
  { name: "Showmax", icon: "📺", preview: "" },
];

export default function MediaHub() {
  const [active, setActive] = useState(platforms[0]);

  return (
    <section className="bg-[#101b1a] text-white px-4 py-10">
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-4 text-center">Media Hub</h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => setActive(platform)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              active.name === platform.name
                ? "bg-[#D4AF37] text-black"
                : "bg-gray-700 hover:bg-[#D4AF37] hover:text-black"
            }`}
          >
            {platform.icon} {platform.name}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto bg-black rounded-lg p-4 shadow-lg">
        {active.preview ? (
          <video controls className="w-full rounded">
            <source src={active.preview} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>No preview available for {active.name}</p>
          </div>
        )}
      </div>
    </section>
  );
}
