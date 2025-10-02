import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedCropDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingCrops = await ctx.db.query("crops").take(1);
    if (existingCrops.length > 0) {
      return "Database already seeded";
    }

    const crops = [
      // Kharif Season - Cereals
      {
        name: "Paddy",
        category: "cereals",
        season: "kharif",
        baseWaterRequirement: 5.0,
        growthStages: [
          { stage: "nursery", durationDays: 25, waterMultiplier: 1.2 },
          { stage: "transplanting", durationDays: 10, waterMultiplier: 1.5 },
          { stage: "tillering", durationDays: 25, waterMultiplier: 1.3 },
          { stage: "panicle_initiation", durationDays: 35, waterMultiplier: 1.4 },
          { stage: "flowering", durationDays: 15, waterMultiplier: 1.6 },
          { stage: "grain_filling", durationDays: 30, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.8 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.3 },
        ],
        temperatureRange: {
          optimal: { min: 20, max: 35 },
          tolerance: { min: 15, max: 40 },
        },
        humidityRange: {
          optimal: { min: 70, max: 85 },
        },
      },
      {
        name: "Maize",
        category: "cereals",
        season: "kharif",
        baseWaterRequirement: 4.5,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 35, waterMultiplier: 1.2 },
          { stage: "tasseling", durationDays: 15, waterMultiplier: 1.5 },
          { stage: "silking", durationDays: 10, waterMultiplier: 1.6 },
          { stage: "grain_filling", durationDays: 40, waterMultiplier: 1.3 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.2 },
        ],
        temperatureRange: {
          optimal: { min: 21, max: 30 },
          tolerance: { min: 15, max: 35 },
        },
        humidityRange: {
          optimal: { min: 60, max: 75 },
        },
      },
      {
        name: "Sorghum",
        category: "cereals",
        season: "kharif",
        baseWaterRequirement: 3.8,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 40, waterMultiplier: 1.1 },
          { stage: "panicle_initiation", durationDays: 20, waterMultiplier: 1.4 },
          { stage: "flowering", durationDays: 15, waterMultiplier: 1.5 },
          { stage: "grain_filling", durationDays: 35, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 26, max: 30 },
          tolerance: { min: 20, max: 40 },
        },
        humidityRange: {
          optimal: { min: 50, max: 70 },
        },
      },
      {
        name: "Pearl Millet",
        category: "cereals",
        season: "kharif",
        baseWaterRequirement: 3.2,
        growthStages: [
          { stage: "germination", durationDays: 5, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 30, waterMultiplier: 1.0 },
          { stage: "panicle_initiation", durationDays: 15, waterMultiplier: 1.3 },
          { stage: "flowering", durationDays: 10, waterMultiplier: 1.4 },
          { stage: "grain_filling", durationDays: 25, waterMultiplier: 1.1 },
          { stage: "maturity", durationDays: 10, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.0 },
        ],
        temperatureRange: {
          optimal: { min: 25, max: 35 },
          tolerance: { min: 20, max: 42 },
        },
        humidityRange: {
          optimal: { min: 40, max: 65 },
        },
      },

      // Kharif Season - Coarse Cereals
      {
        name: "Finger Millet",
        category: "coarse_cereals",
        season: "kharif",
        baseWaterRequirement: 3.5,
        growthStages: [
          { stage: "germination", durationDays: 5, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 30, waterMultiplier: 1.1 },
          { stage: "tillering", durationDays: 20, waterMultiplier: 1.2 },
          { stage: "flowering", durationDays: 15, waterMultiplier: 1.4 },
          { stage: "grain_filling", durationDays: 30, waterMultiplier: 1.1 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 20, max: 30 },
          tolerance: { min: 15, max: 35 },
        },
        humidityRange: {
          optimal: { min: 65, max: 80 },
        },
      },
      {
        name: "Foxtail Millet",
        category: "coarse_cereals",
        season: "kharif",
        baseWaterRequirement: 2.8,
        growthStages: [
          { stage: "germination", durationDays: 4, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 25, waterMultiplier: 1.0 },
          { stage: "panicle_initiation", durationDays: 15, waterMultiplier: 1.2 },
          { stage: "flowering", durationDays: 10, waterMultiplier: 1.3 },
          { stage: "grain_filling", durationDays: 20, waterMultiplier: 1.0 },
          { stage: "maturity", durationDays: 10, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.0 },
        ],
        temperatureRange: {
          optimal: { min: 22, max: 32 },
          tolerance: { min: 18, max: 38 },
        },
        humidityRange: {
          optimal: { min: 50, max: 70 },
        },
      },
      {
        name: "Barnyard Millet",
        category: "coarse_cereals",
        season: "kharif",
        baseWaterRequirement: 2.5,
        growthStages: [
          { stage: "germination", durationDays: 4, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 20, waterMultiplier: 1.0 },
          { stage: "panicle_initiation", durationDays: 12, waterMultiplier: 1.2 },
          { stage: "flowering", durationDays: 8, waterMultiplier: 1.3 },
          { stage: "grain_filling", durationDays: 18, waterMultiplier: 1.0 },
          { stage: "maturity", durationDays: 8, waterMultiplier: 0.5 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.0 },
        ],
        temperatureRange: {
          optimal: { min: 20, max: 30 },
          tolerance: { min: 15, max: 35 },
        },
        humidityRange: {
          optimal: { min: 60, max: 75 },
        },
      },

      // Kharif Season - Pulses
      {
        name: "Urd",
        category: "pulses",
        season: "kharif",
        baseWaterRequirement: 3.0,
        growthStages: [
          { stage: "germination", durationDays: 5, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 25, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 15, waterMultiplier: 1.3 },
          { stage: "pod_formation", durationDays: 20, waterMultiplier: 1.4 },
          { stage: "pod_filling", durationDays: 15, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 10, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 25, max: 35 },
          tolerance: { min: 20, max: 40 },
        },
        humidityRange: {
          optimal: { min: 70, max: 85 },
        },
      },
      {
        name: "Rajmah",
        category: "pulses",
        season: "kharif",
        baseWaterRequirement: 3.2,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 30, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 20, waterMultiplier: 1.3 },
          { stage: "pod_formation", durationDays: 25, waterMultiplier: 1.4 },
          { stage: "pod_filling", durationDays: 20, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 18, max: 28 },
          tolerance: { min: 15, max: 32 },
        },
        humidityRange: {
          optimal: { min: 65, max: 80 },
        },
      },
      {
        name: "Ricebean",
        category: "pulses",
        season: "kharif",
        baseWaterRequirement: 2.8,
        growthStages: [
          { stage: "germination", durationDays: 5, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 25, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 15, waterMultiplier: 1.2 },
          { stage: "pod_formation", durationDays: 20, waterMultiplier: 1.3 },
          { stage: "pod_filling", durationDays: 15, waterMultiplier: 1.1 },
          { stage: "maturity", durationDays: 10, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 22, max: 32 },
          tolerance: { min: 18, max: 38 },
        },
        humidityRange: {
          optimal: { min: 70, max: 85 },
        },
      },
      {
        name: "Cowpea",
        category: "pulses",
        season: "kharif",
        baseWaterRequirement: 3.5,
        growthStages: [
          { stage: "germination", durationDays: 6, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 25, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 18, waterMultiplier: 1.3 },
          { stage: "pod_formation", durationDays: 22, waterMultiplier: 1.4 },
          { stage: "pod_filling", durationDays: 18, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 12, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 23, max: 34 },
          tolerance: { min: 18, max: 40 },
        },
        humidityRange: {
          optimal: { min: 65, max: 80 },
        },
      },
      {
        name: "Pigeon Pea",
        category: "pulses",
        season: "kharif",
        baseWaterRequirement: 3.8,
        growthStages: [
          { stage: "germination", durationDays: 8, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 60, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 30, waterMultiplier: 1.3 },
          { stage: "pod_formation", durationDays: 40, waterMultiplier: 1.4 },
          { stage: "pod_filling", durationDays: 35, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 20, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 20, max: 30 },
          tolerance: { min: 15, max: 35 },
        },
        humidityRange: {
          optimal: { min: 60, max: 80 },
        },
      },

      // Kharif Season - Oilseeds
      {
        name: "Soybean",
        category: "oilseeds",
        season: "kharif",
        baseWaterRequirement: 4.0,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 35, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 20, waterMultiplier: 1.4 },
          { stage: "pod_formation", durationDays: 25, waterMultiplier: 1.5 },
          { stage: "seed_filling", durationDays: 25, waterMultiplier: 1.3 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.2 },
        ],
        temperatureRange: {
          optimal: { min: 20, max: 30 },
          tolerance: { min: 15, max: 35 },
        },
        humidityRange: {
          optimal: { min: 65, max: 80 },
        },
      },
      {
        name: "Groundnut",
        category: "oilseeds",
        season: "kharif",
        baseWaterRequirement: 4.2,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 30, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 25, waterMultiplier: 1.3 },
          { stage: "pegging", durationDays: 20, waterMultiplier: 1.5 },
          { stage: "pod_development", durationDays: 30, waterMultiplier: 1.4 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.8 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 25, max: 30 },
          tolerance: { min: 20, max: 35 },
        },
        humidityRange: {
          optimal: { min: 60, max: 75 },
        },
      },
      {
        name: "Sesame",
        category: "oilseeds",
        season: "kharif",
        baseWaterRequirement: 3.5,
        growthStages: [
          { stage: "germination", durationDays: 5, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 25, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 20, waterMultiplier: 1.3 },
          { stage: "capsule_formation", durationDays: 25, waterMultiplier: 1.4 },
          { stage: "seed_filling", durationDays: 20, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.0 },
        ],
        temperatureRange: {
          optimal: { min: 25, max: 30 },
          tolerance: { min: 20, max: 35 },
        },
        humidityRange: {
          optimal: { min: 50, max: 70 },
        },
      },
      {
        name: "Sunflower",
        category: "oilseeds",
        season: "kharif",
        baseWaterRequirement: 4.5,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 35, waterMultiplier: 1.2 },
          { stage: "bud_formation", durationDays: 15, waterMultiplier: 1.4 },
          { stage: "flowering", durationDays: 20, waterMultiplier: 1.6 },
          { stage: "seed_filling", durationDays: 25, waterMultiplier: 1.3 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.2 },
        ],
        temperatureRange: {
          optimal: { min: 20, max: 25 },
          tolerance: { min: 15, max: 30 },
        },
        humidityRange: {
          optimal: { min: 60, max: 75 },
        },
      },
      {
        name: "Castor",
        category: "oilseeds",
        season: "kharif",
        baseWaterRequirement: 3.8,
        growthStages: [
          { stage: "germination", durationDays: 8, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 40, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 30, waterMultiplier: 1.3 },
          { stage: "capsule_formation", durationDays: 35, waterMultiplier: 1.4 },
          { stage: "seed_filling", durationDays: 30, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 20, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.0 },
        ],
        temperatureRange: {
          optimal: { min: 20, max: 30 },
          tolerance: { min: 15, max: 35 },
        },
        humidityRange: {
          optimal: { min: 50, max: 70 },
        },
      },

      // Rabi Season - Cereals
      {
        name: "Wheat",
        category: "cereals",
        season: "rabi",
        baseWaterRequirement: 4.0,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.0 },
          { stage: "tillering", durationDays: 30, waterMultiplier: 1.1 },
          { stage: "jointing", durationDays: 25, waterMultiplier: 1.3 },
          { stage: "booting", durationDays: 15, waterMultiplier: 1.4 },
          { stage: "flowering", durationDays: 10, waterMultiplier: 1.5 },
          { stage: "grain_filling", durationDays: 30, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.2 },
        ],
        temperatureRange: {
          optimal: { min: 15, max: 25 },
          tolerance: { min: 10, max: 30 },
        },
        humidityRange: {
          optimal: { min: 50, max: 70 },
        },
      },
      {
        name: "Barley",
        category: "cereals",
        season: "rabi",
        baseWaterRequirement: 3.5,
        growthStages: [
          { stage: "germination", durationDays: 6, waterMultiplier: 1.0 },
          { stage: "tillering", durationDays: 25, waterMultiplier: 1.1 },
          { stage: "jointing", durationDays: 20, waterMultiplier: 1.3 },
          { stage: "booting", durationDays: 12, waterMultiplier: 1.4 },
          { stage: "flowering", durationDays: 8, waterMultiplier: 1.5 },
          { stage: "grain_filling", durationDays: 25, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 12, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 12, max: 22 },
          tolerance: { min: 8, max: 28 },
        },
        humidityRange: {
          optimal: { min: 45, max: 65 },
        },
      },
      {
        name: "Oats",
        category: "cereals",
        season: "rabi",
        baseWaterRequirement: 3.2,
        growthStages: [
          { stage: "germination", durationDays: 6, waterMultiplier: 1.0 },
          { stage: "tillering", durationDays: 25, waterMultiplier: 1.0 },
          { stage: "jointing", durationDays: 20, waterMultiplier: 1.2 },
          { stage: "booting", durationDays: 12, waterMultiplier: 1.3 },
          { stage: "flowering", durationDays: 8, waterMultiplier: 1.4 },
          { stage: "grain_filling", durationDays: 25, waterMultiplier: 1.1 },
          { stage: "maturity", durationDays: 12, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 10, max: 20 },
          tolerance: { min: 5, max: 25 },
        },
        humidityRange: {
          optimal: { min: 50, max: 70 },
        },
      },
      {
        name: "Buckwheat",
        category: "cereals",
        season: "rabi",
        baseWaterRequirement: 2.5,
        growthStages: [
          { stage: "germination", durationDays: 5, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 25, waterMultiplier: 0.9 },
          { stage: "flowering", durationDays: 15, waterMultiplier: 1.2 },
          { stage: "grain_filling", durationDays: 20, waterMultiplier: 1.1 },
          { stage: "maturity", durationDays: 10, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 15, max: 25 },
          tolerance: { min: 10, max: 30 },
        },
        humidityRange: {
          optimal: { min: 60, max: 75 },
        },
      },

      // Rabi Season - Pulses
      {
        name: "Chickpea",
        category: "pulses",
        season: "rabi",
        baseWaterRequirement: 3.0,
        growthStages: [
          { stage: "germination", durationDays: 8, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 40, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 25, waterMultiplier: 1.3 },
          { stage: "pod_formation", durationDays: 30, waterMultiplier: 1.4 },
          { stage: "pod_filling", durationDays: 25, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 15, max: 25 },
          tolerance: { min: 10, max: 30 },
        },
        humidityRange: {
          optimal: { min: 60, max: 75 },
        },
      },
      {
        name: "Field Pea",
        category: "pulses",
        season: "rabi",
        baseWaterRequirement: 3.2,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 35, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 20, waterMultiplier: 1.3 },
          { stage: "pod_formation", durationDays: 25, waterMultiplier: 1.4 },
          { stage: "pod_filling", durationDays: 20, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 12, max: 22 },
          tolerance: { min: 8, max: 28 },
        },
        humidityRange: {
          optimal: { min: 55, max: 75 },
        },
      },
      {
        name: "Lentil",
        category: "pulses",
        season: "rabi",
        baseWaterRequirement: 2.8,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 35, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 20, waterMultiplier: 1.2 },
          { stage: "pod_formation", durationDays: 25, waterMultiplier: 1.3 },
          { stage: "pod_filling", durationDays: 20, waterMultiplier: 1.1 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 15, max: 25 },
          tolerance: { min: 10, max: 30 },
        },
        humidityRange: {
          optimal: { min: 50, max: 70 },
        },
      },
      {
        name: "Black Gram",
        category: "pulses",
        season: "rabi",
        baseWaterRequirement: 2.5,
        growthStages: [
          { stage: "germination", durationDays: 6, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 30, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 18, waterMultiplier: 1.2 },
          { stage: "pod_formation", durationDays: 22, waterMultiplier: 1.3 },
          { stage: "pod_filling", durationDays: 18, waterMultiplier: 1.1 },
          { stage: "maturity", durationDays: 12, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.0 },
        ],
        temperatureRange: {
          optimal: { min: 18, max: 28 },
          tolerance: { min: 15, max: 32 },
        },
        humidityRange: {
          optimal: { min: 60, max: 75 },
        },
      },

      // Rabi Season - Oilseeds
      {
        name: "Mustard",
        category: "oilseeds",
        season: "rabi",
        baseWaterRequirement: 3.0,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 30, waterMultiplier: 0.9 },
          { stage: "flowering", durationDays: 20, waterMultiplier: 1.3 },
          { stage: "pod_formation", durationDays: 25, waterMultiplier: 1.4 },
          { stage: "seed_filling", durationDays: 20, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 15, max: 25 },
          tolerance: { min: 10, max: 30 },
        },
        humidityRange: {
          optimal: { min: 60, max: 75 },
        },
      },
      {
        name: "Rapeseed",
        category: "oilseeds",
        season: "rabi",
        baseWaterRequirement: 3.2,
        growthStages: [
          { stage: "germination", durationDays: 7, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 35, waterMultiplier: 0.9 },
          { stage: "flowering", durationDays: 22, waterMultiplier: 1.3 },
          { stage: "pod_formation", durationDays: 28, waterMultiplier: 1.4 },
          { stage: "seed_filling", durationDays: 22, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 18, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 12, max: 22 },
          tolerance: { min: 8, max: 28 },
        },
        humidityRange: {
          optimal: { min: 55, max: 75 },
        },
      },
      {
        name: "Safflower",
        category: "oilseeds",
        season: "rabi",
        baseWaterRequirement: 2.8,
        growthStages: [
          { stage: "germination", durationDays: 8, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 40, waterMultiplier: 0.9 },
          { stage: "flowering", durationDays: 25, waterMultiplier: 1.2 },
          { stage: "seed_formation", durationDays: 30, waterMultiplier: 1.3 },
          { stage: "seed_filling", durationDays: 25, waterMultiplier: 1.1 },
          { stage: "maturity", durationDays: 20, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.0 },
        ],
        temperatureRange: {
          optimal: { min: 16, max: 25 },
          tolerance: { min: 12, max: 30 },
        },
        humidityRange: {
          optimal: { min: 50, max: 70 },
        },
      },
      {
        name: "Linseed",
        category: "oilseeds",
        season: "rabi",
        baseWaterRequirement: 3.5,
        growthStages: [
          { stage: "germination", durationDays: 8, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 35, waterMultiplier: 1.0 },
          { stage: "flowering", durationDays: 20, waterMultiplier: 1.3 },
          { stage: "capsule_formation", durationDays: 25, waterMultiplier: 1.4 },
          { stage: "seed_filling", durationDays: 20, waterMultiplier: 1.2 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 15, max: 25 },
          tolerance: { min: 10, max: 30 },
        },
        humidityRange: {
          optimal: { min: 55, max: 75 },
        },
      },

      // Additional Kharif Crops
      {
        name: "Cotton",
        category: "oilseeds",
        season: "kharif",
        baseWaterRequirement: 5.5,
        growthStages: [
          { stage: "germination", durationDays: 10, waterMultiplier: 1.1 },
          { stage: "squaring", durationDays: 45, waterMultiplier: 1.2 },
          { stage: "flowering", durationDays: 45, waterMultiplier: 1.5 },
          { stage: "boll_formation", durationDays: 45, waterMultiplier: 1.6 },
          { stage: "boll_development", durationDays: 50, waterMultiplier: 1.4 },
          { stage: "maturity", durationDays: 20, waterMultiplier: 0.8 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.3 },
        ],
        temperatureRange: {
          optimal: { min: 21, max: 30 },
          tolerance: { min: 18, max: 35 },
        },
        humidityRange: {
          optimal: { min: 60, max: 80 },
        },
      },
      {
        name: "Sugarcane",
        category: "cereals",
        season: "kharif",
        baseWaterRequirement: 6.0,
        growthStages: [
          { stage: "germination", durationDays: 30, waterMultiplier: 1.2 },
          { stage: "tillering", durationDays: 60, waterMultiplier: 1.3 },
          { stage: "grand_growth", durationDays: 120, waterMultiplier: 1.5 },
          { stage: "maturation", durationDays: 90, waterMultiplier: 1.2 },
          { stage: "ripening", durationDays: 60, waterMultiplier: 0.9 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 1.0 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.1 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.4 },
        ],
        temperatureRange: {
          optimal: { min: 20, max: 30 },
          tolerance: { min: 15, max: 35 },
        },
        humidityRange: {
          optimal: { min: 75, max: 85 },
        },
      },

      // Additional Rabi Crops
      {
        name: "Potato",
        category: "cereals",
        season: "rabi",
        baseWaterRequirement: 4.5,
        growthStages: [
          { stage: "germination", durationDays: 15, waterMultiplier: 1.1 },
          { stage: "vegetative", durationDays: 30, waterMultiplier: 1.2 },
          { stage: "tuber_initiation", durationDays: 20, waterMultiplier: 1.4 },
          { stage: "tuber_bulking", durationDays: 30, waterMultiplier: 1.5 },
          { stage: "tuber_maturation", durationDays: 15, waterMultiplier: 1.0 },
          { stage: "maturity", durationDays: 10, waterMultiplier: 0.7 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.2 },
        ],
        temperatureRange: {
          optimal: { min: 15, max: 20 },
          tolerance: { min: 10, max: 25 },
        },
        humidityRange: {
          optimal: { min: 80, max: 90 },
        },
      },
      {
        name: "Onion",
        category: "cereals",
        season: "rabi",
        baseWaterRequirement: 4.0,
        growthStages: [
          { stage: "germination", durationDays: 10, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 45, waterMultiplier: 1.1 },
          { stage: "bulb_initiation", durationDays: 30, waterMultiplier: 1.3 },
          { stage: "bulb_development", durationDays: 40, waterMultiplier: 1.4 },
          { stage: "bulb_maturation", durationDays: 20, waterMultiplier: 1.0 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.9 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 13, max: 24 },
          tolerance: { min: 10, max: 30 },
        },
        humidityRange: {
          optimal: { min: 70, max: 80 },
        },
      },
      {
        name: "Garlic",
        category: "cereals",
        season: "rabi",
        baseWaterRequirement: 3.5,
        growthStages: [
          { stage: "germination", durationDays: 12, waterMultiplier: 1.0 },
          { stage: "vegetative", durationDays: 60, waterMultiplier: 1.1 },
          { stage: "bulb_initiation", durationDays: 30, waterMultiplier: 1.3 },
          { stage: "bulb_development", durationDays: 40, waterMultiplier: 1.4 },
          { stage: "bulb_maturation", durationDays: 25, waterMultiplier: 1.0 },
          { stage: "maturity", durationDays: 15, waterMultiplier: 0.6 },
        ],
        soilTypes: [
          { soilType: "clay", waterRetention: 85, adjustmentFactor: 0.8 },
          { soilType: "loam", waterRetention: 70, adjustmentFactor: 1.0 },
          { soilType: "sandy", waterRetention: 45, adjustmentFactor: 1.1 },
        ],
        temperatureRange: {
          optimal: { min: 12, max: 20 },
          tolerance: { min: 8, max: 25 },
        },
        humidityRange: {
          optimal: { min: 65, max: 75 },
        },
      },
    ];

    // Insert all crops
    for (const crop of crops) {
      await ctx.db.insert("crops", crop);
    }

    return `Successfully seeded ${crops.length} crops`;
  },
});

