export class ArrayUtils {
    static getChanks<T>(input: T[], chankSize: number): T[][] {
        if (chankSize <= 0) {
            throw new Error('Chank size must be positive number');
        }

        const chanks = new Array<T[]>();

        for (let i = 0; i < input.length; i += chankSize) {
            chanks.push(input.slice(i, i + chankSize));
        }

        return chanks;
    }
}
