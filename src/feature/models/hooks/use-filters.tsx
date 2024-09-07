import type { RegisteredRouter, RouteIds } from "@tanstack/react-router";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { cleanEmptyParams } from "../utils/clean-params";

export function useFilters<T extends RouteIds<RegisteredRouter["routeTree"]>>(
  routeId: T
) {
  const routeApi = getRouteApi<T>(routeId);
  const navigate = useNavigate();
  const filters = routeApi.useSearch();

  const setFilters = (
    partialFilters: Partial<typeof filters>,
    resetPagination = true
  ) =>
    navigate({
      to: ".",
      search: (prev) =>
        cleanEmptyParams({
          ...prev,
          ...partialFilters,
          ...(resetPagination ? { pageIndex: 0, pageSize: 10 } : {}),
        }),
    });
  const resetFilters = () => navigate({ to: ".", search: {} });

  return { filters, setFilters, resetFilters };
}
