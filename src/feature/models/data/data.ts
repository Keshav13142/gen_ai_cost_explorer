import {
  AudioLines,
  ChevronsLeftRightEllipsis,
  ImagePlus,
  MessageCircleMore,
  Network,
  ShieldCheck,
  Speech,
} from "lucide-react";

export const providers = [
  {
    value: "openai",
    label: "Openai",
  },
  {
    value: "text-completion-openai",
    label: "Text Completion Openai",
  },
  {
    value: "azure",
    label: "Azure",
  },
  {
    value: "azure_ai",
    label: "Azure Ai",
  },
  {
    value: "anthropic",
    label: "Anthropic",
  },
  {
    value: "mistral",
    label: "Mistral",
  },
  {
    value: "deepseek",
    label: "Deepseek",
  },
  {
    value: "codestral",
    label: "Codestral",
  },
  {
    value: "text-completion-codestral",
    label: "Text Completion Codestral",
  },
  {
    value: "groq",
    label: "Groq",
  },
  {
    value: "friendliai",
    label: "Friendliai",
  },
  {
    value: "vertex_ai-text-models",
    label: "Vertex Ai Text Models",
  },
  {
    value: "vertex_ai-chat-models",
    label: "Vertex Ai Chat Models",
  },
  {
    value: "vertex_ai-code-text-models",
    label: "Vertex Ai Code Text Models",
  },
  {
    value: "vertex_ai-code-chat-models",
    label: "Vertex Ai Code Chat Models",
  },
  {
    value: "vertex_ai-language-models",
    label: "Vertex Ai Language Models",
  },
  {
    value: "vertex_ai-vision-models",
    label: "Vertex Ai Vision Models",
  },
  {
    value: "vertex_ai-anthropic_models",
    label: "Vertex Ai Anthropic Models",
  },
  {
    value: "vertex_ai-llama_models",
    label: "Vertex Ai Llama Models",
  },
  {
    value: "vertex_ai-mistral_models",
    label: "Vertex Ai Mistral Models",
  },
  {
    value: "vertex_ai-ai21_models",
    label: "Vertex Ai Ai21 Models",
  },
  {
    value: "vertex_ai-image-models",
    label: "Vertex Ai Image Models",
  },
  {
    value: "vertex_ai-embedding-models",
    label: "Vertex Ai Embedding Models",
  },
  {
    value: "palm",
    label: "Palm",
  },
  {
    value: "gemini",
    label: "Gemini",
  },
  {
    value: "cohere_chat",
    label: "Cohere Chat",
  },
  {
    value: "cohere",
    label: "Cohere",
  },
  {
    value: "replicate",
    label: "Replicate",
  },
  {
    value: "openrouter",
    label: "Openrouter",
  },
  {
    value: "ai21",
    label: "Ai21",
  },
  {
    value: "nlp_cloud",
    label: "Nlp Cloud",
  },
  {
    value: "aleph_alpha",
    label: "Aleph Alpha",
  },
  {
    value: "bedrock",
    label: "Bedrock",
  },
  {
    value: "sagemaker",
    label: "Sagemaker",
  },
  {
    value: "together_ai",
    label: "Together Ai",
  },
  {
    value: "ollama",
    label: "Ollama",
  },
  {
    value: "deepinfra",
    label: "Deepinfra",
  },
  {
    value: "perplexity",
    label: "Perplexity",
  },
  {
    value: "fireworks_ai",
    label: "Fireworks Ai",
  },
  {
    value: "anyscale",
    label: "Anyscale",
  },
  {
    value: "cloudflare",
    label: "Cloudflare",
  },
  {
    value: "voyage",
    label: "Voyage",
  },
  {
    value: "databricks",
    label: "Databricks",
  },
];

export const modes = [
  {
    value: "chat",
    label: "Chat",
    icon: MessageCircleMore,
  },
  {
    value: "completion",
    label: "Completion",
    icon: ChevronsLeftRightEllipsis,
  },
  {
    value: "embedding",
    label: "Embedding",
    icon: Network,
  },
  {
    value: "moderations",
    label: "Moderations",
    icon: ShieldCheck,
  },
  {
    value: "image_generation",
    label: "Image Generation",
    icon: ImagePlus,
  },
  {
    value: "audio_transcription",
    label: "Audio Transcription",
    icon: AudioLines,
  },
  {
    value: "audio_speech",
    label: "Audio Speech",
    icon: Speech,
  },
];
