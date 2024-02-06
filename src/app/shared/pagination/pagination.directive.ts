import {
    Directive,
    Input,
    OnInit,
    ViewContainerRef,
    TemplateRef,
    OnDestroy,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import {BehaviorSubject, Subject, filter, map, takeUntil} from 'rxjs';
import {chunk} from 'lodash';
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input({required: true}) appPaginationOf: T[] | undefined | null;
    @Input({required: true}) appPaginationChunkSize: number | undefined;

    private readonly currentPageIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    private pageIndexes: number[] | undefined;
    private pagesGroups: T[][] = [];

    private get shouldShowItems(): boolean {
        return Boolean(this.appPaginationOf?.length);
    }

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChunkSize}: SimpleChanges): void {
        if (appPaginationOf && appPaginationChunkSize) {
            this.pagesGroups = chunk(this.appPaginationOf, this.appPaginationChunkSize);
            this.updatePageIndexes();
            this.updateView();
        }
    }

    ngOnInit() {
        this.listenCurrentPageIndex();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private updateView() {
        if (this.shouldShowItems) {
            this.currentPageIndex$.next(0);

            return;
        }

        this.viewContainerRef.clear();
    }

    private listenCurrentPageIndex() {
        this.currentPageIndex$
            .pipe(
                filter(() => this.shouldShowItems),
                map(index => this.getCurrentContext(index)),
                takeUntil(this.destroy$),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    private getCurrentContext(index: number): IPaginationContext<T> {
        const appPaginationOf = this.appPaginationOf as T[];

        return {
            appPaginationOf,
            $implicit: this.pagesGroups[index],
            next: () => {
                this.next();
            },
            back: () => {
                this.back();
            },
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            pageIndexes: this.pageIndexes!,
            activeIndex: index,
            selectIndex: (pageIndex: number) => {
                this.selectIndex(pageIndex);
            },
        };
    }

    private next() {
        const nextGroup = this.currentPageIndex$.value + 1;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const newGroup = nextGroup < this.pageIndexes!.length ? nextGroup : 0;

        newGroup && this.currentPageIndex$.next(newGroup);
    }

    private back() {
        const previousGroup = this.currentPageIndex$.value - 1;
        const newGroup = previousGroup <= 0 ? 0 : previousGroup;

        this.currentPageIndex$.next(newGroup);
    }

    private updatePageIndexes() {
        this.pageIndexes = new Array(this.pagesGroups.length).fill(0).map((_, i) => i);
    }

    private selectIndex(pageIndex: number) {
        this.currentPageIndex$.next(pageIndex);
    }
}
