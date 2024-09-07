import type {
  ColumnDef,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMemo, useState } from "react";
import { useFilters } from "../hooks/use-filters";
import { sortByToState, stateToSortBy } from "../utils/sort-mappers";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const { filters, setFilters } = useFilters("/models/");

  // Parse search params
  const modelSearchState = filters.search || "";
  const modesState = filters.modes ? filters.modes.split(",") : undefined;
  const providersState = filters.providers
    ? filters.providers.split(",")
    : undefined;
  const sortingState: SortingState = filters.sort
    ? [...sortByToState(filters.sort)]
    : [];
  const paginationState = {
    pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
  };

  const columnFilters = useMemo(() => {
    return [
      { id: "mode", value: modesState },
      { id: "litellm_provider", value: providersState },
      { id: "model_name", value: modelSearchState },
    ];
  }, [modesState, providersState, modelSearchState]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sortingState,
      columnVisibility,
      columnFilters,
      pagination: paginationState,
    },
    onSortingChange: (updaterOrValue) => {
      const sorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sortingState)
          : updaterOrValue;
      setFilters({
        sort: stateToSortBy(sorting),
      });
    },
    onColumnFiltersChange: (updaterOrValue) => {
      const newColumnFilters =
        typeof updaterOrValue === "function"
          ? updaterOrValue(columnFilters)
          : columnFilters;
      const modes =
        (newColumnFilters.find((f) => f.id === "mode")?.value as string[]) ||
        [];
      const providers =
        (newColumnFilters.find((f) => f.id === "litellm_provider")
          ?.value as string[]) || [];
      const modelName = newColumnFilters.find((f) => f.id === "model_name")
        ?.value as string;
      setFilters({
        modes: modes.join(","),
        providers: providers.join(","),
        search: modelName,
      });
    },
    onPaginationChange: (updaterOrValue) => {
      setFilters(
        typeof updaterOrValue === "function"
          ? updaterOrValue(paginationState)
          : updaterOrValue,
        false
      );
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    autoResetPageIndex: false,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
