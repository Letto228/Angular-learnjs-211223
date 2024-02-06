export interface PaginationContext<T> {
    $implicit: T;
    appCarouselOf: T[];
    next: () => void;
    back: () => void;
}
