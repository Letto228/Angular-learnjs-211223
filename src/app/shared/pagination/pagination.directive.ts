// import {
//     Directive,
//     Input,
//     OnInit,
//     ViewContainerRef,
//     TemplateRef,
//     OnDestroy,
//     OnChanges,
//     SimpleChanges,
// } from '@angular/core';
// import {BehaviorSubject, Subject, filter, map, takeUntil} from 'rxjs';
// import {PaginationContext} from './pagination-context.interface';

// @Directive({
//     selector: '[appPagination]',
// })
// export class PaginationDirective<T> implements OnInit, OnChanges, OnDestroy {
//     constructor(
//         private readonly viewContainerRef: ViewContainerRef,
//         private readonly templateRef: TemplateRef<PaginationContext<T>>,
//     ) {}

//     @Input() appPaginationOf: T[] | undefined | null;
//     @Input() appPaginationChankSize: number | undefined;

//     private readonly currentIndex$ = new BehaviorSubject<number>(0);
//     private readonly destroy$ = new Subject<void>();

//     get shouldShowItems(): boolean {
//         return !!this.appPaginationOf?.length;
//     }

//     ngOnInit(): void {
//         this.listenCurrentIndex();
//     }

//     ngOnChanges({appPaginationOf}: SimpleChanges): void {
//         if (appPaginationOf) {
//             this.updateView();
//         }
//     }

//     ngOnDestroy(): void {
//         this.destroy$.next();
//         this.destroy$.complete();
//     }

//     private updateView() {
//         if (this.shouldShowItems) {
//             this.currentIndex$.next(0);

//             return;
//         }

//         this.viewContainerRef.clear();
//     }

//     private listenCurrentIndex() {
//         // this.pageIndex = Math.ceil(this.appPaginationOf!.length / this.appPaginationChankSize!);
//         this.currentIndex$
//             .pipe(
//                 filter(() => this.shouldShowItems),
//                 // надо чета тут сделать
//                 map(index => {
//                     if (index <= this.appPaginationChankSize!) {
//                         console.log(index);
//                         return this.getCurrentIndex(index);
//                         // потыкатй вперед назад, вроде чета есть
//                     }

//                     return;
//                 }),
//                 takeUntil(this.destroy$),
//             )
//             .subscribe(context => {
//                 this.viewContainerRef.clear();
//                 this.viewContainerRef.createEmbeddedView(this.templateRef, context!);
//             });
//     }

//     private getCurrentIndex(index: number): PaginationContext<T> {
//         const appPaginationOf = this.appPaginationOf as T[];
//         // надо чета тут сделать
//         return {
//             $implicit: appPaginationOf,
//             appPaginationOf,
//             next: () => {
//                 this.next();
//             },
//             back: () => {
//                 this.back();
//             },
//             pageIndexes: Math.ceil(this.appPaginationOf!.length / this.appPaginationChankSize!),
//             activeIndex: 0,
//             selectIndex: 0,
//         };
//     }

//     private next() {
//         const nextIndex = this.currentIndex$.value + 1;
//         const newIndex = nextIndex < this.appPaginationOf!.length ? nextIndex : 0;

//         this.currentIndex$.next(newIndex);
//     }

//     private back() {
//         const previousIndex = this.currentIndex$.value - 1;
//         const lastIndex = this.appPaginationOf!.length;
//         const newIndex = previousIndex < 0 ? lastIndex : previousIndex;

//         this.currentIndex$.next(newIndex);
//     }
// }

// eslint-disable-next-line no-console
console.log('intermediate commit');
