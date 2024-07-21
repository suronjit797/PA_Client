import { useSearchParams } from "react-router-dom";

export const transactionQueries = ["amount_$gte", "amount_$lte", "isPending", "type"]




export const useSearchQuery = (keys) => {
  let params = ["page", "limit", "query"];
  const [query, setQuery] = useSearchParams();
  const obj = {};
  if (Array.isArray(keys)) {
    params = [...params, ...keys];
  } else if (keys) {
    params = [...params, keys];
  }
  params.forEach((k) => (obj[k] = query.get(k)));
  return [obj, setQuery];
};

export const searchQueryFormat = (query) => {
  const obj = {};
  Object.entries(query).forEach(([k, v]) => {
    if (k && (v || [true, false].includes(v)) && !["undefined"].includes(v)) {
      obj[k] = v;
    }
  });
  return obj;
};
