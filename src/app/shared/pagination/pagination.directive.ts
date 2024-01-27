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
import {IPaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnChanges, OnInit, OnDestroy {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize: number | undefined;

    private readonly currentPageIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();

    private pageIndexes: number[] | undefined;

    get shouldShowItems(): boolean {
        return Boolean(this.appPaginationOf?.length);
    }

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf}: SimpleChanges): void {
        if (appPaginationOf) {
            this.updateView();
        }
    }

    ngOnInit() {
        this.getPageIndexes();
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
        const groups = this.slicePaginationOf(appPaginationOf);

        return {
            appPaginationOf,
            $implicit: groups[index],
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

    private slicePaginationOf(appPaginationOf: T[]): T[][] {
        let group: T[] | undefined;
        let sliceBegin = 0;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        let sliceEnd = this.appPaginationChankSize!;
        const groups: T[][] = [];

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        for (let i = 0; i < this.pageIndexes!.length; i++) {
            group = appPaginationOf.slice(sliceBegin, sliceEnd);
            sliceBegin = sliceEnd;
            sliceEnd += this.appPaginationChankSize!;
            groups.push(group);
        }

        return groups;
    }

    private getPageIndexes() {
        if (this.appPaginationOf && this.appPaginationChankSize) {
            const amountPages = Math.ceil(
                this.appPaginationOf.length / this.appPaginationChankSize,
            );

            this.pageIndexes = new Array(amountPages).fill(0).map((_, i) => i);
        }

        return this.pageIndexes;
    }

    private selectIndex(pageIndex: number) {
        this.currentPageIndex$.next(pageIndex);
    }
}
