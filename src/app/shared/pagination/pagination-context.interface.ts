export interface IPaginationContext<T> {
    $implicit: T[];
    appPaginationOf: T[];
    pageIndexes: number[];
    index: number;
    chankSize: number;
    next: () => void;
    back: () => void;
    selectIndex: (index: number) => void;
    selectChankSize: (chankSize: number) => void;
}
