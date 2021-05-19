export function removeNullProperties(obj) {
    let result = {};
    for (let i in obj) {
        if (obj[i] != null) {
            result[i] = obj[i];
        }
    }
    return result;
}