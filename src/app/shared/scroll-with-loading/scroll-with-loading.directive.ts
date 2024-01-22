import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction.type';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @HostListener('scroll')
    onScroll() {
        const {nativeElement} = this.elementRef;
        const isScrollTop = nativeElement.scrollTop <= this.borderOffset;

        if (isScrollTop && this.loadDirection !== LoadDirection.top) {
            this.setLoadDirection(LoadDirection.top);

            return;
        }

        const isScrollBottom =
            nativeElement.scrollHeight - nativeElement.scrollTop - nativeElement.clientHeight <=
            this.borderOffset;

        if (isScrollBottom && this.loadDirection !== LoadDirection.bottom) {
            this.setLoadDirection(LoadDirection.bottom);

            return;
        }

        if (!isScrollTop && !isScrollBottom && this.loadDirection !== LoadDirection.idle) {
            this.setLoadDirection(LoadDirection.idle);
        }
    }

    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    private loadDirection: LoadDirection = LoadDirection.idle;
    private readonly borderOffset = 100;

    private setLoadDirection(value: LoadDirection) {
        this.loadDirection = value;
        this.loadData.emit(value);
    }

    constructor(private readonly elementRef: ElementRef) {}
}
