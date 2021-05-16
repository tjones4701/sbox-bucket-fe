export function replaceString(original: string, find: string, replace: string) {
    return original.split(find).join(replace);
}