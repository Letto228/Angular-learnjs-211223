export class ArrayUtils {
    static getChanks<T>(input: T[], chankSize: number | null): T[][] {
        if (chankSize === null || chankSize <= 0) {
            throw new Error(`Is not correct chank size: ${chankSize}`);
        }

        const chanks = new Array<T[]>();

        for (let i = 0; i < input.length; i += chankSize) {
            chanks.push(input.slice(i, i + chankSize));
        }

        return chanks;
    }
}
