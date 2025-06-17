const services = [
  { title: "Legal & Enforcement", icon: "⚖️" },
  { title: "Market", icon: "🛒" },
  { title: "RBFS Centres", icon: "⛪️" },
  { title: "Health & Wellbeing", icon: "🏥" },
  { title: "Auto & Maintenance", icon: "🚗" },
  { title: "Education (Wishdorm)", icon: "🎓" },
];

export default function PlacesServices() {
  return (
    <section className="px-4 py-10 bg-[#0b1b17] text-white">
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center">
        Explore Places & Services
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-gray-800 rounded-xl p-4 hover:scale-105 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow"
          >
            <div className="text-4xl mb-2">{service.icon}</div>
            <p className="text-sm text-center">{service.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
