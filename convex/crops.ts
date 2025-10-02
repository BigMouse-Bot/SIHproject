import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const listCrops = query({
  args: {
    season: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.season && args.season.length > 0) {
      return await ctx.db
        .query("crops")
        .withIndex("by_season", (q) => q.eq("season", args.season!))
        .collect();
    } else if (args.category && args.category.length > 0) {
      return await ctx.db
        .query("crops")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    }
    
    return await ctx.db.query("crops").collect();
  },
});

export const getCrop = query({
  args: { cropId: v.id("crops") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.cropId);
  },
});

export const searchCrops = query({
  args: {
    searchTerm: v.string(),
    season: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("crops").withSearchIndex("search_crops", (q) => {
      let searchQuery = q.search("name", args.searchTerm);
      if (args.season) {
        searchQuery = searchQuery.eq("season", args.season);
      }
      if (args.category) {
        searchQuery = searchQuery.eq("category", args.category);
      }
      return searchQuery;
    });
    
    return await query.take(20);
  },
});

export const addCrop = mutation({
  args: {
    name: v.string(),
    category: v.string(),
    season: v.string(),
    baseWaterRequirement: v.number(),
    growthStages: v.array(v.object({
      stage: v.string(),
      durationDays: v.number(),
      waterMultiplier: v.number(),
    })),
    soilTypes: v.array(v.object({
      soilType: v.string(),
      waterRetention: v.number(),
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("crops", args);
  },
});

export const getWateringRecommendations = query({
  args: {
    cropId: v.optional(v.id("crops")),
    farmerId: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    let recommendations;
    
    if (args.cropId) {
      recommendations = await ctx.db
        .query("wateringRecommendations")
        .withIndex("by_crop", (q) => q.eq("cropId", args.cropId!))
        .order("desc")
        .take(10);
    } else if (args.farmerId) {
      recommendations = await ctx.db
        .query("wateringRecommendations")
        .withIndex("by_farmer", (q) => q.eq("farmerId", args.farmerId!))
        .order("desc")
        .take(10);
    } else {
      recommendations = await ctx.db
        .query("wateringRecommendations")
        .order("desc")
        .take(10);
    }
    
    // Get crop details for each recommendation
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
