import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { DebouncedInput } from "@/components/debounced-input";
import { Button } from "@/components/ui/button";
import { modes, providers } from "@/feature/models/data/data";
import { useFilters } from "../hooks/use-filters";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered =
    table.getState().columnFilters.filter((c) => Boolean(c.value)).length > 0;
  const { setFilters, resetFilters } = useFilters("/models/");

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DebouncedInput
          placeholder="Filter models by name..."
          value={
            (table.getColumn("model_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(value) => setFilters({ search: value })}
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
            onClick={resetFilters}
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
