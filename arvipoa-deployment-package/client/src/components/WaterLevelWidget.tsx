export default function WaterLevelWidget() {
  return (
    <div className="bg-blue-950 text-white p-4 rounded-xl shadow-lg w-full md:w-64">
      <h2 className="text-sm font-semibold text-cyan-300 text-center">River Level Monitor</h2>
      <div className="mt-4 relative h-24 w-full bg-blue-200 rounded overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-full bg-blue-500 animate-pulse"
          style={{ height: '60%' }} // Change % to simulate level
        />
      </div>
      <div className="text-center mt-2 text-sm">
        Status: <span className="text-yellow-400 font-bold">Rising</span><br />
        Location: <span className="text-gray-300">River Volta – Madina</span>
      </div>
    </div>
  );
}
