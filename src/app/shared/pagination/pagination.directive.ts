import {
    Directive,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';
import {BehaviorSubject, Subject, filter, map, takeUntil} from 'rxjs';
import {PaginationContext} from './pagination-context.interface';
import {createPageIndexes} from './utils/create-page-indexes';
import {sliceGroup} from './utils/slice-group';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit, OnChanges {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize = 0;
    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroy$ = new Subject<void>();
    private pageIndexes: number[] = [];

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<PaginationContext<T>>,
    ) {}

    ngOnChanges({appPaginationOf, appPaginationChankSize}: SimpleChanges): void {
        if (appPaginationOf || appPaginationChankSize) {
            this.setPageIndexes();
            this.updateView();
        }
    }

    private updateView(): void {
        if (this.shouldShowItems) {
            this.currentIndex$.next(0);

            return;
        }

        this.viewContainerRef.clear();
    }

    private setPageIndexes(): void {
        this.pageIndexes = createPageIndexes(
            this.appPaginationChankSize,
            this.appPaginationOf?.length,
        );
    }

    ngOnInit() {
        this.listenCurrentIndex();
    }

    get shouldShowItems(): boolean {
        return Boolean(this.appPaginationOf?.length);
    }

    private getCurrentContext(index: number): PaginationContext<T> {
        const appPaginationOf = this.appPaginationOf as T[];

        const itemsGroup = sliceGroup(appPaginationOf, index, this.appPaginationChankSize);

        return {
            appPaginationOf,
            $implicit: itemsGroup,
            next: this.next.bind(this),
            pageIndexes: this.pageIndexes,
            activeIndex: index,
            back: this.back.bind(this),
            selectIndex: this.selectIndex.bind(this),
        };
    }

    private selectIndex(newIndex: number) {
        this.currentIndex$.next(newIndex);
    }

    private next() {
        const nextIndex = this.currentIndex$.value + 1;
        const newIndex = nextIndex < this.pageIndexes.length ? nextIndex : 0;

        this.currentIndex$.next(newIndex);
    }

    private back() {
        const previousIndex = this.currentIndex$.value - 1;
        const lastIndex = this.pageIndexes.length - 1;
        const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

        this.currentIndex$.next(newIndex);
    }

    private listenCurrentIndex() {
        this.currentIndex$
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
}
