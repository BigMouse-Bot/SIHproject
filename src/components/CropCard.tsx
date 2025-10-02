import { Doc } from "../../convex/_generated/dataModel";

interface CropCardProps {
  crop: Doc<"crops">;
  onSelect: () => void;
  isSelected: boolean;
}

export function CropCard({ crop, onSelect, isSelected }: CropCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cereals": return "🌾";
      case "coarse_cereals": return "🌿";
      case "pulses": return "🫘";
      case "oilseeds": return "🌻";
      default: return "🌱";
    }
  };

  const getSeasonColor = (season: string) => {
    return season === "kharif" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800";
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getCategoryIcon(crop.category)}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{crop.name}</h3>
            <p className="text-sm text-gray-500 capitalize">
              {crop.category.replace("_", " ")}
            </p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getSeasonColor(crop.season)}`}>
          {crop.season}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Base Water Requirement:</span>
          <span className="text-sm font-medium text-gray-900">
            {crop.baseWaterRequirement} mm/day
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Growth Stages:</span>
          <span className="text-sm font-medium text-gray-900">
            {crop.growthStages.length} stages
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Optimal Temp:</span>
          <span className="text-sm font-medium text-gray-900">
            {crop.temperatureRange.optimal.min}°C - {crop.temperatureRange.optimal.max}°C
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Optimal Humidity:</span>
          <span className="text-sm font-medium text-gray-900">
            {crop.humidityRange.optimal.min}% - {crop.humidityRange.optimal.max}%
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-1">
          {crop.growthStages.slice(0, 3).map((stage, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {stage.stage.replace("_", " ")}
            </span>
          ))}
          {crop.growthStages.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              +{crop.growthStages.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
