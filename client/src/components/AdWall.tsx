const ads = [
  {
    title: "Smart Boundary Pillar",
    description: "Now available for border monitoring, intrusion detection & fire alerts.",
    image: "https://via.placeholder.com/300x150?text=Smart+Pillar",
  },
  {
    title: "River Defense Barricade",
    description: "Secure riverside zones with sensor-enhanced flood protection.",
    image: "https://via.placeholder.com/300x150?text=River+Barricade",
  },
  {
    title: "Virtual Address Solution",
    description: "Get a digital mailbox, property ID, and map tracking built in.",
    image: "https://via.placeholder.com/300x150?text=Virtual+Address",
  },
];

export default function AdWall() {
  return (
    <section className="bg-[#0e1f1d] py-10 px-4 text-white">
      <h2 className="text-2xl font-bold text-gold-400 text-center mb-6">Sponsored Ad Wall</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {ads.map((ad, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition">
            <img src={ad.image} alt={ad.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-bold">{ad.title}</h3>
              <p className="text-sm text-gray-300">{ad.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
