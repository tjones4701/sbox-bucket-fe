import { isArray } from "./isArray";

export function isNonEmptyArray(variable) {
    if (isArray(variable) && variable?.length > 0) {
        return true;
    }
    return false;

}