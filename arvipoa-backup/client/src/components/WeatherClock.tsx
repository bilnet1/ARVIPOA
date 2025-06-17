import { useEffect, useState } from "react";

export default function WeatherClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  const formattedDate = time.toDateString();

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl shadow-lg w-full md:w-64">
      <div className="text-center">
        <h2 className="text-sm font-semibold text-gold-500">Live Clock</h2>
        <p className="text-lg font-bold">{formattedTime}</p>
        <p className="text-xs text-gray-400">{formattedDate}</p>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-sm font-semibold text-gold-500">Weather (Static)</h3>
        <p className="text-sm">Madina, Accra</p>
        <p className="text-2xl font-bold mt-1">29°C ☀️</p>
      </div>
    </div>
  );
}
