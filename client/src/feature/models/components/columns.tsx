import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "./data-table-column-header";
import type { Model } from "@/feature/models/data/schema";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";

export const columns: ColumnDef<Model>[] = [
  {
    accessorKey: "model_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model Name" />
    ),
    filterFn: (row, id, value) => {
      const rowValue = row.getValue(id) as string;
      return rowValue?.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "mode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mode" />
    ),
    filterFn: (row, id, value) => {
      return value?.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "max_tokens",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Max Tokens" />
    ),
  },
  {
    accessorKey: "input_cost_per_token",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Input cost / Token" />
    ),
  },
  {
    accessorKey: "output_cost_per_token",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Output cost / Token" />
    ),
  },
  {
    accessorKey: "litellm_provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    filterFn: (row, id, value) => {
      return value?.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const model = row.original;
      return (
        <Link to="/models/$modelName" params={{ modelName: model.model_name }}>
          <Button variant="outline">View</Button>
        </Link>
      );
    },
  },
];
