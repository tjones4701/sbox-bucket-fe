
export function isPromise(obj: any) {
    return obj?.then != null;
};
