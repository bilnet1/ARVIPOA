import { useState } from "react";
import { MapPin, Home, Building, Warehouse, Trees, Navigation } from "lucide-react";

interface PropertyHotspot {
  id: string;
  type: "Land" | "House" | "Shop" | "Warehouse" | "River Access";
  location: string;
  status: "Available" | "Registered" | "Protected";
  x: number;
  y: number;
}

const communityHotspots: PropertyHotspot[] = [
  { id: "1", type: "House", location: "Accra Central", status: "Registered", x: 25, y: 30 },
  { id: "2", type: "Land", location: "Tema", status: "Available", x: 45, y: 20 },
  { id: "3", type: "Shop", location: "Kumasi", status: "Protected", x: 35, y: 60 },
  { id: "4", type: "Warehouse", location: "Takoradi", status: "Available", x: 15, y: 75 },
  { id: "5", type: "River Access", location: "Volta River", status: "Protected", x: 70, y: 40 },
  { id: "6", type: "Land", location: "Cape Coast", status: "Registered", x: 20, y: 85 },
];

const getIcon = (type: string) => {
  switch (type) {
    case "House": return <Home className="h-4 w-4" />;
    case "Shop": return <Building className="h-4 w-4" />;
    case "Warehouse": return <Warehouse className="h-4 w-4" />;
    case "River Access": return <Trees className="h-4 w-4" />;
    default: return <MapPin className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Available": return "bg-green-500";
    case "Registered": return "bg-[#D4AF37]";
    case "Protected": return "bg-blue-500";
    default: return "bg-gray-500";
  }
};

export default function InteractiveMap() {
  const [selectedHotspot, setSelectedHotspot] = useState<PropertyHotspot | null>(null);

  return (
    <section className="bg-[#001b14] text-white px-4 py-10">
      <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center">
        Interactive Property Map
      </h2>
      
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-green-900 rounded-lg overflow-hidden shadow-lg" style={{ height: "500px" }}>
          {/* Ghana Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-green-900 opacity-80"></div>
          
          {/* Property Hotspots */}
          {communityHotspots.map((hotspot) => (
            <div
              key={hotspot.id}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(hotspot.status)} rounded-full p-2 hover:scale-125 transition-all duration-300 shadow-lg`}
              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
              onClick={() => setSelectedHotspot(hotspot)}
            >
              {getIcon(hotspot.type)}
            </div>
          ))}
          
          {/* Location Labels */}
          <div className="absolute top-4 left-4 text-white">
            <Navigation className="h-5 w-5 inline mr-2" />
            Ghana Property Network
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
            <span className="text-sm">Registered</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm">Protected</span>
          </div>
        </div>
        
        {/* Property Details Panel */}
        {selectedHotspot && (
          <div className="mt-6 bg-[#002818] rounded-lg p-6 border border-[#D4AF37]/20">
            <h3 className="text-[#D4AF37] font-bold text-lg mb-2">
              {selectedHotspot.type} in {selectedHotspot.location}
            </h3>
            <p className="text-gray-300 mb-4">
              Status: <span className={`font-semibold ${
                selectedHotspot.status === 'Available' ? 'text-green-400' :
                selectedHotspot.status === 'Registered' ? 'text-[#D4AF37]' :
                'text-blue-400'
              }`}>{selectedHotspot.status}</span>
            </p>
            <div className="flex gap-2">
              <button className="bg-[#D4AF37] text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors">
                View Details
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">
                Get Directions
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}