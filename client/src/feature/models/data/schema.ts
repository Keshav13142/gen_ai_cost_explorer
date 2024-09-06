import { z } from "zod";

export const ModelSchema = z.object({
  model_name: z.string(),
  max_tokens: z.number().optional(),
  max_input_tokens: z.number().optional(),
  max_output_tokens: z.number().optional(),
  input_cost_per_token: z.number().optional(),
  output_cost_per_token: z.number().optional(),
  litellm_provider: z.string(),
  mode: z
    .enum([
      "chat",
      "completion",
      "embedding",
      "moderations",
      "image_generation",
      "audio_transcription",
      "audio_speech",
    ])
    .optional(),
  supports_function_calling: z.boolean().optional(),
  supports_parallel_function_calling: z.boolean().optional(),
  supports_vision: z.boolean().optional(),
  source: z.string().optional(),
  output_vector_size: z.number().optional(),
  input_cost_per_pixel: z.number().optional(),
  output_cost_per_pixel: z.number().optional(),
  input_cost_per_second: z.number().optional(),
  output_cost_per_second: z.number().optional(),
  input_cost_per_character: z.number().optional(),
  supports_assistant_prefill: z.boolean().optional(),
  input_cost_per_token_cache_hit: z.number().optional(),
  supports_tool_choice: z.boolean().optional(),
  tool_use_system_prompt_tokens: z.number().optional(),
  output_cost_per_character: z.number().optional(),
  input_cost_per_image: z.number().optional(),
  input_cost_per_video_per_second: z.number().optional(),
  input_cost_per_audio_per_second: z.number().optional(),
  input_cost_per_token_above_128k_tokens: z.number().optional(),
  input_cost_per_character_above_128k_tokens: z.number().optional(),
  output_cost_per_token_above_128k_tokens: z.number().optional(),
  output_cost_per_character_above_128k_tokens: z.number().optional(),
  output_cost_per_image: z.number().optional(),
  output_cost_per_video_per_second: z.number().optional(),
  output_cost_per_audio_per_second: z.number().optional(),
  supports_system_messages: z.boolean().optional(),
  supports_response_schema: z.boolean().optional(),
  max_images_per_prompt: z.number().optional(),
  max_videos_per_prompt: z.number().optional(),
  max_video_length: z.number().optional(),
  max_audio_length_hours: z.number().optional(),
  max_audio_per_prompt: z.number().optional(),
  max_pdf_size_mb: z.number().optional(),
  cost_per_image: z.number().optional(),
  input_cost_per_token_batch_requests: z.number().optional(),
  input_cost_per_request: z.number().optional(),
});

export type Model = z.infer<typeof ModelSchema>;
