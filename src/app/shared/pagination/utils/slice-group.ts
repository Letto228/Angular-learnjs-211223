export function sliceGroup<T>(arr: T[], currentIndex: number, chankSize: number): T[] {
    return arr.slice(currentIndex * chankSize, currentIndex * chankSize + chankSize);
}
