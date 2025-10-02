"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const calculateOptimalWatering = action({
  args: {
    cropId: v.id("crops"),
    currentStage: v.string(),
    soilType: v.string(),
    currentTemperature: v.number(),
    currentHumidity: v.number(),
    rainfall: v.number(),
    farmerId: v.optional(v.id("users")),
  },
  handler: async (ctx, args): Promise<{
    recommendedWatering: number;
    frequency: string;
    notes: string;
    adjustments: {
      soilAdjustment: number;
      tempAdjustment: number;
      humidityAdjustment: number;
      rainfallAdjustment: number;
    };
  }> => {
    // Get crop data
    const crop: Doc<"crops"> | null = await ctx.runQuery(api.crops.getCrop, { cropId: args.cropId });
    if (!crop) {
      throw new Error("Crop not found");
    }

    // Find the current growth stage
    const growthStage = crop.growthStages.find((stage: any) => stage.stage === args.currentStage);
    if (!growthStage) {
      throw new Error("Growth stage not found");
    }

    // Find soil type adjustment
    const soilData = crop.soilTypes.find((soil: any) => soil.soilType === args.soilType);
    const soilAdjustment: number = soilData ? soilData.adjustmentFactor : 1.0;

    // Calculate base water requirement for current stage
    let baseRequirement = crop.baseWaterRequirement * growthStage.waterMultiplier;

    // Temperature adjustment
    let tempAdjustment = 1.0;
    if (args.currentTemperature > crop.temperatureRange.optimal.max) {
      tempAdjustment = 1.2 + (args.currentTemperature - crop.temperatureRange.optimal.max) * 0.02;
    } else if (args.currentTemperature < crop.temperatureRange.optimal.min) {
      tempAdjustment = 0.8 - (crop.temperatureRange.optimal.min - args.currentTemperature) * 0.01;
    }

    // Humidity adjustment
    let humidityAdjustment = 1.0;
    if (args.currentHumidity < crop.humidityRange.optimal.min) {
      humidityAdjustment = 1.1 + (crop.humidityRange.optimal.min - args.currentHumidity) * 0.005;
    } else if (args.currentHumidity > crop.humidityRange.optimal.max) {
      humidityAdjustment = 0.9;
    }

    // Rainfall adjustment (reduce watering based on recent rainfall)
    const rainfallAdjustment = Math.max(0.1, 1.0 - (args.rainfall / 50)); // Reduce by rainfall, minimum 10%

    // Calculate final recommendation
    const recommendedWatering = Math.max(
      0.5, // Minimum 0.5mm
      baseRequirement * soilAdjustment * tempAdjustment * humidityAdjustment * rainfallAdjustment
    );

    // Determine watering frequency
    let frequency = "daily";
    if (recommendedWatering < 2) {
      frequency = "alternate";
    } else if (recommendedWatering > 8) {
      frequency = "twice_daily";
    }

    // Generate notes
    const notes = generateWateringNotes({
      crop: crop.name,
      stage: args.currentStage,
      temperature: args.currentTemperature,
      humidity: args.currentHumidity,
      rainfall: args.rainfall,
      soilType: args.soilType,
      recommendedWatering,
      tempOptimal: crop.temperatureRange.optimal,
      humidityOptimal: crop.humidityRange.optimal,
    });

    // Save recommendation
    await ctx.runMutation(api.wateringRecommendations.saveRecommendation, {
      cropId: args.cropId,
      farmerId: args.farmerId,
      currentStage: args.currentStage,
      soilType: args.soilType,
      currentTemperature: args.currentTemperature,
      currentHumidity: args.currentHumidity,
      rainfall: args.rainfall,
      recommendedWatering: Math.round(recommendedWatering * 100) / 100,
      frequency,
      notes,
      calculatedAt: Date.now(),
    });

    return {
      recommendedWatering: Math.round(recommendedWatering * 100) / 100,
      frequency,
      notes,
      adjustments: {
        soilAdjustment,
        tempAdjustment,
        humidityAdjustment,
        rainfallAdjustment,
      },
    };
  },
});

function generateWateringNotes(params: {
  crop: string;
  stage: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  soilType: string;
  recommendedWatering: number;
  tempOptimal: { min: number; max: number };
  humidityOptimal: { min: number; max: number };
}): string {
  const notes = [];

  notes.push(`${params.crop} in ${params.stage} stage requires ${params.recommendedWatering}mm water per day.`);

  if (params.temperature > params.tempOptimal.max) {
    notes.push(`High temperature (${params.temperature}°C) increases water demand.`);
  } else if (params.temperature < params.tempOptimal.min) {
    notes.push(`Low temperature (${params.temperature}°C) reduces water demand.`);
  }

  if (params.humidity < params.humidityOptimal.min) {
    notes.push(`Low humidity (${params.humidity}%) increases water requirement.`);
  }

  if (params.rainfall > 10) {
    notes.push(`Recent rainfall (${params.rainfall}mm) reduces irrigation needs.`);
  }

  notes.push(`Soil type: ${params.soilType}.`);

  return notes.join(" ");
}
