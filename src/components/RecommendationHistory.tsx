import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function RecommendationHistory() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const recommendations = useQuery(
    api.wateringRecommendations.getRecentRecommendations,
    { farmerId: loggedInUser?._id, limit: 20 }
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case "daily": return "Daily";
      case "alternate": return "Every other day";
      case "twice_daily": return "Twice daily";
      case "weekly": return "Weekly";
      default: return frequency;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "cereals": return "🌾";
      case "coarse_cereals": return "🌿";
      case "pulses": return "🫘";
      case "oilseeds": return "🌻";
      default: return "🌱";
    }
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Recommendations Yet
        </h3>
        <p className="text-gray-600">
          Start calculating watering recommendations to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          📊 Recommendation History
        </h2>

        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec._id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {getCategoryIcon(rec.crop?.category || "")}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {rec.crop?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {rec.currentStage.replace("_", " ").toUpperCase()} stage
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">
                    {rec.recommendedWatering} mm
                  </div>
                  <div className="text-sm text-gray-600">
                    {getFrequencyText(rec.frequency)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-gray-600">Soil:</span>
                  <span className="ml-1 font-medium capitalize">{rec.soilType}</span>
                </div>
                <div>
                  <span className="text-gray-600">Temperature:</span>
                  <span className="ml-1 font-medium">{rec.currentTemperature}°C</span>
                </div>
                <div>
                  <span className="text-gray-600">Humidity:</span>
                  <span className="ml-1 font-medium">{rec.currentHumidity}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Rainfall:</span>
                  <span className="ml-1 font-medium">{rec.rainfall}mm</span>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 mb-2">
                {rec.notes}
              </div>

              <div className="text-xs text-gray-500">
                Calculated on {formatDate(rec.calculatedAt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
