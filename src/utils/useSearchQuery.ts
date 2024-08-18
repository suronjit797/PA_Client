import { useSearchParams, URLSearchParamsInit } from "react-router-dom";

export const globalQueries: string[] = ["page", "limit", "query", "sortBy", "sortOrder"];
export const transactionQueries: string[] = ["amount_$gte", "amount_$lte", "isPending", "type"];
export const todoQueries: string[] = ["isDone", "important"];

type SearchQueryReturn = [
  { [key: string]: string | null },
  (nextInit: URLSearchParamsInit, navigateOptions?: { replace?: boolean; state?: any }) => void
];

export const useSearchQuery = (keys?: string | string[]): SearchQueryReturn => {
  let params = [...globalQueries];
  const [query, setQuery] = useSearchParams();
  const obj: { [key: string]: string | null } = {};

  if (Array.isArray(keys)) {
    params = [...params, ...keys];
  } else if (keys) {
    params = [...params, keys];
  }

  params.forEach((k) => {
    if (Boolean(query.get(k))) {
      obj[k] = query.get(k);
    }
  });
  return [obj, setQuery];
};

type QueryObject = { [key: string]: any };

export const searchQueryFormat = (query: QueryObject): QueryObject => {
  const obj: QueryObject = {};

  Object.entries(query).forEach(([k, v]) => {
    if (k && v !== undefined && !["undefined"].includes(String(v))) {
      obj[k] = v;
    }
  });

  return obj;
};
