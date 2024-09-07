import { columns } from "@/feature/models/components/columns";
import { DataTable } from "@/feature/models/components/data-table";
import data from "@/feature/models/data/data.json";
import type { Model } from "@/feature/models/data/schema";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const SearchParamsSchema = z.object({
  search: z.string().optional(),
  modes: z.string().optional(),
  providers: z.string().optional(),
  sort: z.string().optional(),
  pageIndex: z.number().optional(),
  pageSize: z.number().optional(),
});

type SearchParams = z.infer<typeof SearchParamsSchema>;

export const Route = createFileRoute("/models/")({
  component: Models,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return SearchParamsSchema.parse(search);
  },
});

function Models() {
  return <DataTable columns={columns} data={data as Model[]} />;
}
