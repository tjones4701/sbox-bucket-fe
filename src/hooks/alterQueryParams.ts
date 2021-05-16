import { isNonEmptyArray } from "../lib/common/inNonEmptyArray";
import { useRouter } from "./useRouter";

export function useQueryParams(params?: string[]): any {
    const router = useRouter();
    let results: any = {};

    if (isNonEmptyArray(params)) {
        for (let i in params) {
            results[params[i]] = router?.query?.[params[i]];
        }
    } else {
        results = router?.query ?? {};
    }

    results.isRouterReady = router?.isReady;
    return results;




}