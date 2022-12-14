export function getNewId(arr, mapFn) {
    return arr.map(mapFn).reduce(
        (a, b) => Math.max(a, b + 1),
        0
    );
}

export function getTodayDateISO() {
    const now = new Date();

    const year = now.getFullYear();
    const month = `0${(now.getMonth() + 1)}`.slice(-2);
    const day = `0${now.getDate()}`.slice(-2);

    const formatted = `${year}-${month}-${day}`;
    return formatted;
}

export function fileTextDownload(content, fileName, mimeType) {
    const file = new Blob([content], { type: mimeType || 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);

    link.download = fileName;

    link.click();
    URL.revokeObjectURL(file);
}