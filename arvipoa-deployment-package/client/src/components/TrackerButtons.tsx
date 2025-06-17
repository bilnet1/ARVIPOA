export default function TrackerButtons() {
  return (
    <section className="bg-[#091815] py-10 px-4 text-white text-center">
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-6">Smart Actions</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <button className="bg-gradient-to-r from-green-700 to-[#D4AF37] px-6 py-3 rounded-full text-black font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          📍 Track Your Property
        </button>
        <button className="bg-gradient-to-r from-[#D4AF37] to-green-600 px-6 py-3 rounded-full text-black font-semibold shadow-lg hover:scale-105 transition-all duration-300">
          🏞️ Start Virtual Tour
        </button>
      </div>
    </section>
  );
}
