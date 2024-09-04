import { columns } from "@/feature/models/components/columns";
import { DataTable } from "@/feature/models/components/data-table";
import type { Model } from "@/feature/models/data/schema";
import { backendApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/models/")({
  component: Models,
});

const fetchModels = async (): Promise<Model[]> => {
  const response = await backendApi.get("/models");
  return response.data;
};

function Models() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["models", {}],
    queryFn: () => fetchModels(),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>Loading models...</div>;
  if (error) return <div>Error loading models: {error.message}</div>;

  return <DataTable columns={columns} data={data || []} />;
}
