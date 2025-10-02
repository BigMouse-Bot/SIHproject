import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { CropCard } from "./CropCard";
import { WateringCalculator } from "./WateringCalculator";
import { RecommendationHistory } from "./RecommendationHistory";

export function CropDatabase() {
  const [selectedSeason, setSelectedSeason] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<Id<"crops"> | null>(null);
  const [activeTab, setActiveTab] = useState<"browse" | "calculate" | "history">("browse");

  const seedDatabase = useMutation(api.seedData.seedCropDatabase);
  
  const crops = useQuery(api.crops.listCrops, {
    season: selectedSeason === "all" ? undefined : selectedSeason,
    category: selectedCategory === "all" ? undefined : selectedCategory,
  });

  const searchResults = useQuery(
    api.crops.searchCrops,
    searchTerm.length > 0 ? {
      searchTerm,
      season: selectedSeason === "all" ? undefined : selectedSeason,
      category: selectedCategory === "all" ? undefined : selectedCategory,
    } : "skip"
  );

  const displayCrops = searchTerm.length > 0 ? searchResults : crops;

  const handleSeedDatabase = async () => {
    try {
      const result = await seedDatabase();
      console.log(result);
    } catch (error) {
      console.error("Error seeding database:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("browse")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "browse"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Browse Crops
        </button>
        <button
          onClick={() => setActiveTab("calculate")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "calculate"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Calculate Watering
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            activeTab === "history"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          History
        </button>
      </div>

      {activeTab === "browse" && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Season
                  </label>
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Seasons</option>
                    <option value="kharif">Kharif</option>
                    <option value="rabi">Rabi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="cereals">Cereals</option>
                    <option value="coarse_cereals">Coarse Cereals</option>
                    <option value="pulses">Pulses</option>
                    <option value="oilseeds">Oilseeds</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search crops..."
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSeedDatabase}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Seed Database
              </button>
            </div>
          </div>

          {/* Crops Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCrops?.map((crop) => (
              <CropCard
                key={crop._id}
                crop={crop}
                onSelect={() => setSelectedCrop(crop._id)}
                isSelected={selectedCrop === crop._id}
              />
            ))}
          </div>

          {displayCrops?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No crops found. Try adjusting your filters or seed the database.
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "calculate" && (
        <WateringCalculator />
      )}

      {activeTab === "history" && (
        <RecommendationHistory />
      )}
    </div>
  );
}
