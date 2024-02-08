export interface PaginationContext<T> {
    $implicit: T[];
    appPaginationOf: T[];
    selectIndex: number;
    pageIndex: number[];
    next: () => void;
    back: () => void;
    selectPage: () => void;
}
