import useSWR, { SWRConfiguration, SWRResponse } from "swr";

/**
 *
 * @deprecated Use custom per-route hooks from `api/hooks`
 */
export default function useApi<T, TArgs extends any[]>(
  key: string | null,
  fetcher: (...args: TArgs) => Promise<T>,
  args: TArgs,
  deps: any[] = [],
  config: SWRConfiguration<T> = {}
): SWRResponse<T> {
  return useSWR([key, ...deps], () => fetcher(...args), config);
}
