import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Maximize, 
  Minimize, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut,
  Move3D,
  Eye,
  Layers,
  Grid3X3,
  Compass
} from "lucide-react";

interface DronePosition3D {
  x: number;
  y: number;
  z: number;
  rotation: { x: number; y: number; z: number };
}

interface Visualization3DProps {
  dronePosition: { x: number; y: number; rotation: number };
  isActive: boolean;
  altitude: number;
  missions: Array<{ target: { x: number; y: number }; status: string }>;
}

export default function Drone3DVisualization({ 
  dronePosition, 
  isActive, 
  altitude,
  missions 
}: Visualization3DProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [viewAngle, setViewAngle] = useState({ x: 45, y: 0, z: 0 });
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);
  const [show3DEffects, setShow3DEffects] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const drone3DPosition: DronePosition3D = {
    x: dronePosition.x,
    y: dronePosition.y,
    z: altitude / 10, // Scale altitude for visualization
    rotation: { 
      x: 0, 
      y: dronePosition.rotation, 
      z: isActive ? Math.sin(Date.now() / 1000) * 5 : 0 // Subtle hover effect
    }
  };

  const resetView = () => {
    setViewAngle({ x: 45, y: 0, z: 0 });
    setZoom(1);
  };

  const adjustZoom = (delta: number) => {
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const generateGridLines = () => {
    const lines = [];
    const gridSize = 10;
    const gridSpacing = 10;
    
    // Horizontal lines
    for (let i = 0; i <= gridSize; i++) {
      const y = (i * gridSpacing) - (gridSize * gridSpacing / 2);
      lines.push(
        <div
          key={`h-${i}`}
          className="absolute bg-gray-600 opacity-30"
          style={{
            left: '10%',
            right: '10%',
            top: `${50 + (y / 2)}%`,
            height: '1px',
            transform: `perspective(500px) rotateX(${viewAngle.x}deg)`
          }}
        />
      );
    }
    
    // Vertical lines
    for (let i = 0; i <= gridSize; i++) {
      const x = (i * gridSpacing) - (gridSize * gridSpacing / 2);
      lines.push(
        <div
          key={`v-${i}`}
          className="absolute bg-gray-600 opacity-30"
          style={{
            top: '10%',
            bottom: '10%',
            left: `${50 + (x / 2)}%`,
            width: '1px',
            transform: `perspective(500px) rotateX(${viewAngle.x}deg)`
          }}
        />
      );
    }
    
    return lines;
  };

  const generate3DEffects = () => {
    if (!show3DEffects) return null;
    
    return (
      <>
        {/* Altitude indicators */}
        <div 
          className="absolute w-px bg-blue-400 opacity-60"
          style={{
            left: `${drone3DPosition.x}%`,
            top: `${drone3DPosition.y + 10}%`,
            height: `${drone3DPosition.z * 2}px`,
            transform: `perspective(500px) rotateX(${viewAngle.x}deg) rotateY(${viewAngle.y}deg)`
          }}
        />
        
        {/* Shadow on ground */}
        <motion.div
          className="absolute w-8 h-8 bg-black opacity-20 rounded-full blur-sm"
          style={{
            left: `${drone3DPosition.x}%`,
            top: `${drone3DPosition.y + drone3DPosition.z}%`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Mission target projections */}
        {missions.map((mission, index) => (
          <div
            key={index}
            className={`absolute w-px opacity-40 ${
              mission.status === 'active' ? 'bg-yellow-400' : 
              mission.status === 'completed' ? 'bg-green-400' : 'bg-gray-400'
            }`}
            style={{
              left: `${mission.target.x}%`,
              top: `${mission.target.y}%`,
              height: '20px',
              transform: `perspective(500px) rotateX(${viewAngle.x}deg)`
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div className={`bg-gray-800 rounded-lg transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50' : 'h-64'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h4 className="text-white font-semibold flex items-center gap-2">
          <Move3D className="w-5 h-5 text-purple-400" />
          3D Visualization
        </h4>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1 rounded transition-colors ${
              showGrid ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
            }`}
            title="Toggle Grid"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setShow3DEffects(!show3DEffects)}
            className={`p-1 rounded transition-colors ${
              show3DEffects ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400'
            }`}
            title="Toggle 3D Effects"
          >
            <Layers className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => adjustZoom(-0.2)}
            className="p-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => adjustZoom(0.2)}
            className="p-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          
          <button
            onClick={resetView}
            className="p-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            {isExpanded ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3D Viewport */}
      <div 
        ref={containerRef}
        className="relative h-full bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* Grid */}
        {showGrid && (
          <div className="absolute inset-0">
            {generateGridLines()}
          </div>
        )}

        {/* 3D Effects */}
        {generate3DEffects()}

        {/* 3D Drone */}
        <motion.div
          className="absolute"
          style={{
            left: `${drone3DPosition.x}%`,
            top: `${drone3DPosition.y}%`,
            transform: `translate(-50%, -50%) scale(${zoom}) perspective(500px) 
                       rotateX(${viewAngle.x + drone3DPosition.rotation.x}deg) 
                       rotateY(${viewAngle.y + drone3DPosition.rotation.y}deg) 
                       rotateZ(${drone3DPosition.rotation.z}deg) 
                       translateZ(${drone3DPosition.z * 3}px)`
          }}
          animate={{
            rotateZ: isActive ? [0, 360] : 0
          }}
          transition={{
            rotateZ: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        >
          {/* Drone Body */}
          <div className={`relative w-12 h-12 ${
            isActive ? 'bg-green-500' : 'bg-gray-600'
          } rounded-lg shadow-lg`}>
            {/* Propellers */}
            <motion.div 
              className="absolute -top-1 -left-1 w-3 h-3 bg-gray-400 rounded-full"
              animate={{ rotate: isActive ? 360 : 0 }}
              transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full"
              animate={{ rotate: isActive ? -360 : 0 }}
              transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-gray-400 rounded-full"
              animate={{ rotate: isActive ? -360 : 0 }}
              transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-gray-400 rounded-full"
              animate={{ rotate: isActive ? 360 : 0 }}
              transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center indicator */}
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
            </div>
          </div>

          {/* Status indicator */}
          {isActive && (
            <motion.div
              className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-green-400 rounded-full"
              animate={{ scaleY: [1, 0.5, 1], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Mission targets in 3D */}
        {missions.map((mission, index) => (
          <motion.div
            key={index}
            className={`absolute w-6 h-6 border-2 rounded-full ${
              mission.status === 'completed' ? 'border-green-500 bg-green-500/20' :
              mission.status === 'active' ? 'border-yellow-500 bg-yellow-500/20 animate-pulse' :
              'border-gray-500 bg-gray-500/20'
            }`}
            style={{
              left: `${mission.target.x}%`,
              top: `${mission.target.y}%`,
              transform: `translate(-50%, -50%) scale(${zoom}) perspective(500px) 
                         rotateX(${viewAngle.x}deg) rotateY(${viewAngle.y}deg)`
            }}
            whileHover={{ scale: 1.2 }}
          />
        ))}

        {/* Compass */}
        <div className="absolute top-4 right-4 w-16 h-16">
          <div className="relative w-full h-full bg-gray-700/50 rounded-full border border-gray-600">
            <motion.div
              className="absolute inset-2 border border-gray-500 rounded-full"
              animate={{ rotate: viewAngle.y }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-3 bg-red-500" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-1 h-3 bg-white" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="text-xs text-gray-400 text-center mt-1">N</div>
        </div>

        {/* View Controls */}
        <div className="absolute bottom-4 left-4 space-y-2">
          <div className="bg-gray-700/80 rounded-lg p-2">
            <div className="text-xs text-gray-300 mb-1">View Angle</div>
            <div className="flex gap-2">
              <input
                type="range"
                min="0"
                max="90"
                value={viewAngle.x}
                onChange={(e) => setViewAngle(prev => ({ ...prev, x: Number(e.target.value) }))}
                className="w-16 h-1 bg-gray-600 rounded-lg"
              />
              <span className="text-xs text-gray-400 w-8">{viewAngle.x}°</span>
            </div>
          </div>
          
          <div className="bg-gray-700/80 rounded-lg p-2">
            <div className="text-xs text-gray-300 mb-1">Zoom</div>
            <div className="flex gap-2">
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-16 h-1 bg-gray-600 rounded-lg"
              />
              <span className="text-xs text-gray-400 w-8">{zoom.toFixed(1)}x</span>
            </div>
          </div>
        </div>

        {/* Altitude Display */}
        <div className="absolute top-4 left-4 bg-gray-700/80 rounded-lg p-2">
          <div className="text-xs text-gray-400">Altitude</div>
          <div className="text-lg font-bold text-white">{altitude}m</div>
          <div className="w-12 h-1 bg-gray-600 rounded mt-1">
            <motion.div
              className="h-1 bg-blue-500 rounded"
              style={{ width: `${Math.min(100, (altitude / 200) * 100)}%` }}
              animate={{ width: `${Math.min(100, (altitude / 200) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-2 bg-gray-900 border-t border-gray-700 flex justify-between items-center text-xs">
        <div className="flex items-center gap-4 text-gray-400">
          <span>View: {viewAngle.x}° / {viewAngle.y}°</span>
          <span>Zoom: {zoom.toFixed(1)}x</span>
          <span>Grid: {showGrid ? 'ON' : 'OFF'}</span>
        </div>
        
        <div className={`flex items-center gap-1 ${
          isActive ? 'text-green-400' : 'text-gray-500'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
          }`} />
          <span>{isActive ? '3D TRACKING' : 'STANDBY'}</span>
        </div>
      </div>
    </div>
  );
}