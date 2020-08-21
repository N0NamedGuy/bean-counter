function getNewId(arr, mapFn) {
    return arr.map(mapFn).reduce(
        (a, b) => Math.max(a, b + 1),
        0 
    );
}

export { getNewId };