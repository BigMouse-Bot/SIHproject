import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  crops: defineTable({
    name: v.string(),
    category: v.string(), // "cereals", "coarse_cereals", "pulses", "oilseeds"
    season: v.string(), // "kharif", "rabi"
    baseWaterRequirement: v.number(), // mm per day
    growthStages: v.array(v.object({
      stage: v.string(),
      durationDays: v.number(),
      waterMultiplier: v.number(), // multiplier for base requirement
    })),
    soilTypes: v.array(v.object({
      soilType: v.string(),
      waterRetention: v.number(), // percentage
      adjustmentFactor: v.number(),
    })),
    temperatureRange: v.object({
      optimal: v.object({
        min: v.number(),
        max: v.number(),
      }),
      tolerance: v.object({
        min: v.number(),
        max: v.number(),
      }),
    }),
    humidityRange: v.object({
      optimal: v.object({
        min: v.number(),
        max: v.number(),
      }),
    }),
  }).index("by_season", ["season"])
    .index("by_category", ["category"])
    .searchIndex("search_crops", {
      searchField: "name",
      filterFields: ["season", "category"],
    }),

  wateringRecommendations: defineTable({
    cropId: v.id("crops"),
    farmerId: v.optional(v.id("users")),
    currentStage: v.string(),
    soilType: v.string(),
    currentTemperature: v.number(),
    currentHumidity: v.number(),
    rainfall: v.number(), // mm in last 7 days
    recommendedWatering: v.number(), // mm per day
    frequency: v.string(), // "daily", "alternate", "weekly"
    notes: v.string(),
    calculatedAt: v.number(),
  }).index("by_crop", ["cropId"])
    .index("by_farmer", ["farmerId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
