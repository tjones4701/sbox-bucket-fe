export type AppWindow = Window & {

}
export function getWindow(): AppWindow {
    try {
        if (typeof window !== undefined) {
            return window;
        }
        return null;
    } catch (e) {
        return null;
    }
}

export function getQueryParamsAsString() {
    let searchString = getWindow()?.location?.search;
    return (searchString ?? "").substring(1);
}

export function getQueryParams(): any {
    const urlParams = new URLSearchParams(getQueryParamsAsString());
    const params = Object.fromEntries(urlParams); // {abc: "foo", def: "[asf]", xyz: "5"}
    return params;
}