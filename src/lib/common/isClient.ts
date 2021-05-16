import { getWindow } from "../browser/browser";

export function isClient() {
    return getWindow() == null;
}