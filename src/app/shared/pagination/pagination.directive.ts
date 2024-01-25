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
import {PaginationContext} from './pagination-context.interface';

@Directive({
    selector: '[appPagination]',
})
// implements OnInit, OnChanges, OnDestroy
export class PaginationDirective<T> {
    constructor(
        private readonly viewContainerRef: ViewContainerRef,
        private readonly templateRef: TemplateRef<PaginationContext<T>>,
    ) {}
    // ngOnInit(): void {}
    // ngOnChanges(changes: SimpleChanges): void {}
    // ngOnDestroy(): void {}
    //
    //
    //
    //
    // constructor(
    //     private readonly viewContainerRef: ViewContainerRef,
    //     private readonly templateRef: TemplateRef<PaginationContext<T>>,
    // ) {}

    // @Input() appPaginationOf: T[] | undefined | null;
    // @Input() appPaginationChankSize: number | undefined;

    // private slisedAppPaginationOf: T[] | undefined | null;
    // private begin = 0;
    // private end = 0;

    // private readonly currentIndex$ = new BehaviorSubject<number>(0);
    // private readonly destroy$ = new Subject<void>();

    // get shouldShowItems(): boolean {
    //     // this.begin = 0;
    //     this.end += this.appPaginationChankSize!;
    //     // this.appPaginationOf = this.appPaginationOf?.slice(begin, this.appPaginationChankSize);
    //     // return !!slisedAppPaginationOf?.length;
    //     this.slisedAppPaginationOf = this.appPaginationOf?.slice(this.begin, this.end);
    //     this.begin += this.appPaginationChankSize!;

    //     return !!this.slisedAppPaginationOf?.length;
    //     // return !!this.appPaginationOf?.length;
    // }

    // ngOnInit(): void {
    //     this.listenCurrentIndex();
    // }

    // ngOnChanges({appPaginationOf}: SimpleChanges): void {
    //     if (appPaginationOf) {
    //         this.updateView();
    //     }
    // }

    // ngOnDestroy(): void {
    //     this.destroy$.next();
    //     this.destroy$.complete();
    // }

    // private updateView() {
    //     if (this.shouldShowItems) {
    //         this.currentIndex$.next(0);

    //         return;
    //     }

    //     this.viewContainerRef.clear();
    // }

    // // private i = 0;

    // private listenCurrentIndex() {
    //     // this.pageIndex = Math.ceil(this.appPaginationOf!.length / this.appPaginationChankSize!);
    //     this.currentIndex$
    //         .pipe(
    //             filter(index => {
    //                 // this.i++;
    //                 console.log(index, 'filter');
    //                 // return this.shouldShowItems && this.i < 4;
    //                 return this.shouldShowItems;
    //             }),
    //             // надо чета тут сделать
    //             map(index => {
    //                 console.log(index, 'map');
    //                 // if (index <= this.appPaginationChankSize!) {
    //                 //     console.log(index);
    //                 //     // потыкатй вперед назад, вроде чета есть
    //                 // }
    //                 for (let i = 0; i < this.appPaginationOf!.length; i++) {
    //                     return this.getCurrentIndex(index);
    //                 }

    //                 return false;

    //                 // return;
    //             }),
    //             takeUntil(this.destroy$),
    //         )
    //         .subscribe(context => {
    //             this.viewContainerRef.clear();
    //             this.viewContainerRef.createEmbeddedView(this.templateRef, context!);
    //         });
    // }

    // private getCurrentIndex(index: number): PaginationContext<T> {
    //     // console.log(index, 'map');
    //     const appPaginationOf = this.appPaginationOf as T[];
    //     // надо чета тут сделать
    //     return {
    //         $implicit: appPaginationOf,
    //         appPaginationOf,
    //         next: () => {
    //             this.next();
    //         },
    //         back: () => {
    //             this.back();
    //         },
    //         pageIndexes: Math.ceil(this.appPaginationOf!.length / this.appPaginationChankSize!),
    //         activeIndex: 0,
    //         selectIndex: 0,
    //     };
    // }

    // private next() {
    //     const nextIndex = this.currentIndex$.value + 1;
    //     const newIndex = nextIndex < this.appPaginationOf!.length ? nextIndex : 0;

    //     this.currentIndex$.next(newIndex);
    // }

    // private back() {
    //     const previousIndex = this.currentIndex$.value - 1;
    //     const lastIndex = this.appPaginationOf!.length;
    //     const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

    //     this.currentIndex$.next(newIndex);
    // }
}
