export function uniqueArray(arr: any[], key: any) {
    let unique = {};
    for (let i in arr) {
        let item = arr[i];
        unique[item[key]] = item;
    }

    return Object.values(unique);
}