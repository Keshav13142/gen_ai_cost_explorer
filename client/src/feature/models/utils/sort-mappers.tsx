import type { SortingState } from "@tanstack/react-table";

export type SortParams = `${"-" | ""}${string}`;

export const stateToSortBy = (sorting: SortingState | undefined) => {
  if (!sorting || sorting.length == 0) return undefined;

  const sort = sorting[0];

  return sort ? `${sort.desc ? "-" : ""}${sort.id}` : undefined;
};

export const sortByToState = (sortBy: SortParams | undefined) => {
  if (!sortBy) return [];

  return [
    {
      id: sortBy.startsWith("-") ? sortBy.slice(1) : sortBy,
      desc: sortBy[0] === "-",
    },
  ];
};
