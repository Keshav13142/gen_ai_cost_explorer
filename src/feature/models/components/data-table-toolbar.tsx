import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { modes, providers } from "@/feature/models/data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter models by name..."
          value={
            (table.getColumn("model_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("model_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("mode") && (
          <DataTableFacetedFilter
            column={table.getColumn("mode")}
            title="Modes"
            options={modes}
          />
        )}
        {table.getColumn("litellm_provider") && (
          <DataTableFacetedFilter
            column={table.getColumn("litellm_provider")}
            title="Providers"
            options={providers}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
