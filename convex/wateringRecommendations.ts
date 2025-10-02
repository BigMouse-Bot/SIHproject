import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const saveRecommendation = mutation({
  args: {
    cropId: v.id("crops"),
    farmerId: v.optional(v.id("users")),
    currentStage: v.string(),
    soilType: v.string(),
    currentTemperature: v.number(),
    currentHumidity: v.number(),
    rainfall: v.number(),
    recommendedWatering: v.number(),
    frequency: v.string(),
    notes: v.string(),
    calculatedAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("wateringRecommendations", args);
  },
});

export const getRecentRecommendations = query({
  args: {
    farmerId: v.optional(v.id("users")),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;
    
    let recommendations;
    
    if (args.farmerId) {
      recommendations = await ctx.db
        .query("wateringRecommendations")
        .withIndex("by_farmer", (q) => q.eq("farmerId", args.farmerId!))
        .order("desc")
        .take(limit);
    } else {
      recommendations = await ctx.db
        .query("wateringRecommendations")
        .order("desc")
        .take(limit);
    }
    
    // Enrich with crop data
    const enrichedRecommendations = await Promise.all(
      recommendations.map(async (rec) => {
        const crop = await ctx.db.get(rec.cropId);
        return {
          ...rec,
          crop,
        };
      })
    );
    
    return enrichedRecommendations;
  },
});
