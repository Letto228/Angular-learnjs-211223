export function createPageIndexes(arrowLength: number, chankSize: number): number[] {
    if (arrowLength <= chankSize) {
        return [0];
    }

    const pageIndexesLength = Math.ceil(arrowLength / chankSize);

    return Array.from(new Array(pageIndexesLength), (_, index) => index);
}

export function sliceGroup<T>(arr: T[], currentIndex: number, chankSize: number): T[] {
    return arr.slice(currentIndex * chankSize, currentIndex * chankSize + chankSize);
}
