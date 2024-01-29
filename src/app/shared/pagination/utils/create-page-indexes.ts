export function createPageIndexes(chankSize: number, arrayLength: number = 0): number[] {
    const pageIndexesLength = Math.ceil(arrayLength / chankSize);

    return Array.from(new Array(pageIndexesLength), (_, index) => index);
}
