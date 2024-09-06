import type { Model } from "./schema";

export type CostMethod =
  | "token"
  | "pixel"
  | "second"
  | "character"
  | "image"
  | "video_per_second"
  | "audio_per_second"
  | "token_above_128k_tokens"
  | "character_above_128k_tokens";

const possibleCostMethods: CostMethod[] = [
  "token",
  "pixel",
  "second",
  "character",
  "image",
  "video_per_second",
  "audio_per_second",
  "token_above_128k_tokens",
  "character_above_128k_tokens",
];

export function getAvailableCostMethods(model: Model): CostMethod[] {
  const methods: CostMethod[] = [];

  possibleCostMethods.forEach((pcm) => {
    if (model[`input_cost_per_${pcm}`] || model[`output_cost_per_${pcm}`]) {
      methods.push(pcm);
    }
  });

  return methods;
}

export function calculateCost(
  model: Model,
  inputUnits: number,
  outputUnits: number,
  method?: CostMethod,
): { inputCost: number; outputCost: number } {
  if (!method || !possibleCostMethods.some((pcm) => pcm === method)) {
    console.error(`Unsupported cost method: ${method}`);
    return { inputCost: 0, outputCost: 0 };
  }

  const inputCost =
    ((model[`input_cost_per_${method}`] as number) || 0) * inputUnits;
  const outputCost =
    ((model[`output_cost_per_${method}`] as number) || 0) * outputUnits;
  return { inputCost, outputCost };
}
