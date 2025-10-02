/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as crops from "../crops.js";
import type * as http from "../http.js";
import type * as router from "../router.js";
import type * as seedData from "../seedData.js";
import type * as wateringCalculator from "../wateringCalculator.js";
import type * as wateringRecommendations from "../wateringRecommendations.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  crops: typeof crops;
  http: typeof http;
  router: typeof router;
  seedData: typeof seedData;
  wateringCalculator: typeof wateringCalculator;
  wateringRecommendations: typeof wateringRecommendations;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
