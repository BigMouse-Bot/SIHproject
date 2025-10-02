import { useState } from "react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function WateringCalculator() {
  const [selectedCropId, setSelectedCropId] = useState<Id<"crops"> | "">("");
  const [currentStage, setCurrentStage] = useState("");
  const [soilType, setSoilType] = useState("loam");
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(70);
  const [rainfall, setRainfall] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const crops = useQuery(api.crops.listCrops, {});
  const selectedCrop = useQuery(
    api.crops.getCrop,
    selectedCropId ? { cropId: selectedCropId as Id<"crops"> } : "skip"
  );
  
  const calculateWatering = useAction(api.wateringCalculator.calculateOptimalWatering);
  const loggedInUser = useQuery(api.auth.loggedInUser);

  const handleCalculate = async () => {
    if (!selectedCropId || !currentStage) return;

    setIsCalculating(true);
    try {
      const recommendation = await calculateWatering({
        cropId: selectedCropId as Id<"crops">,
        currentStage,
        soilType,
        currentTemperature: temperature,
        currentHumidity: humidity,
        rainfall,
        farmerId: loggedInUser?._id,
      });
      setResult(recommendation);
    } catch (error) {
      console.error("Error calculating watering:", error);
    } finally {
      setIsCalculating(false);
    }
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Calculate Optimal Watering
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Crop Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Crop *
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => {
                setSelectedCropId(e.target.value as Id<"crops">);
                setCurrentStage("");
                setResult(null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a crop...</option>
              {crops?.map((crop) => (
                <option key={crop._id} value={crop._id}>
                  {crop.name} ({crop.season})
                </option>
              ))}
            </select>
          </div>

          {/* Growth Stage */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Growth Stage *
            </label>
            <select
              value={currentStage}
              onChange={(e) => {
                setCurrentStage(e.target.value);
                setResult(null);
              }}
              disabled={!selectedCrop}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            >
              <option value="">Select stage...</option>
              {selectedCrop?.growthStages.map((stage) => (
                <option key={stage.stage} value={stage.stage}>
                  {stage.stage.replace("_", " ").toUpperCase()} ({stage.durationDays} days)
                </option>
              ))}
            </select>
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soil Type
            </label>
            <select
              value={soilType}
              onChange={(e) => {
                setSoilType(e.target.value);
                setResult(null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="clay">Clay</option>
              <option value="loam">Loam</option>
              <option value="sandy">Sandy</option>
            </select>
          </div>

          {/* Temperature */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Temperature (°C)
            </label>
            <input
              type="number"
              value={temperature}
              onChange={(e) => {
                setTemperature(Number(e.target.value));
                setResult(null);
              }}
              min="0"
              max="50"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Humidity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Humidity (%)
            </label>
            <input
              type="number"
              value={humidity}
              onChange={(e) => {
                setHumidity(Number(e.target.value));
                setResult(null);
              }}
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Rainfall */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rainfall in Last 7 Days (mm)
            </label>
            <input
              type="number"
              value={rainfall}
              onChange={(e) => {
                setRainfall(Number(e.target.value));
                setResult(null);
              }}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleCalculate}
            disabled={!selectedCropId || !currentStage || isCalculating}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isCalculating ? "Calculating..." : "Calculate Optimal Watering"}
          </button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            💧 Watering Recommendation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {result.recommendedWatering} mm
              </div>
              <div className="text-sm text-blue-800">Water per day</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-green-600">
                {getFrequencyText(result.frequency)}
              </div>
              <div className="text-sm text-green-800">Watering frequency</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-lg font-semibold text-purple-600">
                {selectedCrop?.name}
              </div>
              <div className="text-sm text-purple-800">
                {currentStage.replace("_", " ").toUpperCase()} stage
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">📝 Notes:</h4>
            <p className="text-gray-700">{result.notes}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">🔧 Adjustment Factors:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Soil:</span>
                <span className="ml-1 font-medium">
                  {(result.adjustments.soilAdjustment * 100).toFixed(0)}%
                </span>
              </div>
              <div>
                <span className="text-gray-600">Temperature:</span>
                <span className="ml-1 font-medium">
                  {(result.adjustments.tempAdjustment * 100).toFixed(0)}%
                </span>
              </div>
              <div>
                <span className="text-gray-600">Humidity:</span>
                <span className="ml-1 font-medium">
                  {(result.adjustments.humidityAdjustment * 100).toFixed(0)}%
                </span>
              </div>
              <div>
                <span className="text-gray-600">Rainfall:</span>
                <span className="ml-1 font-medium">
                  {(result.adjustments.rainfallAdjustment * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
