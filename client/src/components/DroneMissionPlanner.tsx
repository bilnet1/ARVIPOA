import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  MapPin, 
  Clock, 
  Target, 
  Eye, 
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Trash2,
  Play,
  Route,
  Zap,
  Settings,
  Edit
} from "lucide-react";

interface MissionWaypoint {
  id: string;
  x: number;
  y: number;
  altitude: number;
  action: "hover" | "scan" | "photo" | "thermal";
  duration: number;
}

interface PlannedMission {
  id: string;
  name: string;
  waypoints: MissionWaypoint[];
  estimatedDuration: number;
  priority: "low" | "medium" | "high" | "critical";
  status: "draft" | "ready" | "executing" | "completed";
}

interface MissionPlannerProps {
  onMissionCreate: (mission: PlannedMission) => void;
  isActive: boolean;
}

export default function DroneMissionPlanner({ onMissionCreate, isActive }: MissionPlannerProps) {
  const [missions, setMissions] = useState<PlannedMission[]>([]);
  const [currentMission, setCurrentMission] = useState<PlannedMission | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedAction, setSelectedAction] = useState<MissionWaypoint['action']>("hover");

  const actionTypes = [
    { type: "hover" as const, icon: Target, color: "bg-blue-500", label: "Hover & Observe" },
    { type: "scan" as const, icon: Eye, color: "bg-purple-500", label: "Area Scan" },
    { type: "photo" as const, icon: MapPin, color: "bg-green-500", label: "Photo Capture" },
    { type: "thermal" as const, icon: Thermometer, color: "bg-red-500", label: "Thermal Scan" }
  ];

  const createNewMission = () => {
    const newMission: PlannedMission = {
      id: `PLAN-${Date.now()}`,
      name: `Mission ${missions.length + 1}`,
      waypoints: [],
      estimatedDuration: 0,
      priority: "medium",
      status: "draft"
    };
    setCurrentMission(newMission);
    setIsCreating(true);
  };

  const addWaypoint = (x: number, y: number) => {
    if (!currentMission || !isCreating) return;

    const newWaypoint: MissionWaypoint = {
      id: `WP-${Date.now()}`,
      x,
      y,
      altitude: 100 + Math.random() * 50,
      action: selectedAction,
      duration: selectedAction === "hover" ? 30 : selectedAction === "thermal" ? 45 : 20
    };

    setCurrentMission(prev => prev ? {
      ...prev,
      waypoints: [...prev.waypoints, newWaypoint],
      estimatedDuration: prev.estimatedDuration + newWaypoint.duration
    } : null);
  };

  const saveMission = () => {
    if (!currentMission || currentMission.waypoints.length === 0) return;

    const completedMission = {
      ...currentMission,
      status: "ready" as const
    };

    setMissions(prev => [...prev, completedMission]);
    onMissionCreate(completedMission);
    setCurrentMission(null);
    setIsCreating(false);
  };

  const deleteMission = (missionId: string) => {
    setMissions(prev => prev.filter(m => m.id !== missionId));
  };

  const executePrebuiltMission = (mission: PlannedMission) => {
    setMissions(prev => prev.map(m => 
      m.id === mission.id ? { ...m, status: "executing" } : m
    ));
    onMissionCreate({ ...mission, status: "executing" });
  };

  const getPriorityColor = (priority: PlannedMission['priority']) => {
    switch (priority) {
      case "critical": return "bg-red-900 text-red-200 border-red-700";
      case "high": return "bg-orange-900 text-orange-200 border-orange-700";
      case "medium": return "bg-yellow-900 text-yellow-200 border-yellow-700";
      case "low": return "bg-green-900 text-green-200 border-green-700";
    }
  };

  const getActionIcon = (action: MissionWaypoint['action']) => {
    const actionType = actionTypes.find(a => a.type === action);
    return actionType ? actionType.icon : Target;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-white font-semibold flex items-center gap-2">
          <Route className="w-5 h-5 text-purple-400" />
          Mission Planner
        </h4>
        
        <button
          onClick={createNewMission}
          disabled={isCreating}
          className={`px-3 py-1 rounded text-sm font-semibold transition-colors flex items-center gap-1 ${
            isCreating 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          <Plus className="w-3 h-3" />
          New Mission
        </button>
      </div>

      {/* Mission Creation Interface */}
      <AnimatePresence>
        {isCreating && currentMission && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 p-4 bg-gray-700 rounded-lg border border-purple-600"
          >
            <div className="flex justify-between items-center mb-3">
              <input
                type="text"
                value={currentMission.name}
                onChange={(e) => setCurrentMission(prev => prev ? { ...prev, name: e.target.value } : null)}
                className="bg-gray-600 text-white px-3 py-1 rounded text-sm font-semibold"
                placeholder="Mission Name"
              />
              
              <select
                value={currentMission.priority}
                onChange={(e) => setCurrentMission(prev => prev ? { 
                  ...prev, 
                  priority: e.target.value as PlannedMission['priority'] 
                } : null)}
                className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Action Selection */}
            <div className="mb-3">
              <div className="text-xs text-gray-400 mb-2">Select Action for Next Waypoint:</div>
              <div className="grid grid-cols-2 gap-2">
                {actionTypes.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={action.type}
                      onClick={() => setSelectedAction(action.type)}
                      className={`p-2 rounded text-xs transition-all ${
                        selectedAction === action.type
                          ? `${action.color} text-white`
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      <IconComponent className="w-3 h-3 mx-auto mb-1" />
                      {action.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Waypoint List */}
            {currentMission.waypoints.length > 0 && (
              <div className="mb-3">
                <div className="text-xs text-gray-400 mb-2">
                  Waypoints ({currentMission.waypoints.length}) - Est. {currentMission.estimatedDuration}s
                </div>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                  {currentMission.waypoints.map((waypoint, index) => {
                    const ActionIcon = getActionIcon(waypoint.action);
                    return (
                      <div key={waypoint.id} className="flex items-center gap-2 text-xs bg-gray-600 p-2 rounded">
                        <span className="text-gray-400">#{index + 1}</span>
                        <ActionIcon className="w-3 h-3 text-blue-400" />
                        <span className="text-white flex-1">
                          {waypoint.action} at ({Math.round(waypoint.x)}, {Math.round(waypoint.y)})
                        </span>
                        <span className="text-gray-400">{waypoint.duration}s</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-400 mb-2">
              Click on the flight zone to add waypoints
            </div>

            <div className="flex gap-2">
              <button
                onClick={saveMission}
                disabled={currentMission.waypoints.length === 0}
                className={`flex-1 py-2 px-3 rounded text-sm font-semibold transition-colors ${
                  currentMission.waypoints.length === 0
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                Save Mission
              </button>
              
              <button
                onClick={() => {
                  setCurrentMission(null);
                  setIsCreating(false);
                }}
                className="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Missions List */}
      <div className="space-y-2">
        <div className="text-sm text-gray-400">
          Saved Missions ({missions.length})
        </div>
        
        {missions.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            No missions created yet
          </div>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {missions.map((mission) => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-700 rounded-lg p-3"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-white font-medium text-sm">{mission.name}</div>
                    <div className="text-xs text-gray-400">
                      {mission.waypoints.length} waypoints • {mission.estimatedDuration}s
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded text-xs border ${getPriorityColor(mission.priority)}`}>
                      {mission.priority}
                    </div>
                    
                    <div className={`px-2 py-1 rounded text-xs ${
                      mission.status === "completed" ? "bg-green-900 text-green-200" :
                      mission.status === "executing" ? "bg-blue-900 text-blue-200" :
                      mission.status === "ready" ? "bg-purple-900 text-purple-200" :
                      "bg-gray-900 text-gray-200"
                    }`}>
                      {mission.status}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {mission.status === "ready" && (
                    <button
                      onClick={() => executePrebuiltMission(mission)}
                      disabled={!isActive}
                      className={`flex-1 py-1 px-2 rounded text-xs font-semibold transition-colors flex items-center justify-center gap-1 ${
                        isActive
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Play className="w-3 h-3" />
                      Execute
                    </button>
                  )}
                  
                  <button
                    onClick={() => deleteMission(mission.id)}
                    className="p-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Waypoint Preview */}
                <div className="mt-2 flex gap-1">
                  {mission.waypoints.slice(0, 5).map((waypoint, index) => {
                    const ActionIcon = getActionIcon(waypoint.action);
                    return (
                      <div key={waypoint.id} className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
                        <ActionIcon className="w-3 h-3 text-gray-300" />
                      </div>
                    );
                  })}
                  {mission.waypoints.length > 5 && (
                    <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-xs text-gray-300">
                      +{mission.waypoints.length - 5}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Click Instructions */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-2 bg-purple-900/20 border border-purple-700 rounded text-xs text-purple-200"
        >
          💡 Click anywhere in the flight zone to add a waypoint with the selected action
        </motion.div>
      )}
    </div>
  );
}