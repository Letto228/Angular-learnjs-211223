import {
    DestroyRef,
    Directive,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import {BehaviorSubject, filter, map} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {IPaginationContext} from './pagination-context.interface';
import {ArrayUtils} from '../utils/array.utils';

@Directive({
    selector: '[appPagination]',
})
export class PaginationDirective<T> implements OnInit, OnChanges {
    @Input() appPaginationOf: T[] | undefined | null;
    @Input() appPaginationChankSize: number | null = null;

    private chanks: T[][] | null = null;

    private readonly currentIndex$ = new BehaviorSubject<number>(0);
    private readonly destroyRef = inject(DestroyRef);

    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<IPaginationContext<T>>,
    ) {}

    get shouldShowItems(): boolean {
        return Boolean(this.appPaginationOf?.length) && (this.appPaginationChankSize ?? 0) > 0;
    }

    ngOnChanges({appPaginationOf, chankSize}: SimpleChanges): void {
        if (appPaginationOf) {
            this.updateView();
        }

        if (chankSize) {
            this.updateView();
        }
    }

    updateView() {
        if (this.shouldShowItems) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.chanks = ArrayUtils.getChanks(this.appPaginationOf!, this.appPaginationChankSize!);
            this.currentIndex$.next(0);

            return;
        }

        this.viewContainerRef.clear();
    }

    ngOnInit() {
        this.listenCurrentPage();
    }

    listenCurrentPage() {
        this.currentIndex$
            .pipe(
                filter(() => this.shouldShowItems),
                map(index => this.getCurrentContext(index)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe(context => {
                this.viewContainerRef.clear();
                this.viewContainerRef.createEmbeddedView(this.templateRef, context);
            });
    }

    getCurrentContext(index: number): IPaginationContext<T> {
        const appCarouselOf = this.appPaginationOf as T[];
        const chanks = this.chanks as T[][];

        return {
            appPaginationOf: appCarouselOf,
            $implicit: chanks[index],
            pageIndexes: chanks.map((_, i) => i),
            index,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            chankSize: this.appPaginationChankSize!,
            next: () => {
                return this.next();
            },
            back: () => {
                return this.back();
            },
            selectIndex: (i: number) => {
                return this.selectIndex(i);
            },
            selectChankSize: (chankSize: number) => {
                return this.selectChankSize(chankSize);
            },
        };
    }

    selectChankSize(chankSize: number): void {
        if (chankSize === this.appPaginationChankSize) {
            return;
        }

        if (chankSize <= 0) {
            console.warn(`Invalid chank size selected: ${chankSize}`);

            return;
        }

        this.appPaginationChankSize = chankSize;
        this.currentIndex$.next(0);
    }

    selectIndex(index: number): void {
        if (index === this.currentIndex$.value) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (index < 0 || index >= this.chanks!.length) {
            console.warn(`Invalid index (${index}) was select`);

            return;
        }

        this.currentIndex$.next(index);
    }

    back(): void {
        let nextIndex = this.currentIndex$.value - 1;

        if (nextIndex < 0) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            nextIndex = this.chanks!.length - 1;
        }

        this.currentIndex$.next(nextIndex);
    }

    next(): void {
        let nextIndex = this.currentIndex$.value + 1;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (nextIndex >= this.chanks!.length) {
            nextIndex = 0;
        }

        this.currentIndex$.next(nextIndex);
    }
}
