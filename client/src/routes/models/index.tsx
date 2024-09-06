import { columns } from "@/feature/models/components/columns";
import { DataTable } from "@/feature/models/components/data-table";
import data from "@/feature/models/data/data.json";
import type { Model } from "@/feature/models/data/schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/models/")({
  component: Models,
});

function Models() {
  return <DataTable columns={columns} data={data as Model[]} />;
}
