export interface PaginationContext<T> {
    $implicit: T[];
    appPaginationOf: T[];
    next: () => void;
    back: () => void;
    pageIndexes: number;
    activeIndex: number;
    selectIndex: number;
}
