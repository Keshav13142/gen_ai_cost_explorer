import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ModelCostCalculator from "@/feature/models/components/cost-calculator";
import ModelNotFound from "@/feature/models/components/not-found";
import type { Model } from "@/feature/models/data/schema";
import { getAvailableCostMethods } from "@/feature/models/data/utils";
import { backendApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import {
  BoxSelect,
  ChevronsUpDown,
  DollarSign,
  FileText,
  LoaderCircle,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/models/$modelName")({
  component: ModelInfoPage,
});

export default function ModelInfoPage() {
  const { modelName } = Route.useParams();

  const breadCrumbItems = [
    { title: "All Models", link: "/" },
    { title: modelName, link: `/models/${modelName}` },
  ];

  const {
    data: model,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["model", modelName],
    queryFn: async () => {
      const { data } = await backendApi.get<undefined, AxiosResponse<Model[]>>(
        `/models?model_name=${modelName}`
      );
      if (data.length > 1) return null;
      return data.length === 0 ? null : data[0];
    },
  });

  if (isLoading)
    return (
      <div>
        <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
        Loading...
      </div>
    );

  if (isError) return <div>Failed to fetch model data..</div>;

  if (!model) return <ModelNotFound />;

  const renderInfoItem = (
    label: string,
    value: string | number | undefined
  ) => {
    if (value === undefined) return null;
    return (
      <div className="flex justify-between items-center py-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
    );
  };

  const renderBadge = (label: string, condition: boolean | undefined) => {
    if (!condition) return null;
    return <Badge className="mr-2 mb-2">{label}</Badge>;
  };

  const hasCapabilities =
    model.supports_parallel_function_calling ||
    model.supports_function_calling ||
    model.supports_assistant_prefill ||
    model.supports_system_messages ||
    model.supports_vision ||
    model.supports_tool_choice ||
    model.supports_response_schema;

  const hasAdditionalInfo =
    model.tool_use_system_prompt_tokens ||
    model.max_images_per_prompt ||
    model.max_videos_per_prompt ||
    model.max_video_length ||
    model.max_audio_length_hours ||
    model.max_audio_per_prompt ||
    model.max_pdf_size_mb;

  const costMethods = getAvailableCostMethods(model);
  const hasPricingInfo = costMethods.length > 0;

  return (
    <div className="space-y-5">
      <Breadcrumbs items={breadCrumbItems} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            {model.model_name}
            <Badge variant="outline">{model.litellm_provider}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Model Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {renderInfoItem("Mode", model.mode)}
                  {renderInfoItem("Max Tokens", model.max_tokens)}
                  {renderInfoItem("Max Input Tokens", model.max_input_tokens)}
                  {renderInfoItem("Max Output Tokens", model.max_output_tokens)}
                  {renderInfoItem(
                    "Output Vector Size",
                    model.output_vector_size
                  )}
                  {model.source ? (
                    <Collapsible className="mt-2">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Source</span>
                        <CollapsibleTrigger>
                          <ChevronsUpDown className="h-4 w-4" />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent>{model.source}</CollapsibleContent>
                    </Collapsible>
                  ) : null}
                </CardContent>
              </Card>
              {hasCapabilities ? (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <BoxSelect className="w-5 h-5 mr-2" />
                      Capabilities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {renderBadge(
                        "Function Calling",
                        model.supports_function_calling
                      )}
                      {renderBadge(
                        "Parallel Function Calling",
                        model.supports_parallel_function_calling
                      )}
                      {renderBadge("Vision", model.supports_vision)}
                      {renderBadge(
                        "Assistant Prefill",
                        model.supports_assistant_prefill
                      )}
                      {renderBadge("Tool Choice", model.supports_tool_choice)}
                      {renderBadge(
                        "System Messages",
                        model.supports_system_messages
                      )}
                      {renderBadge(
                        "Response Schema",
                        model.supports_response_schema
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>
            {hasPricingInfo ? (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Pricing Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInfoItem(
                      "Input Cost per Token",
                      model.input_cost_per_token
                        ? `$${model.input_cost_per_token}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Output Cost per Token",
                      model.output_cost_per_token
                        ? `$${model.output_cost_per_token}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Input Cost per Pixel",
                      model.input_cost_per_pixel
                        ? `$${model.input_cost_per_pixel}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Output Cost per Pixel",
                      model.output_cost_per_pixel
                        ? `$${model.output_cost_per_pixel}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Input Cost per Second",
                      model.input_cost_per_second
                        ? `$${model.input_cost_per_second}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Output Cost per Second",
                      model.output_cost_per_second
                        ? `$${model.output_cost_per_second}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Input Cost per Character",
                      model.input_cost_per_character
                        ? `$${model.input_cost_per_character}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Output Cost per Character",
                      model.output_cost_per_character
                        ? `$${model.output_cost_per_character}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Input Cost per Image",
                      model.input_cost_per_image
                        ? `$${model.input_cost_per_image}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Output Cost per Image",
                      model.output_cost_per_image
                        ? `$${model.output_cost_per_image}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Input Cost per Video Second",
                      model.input_cost_per_video_per_second
                        ? `$${model.input_cost_per_video_per_second}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Output Cost per Video Second",
                      model.output_cost_per_video_per_second
                        ? `$${model.output_cost_per_video_per_second}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Input Cost per Audio Second",
                      model.input_cost_per_audio_per_second
                        ? `$${model.input_cost_per_audio_per_second}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Output Cost per Audio Second",
                      model.output_cost_per_audio_per_second
                        ? `$${model.output_cost_per_audio_per_second}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Cost per Image",
                      model.cost_per_image
                        ? `$${model.cost_per_image}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Input Cost per Token (Batch)",
                      model.input_cost_per_token_batch_requests
                        ? `$${model.input_cost_per_token_batch_requests}`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Input Cost per Request",
                      model.input_cost_per_request
                        ? `$${model.input_cost_per_request}`
                        : undefined
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : null}
            {hasAdditionalInfo ? (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderInfoItem(
                      "Tool Use System Prompt Tokens",
                      model.tool_use_system_prompt_tokens
                    )}
                    {renderInfoItem(
                      "Max Images per Prompt",
                      model.max_images_per_prompt
                    )}
                    {renderInfoItem(
                      "Max Videos per Prompt",
                      model.max_videos_per_prompt
                    )}
                    {renderInfoItem(
                      "Max Video Length",
                      model.max_video_length
                        ? `${model.max_video_length} seconds`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Max Audio Length",
                      model.max_audio_length_hours
                        ? `${model.max_audio_length_hours} hours`
                        : undefined
                    )}
                    {renderInfoItem(
                      "Max Audio per Prompt",
                      model.max_audio_per_prompt
                    )}
                    {renderInfoItem(
                      "Max PDF Size",
                      model.max_pdf_size_mb
                        ? `${model.max_pdf_size_mb} MB`
                        : undefined
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : null}
            <ModelCostCalculator model={model} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
