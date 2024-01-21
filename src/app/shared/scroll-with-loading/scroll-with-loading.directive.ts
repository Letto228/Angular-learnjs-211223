import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private readonly borderOffsetTop = 100;

    private get borderOffsetBottom(): number {
        return this.elementRef.nativeElement.clientHeight - this.borderOffsetTop;
    }

    private scrollPosBefore = 0;

    constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

    @HostListener('scroll', [
        '$event.target.scrollTop',
        '$event.target.scrollHeight',
        '$event.target.clientHeight',
    ])
    onScroll(scrollTopDiv: number, scrollHeight: number, clientHeight: number) {
        const scrollTopOffset = this.getScrollTopOffset(scrollTopDiv, scrollHeight, clientHeight);
        const loadDirection = this.getLoadDirection(scrollTopOffset);

        if (scrollTopOffset <= this.borderOffsetTop && loadDirection === LoadDirection.Up) {
            this.loadData.emit(LoadDirection.Up);

            return;
        }

        if (scrollTopOffset >= this.borderOffsetBottom && loadDirection === LoadDirection.Down) {
            this.loadData.emit(LoadDirection.Down);
        }
    }

    getScrollTopOffset(scrollTop: number, scrollHeight: number, clientHeight: number) {
        return (
            (this.elementRef.nativeElement.clientHeight * scrollTop) / (scrollHeight - clientHeight)
        );
    }

    getLoadDirection(scrollTop: number): LoadDirection {
        const diff = scrollTop - this.scrollPosBefore;

        this.scrollPosBefore = scrollTop;

        return diff > 0 ? LoadDirection.Down : LoadDirection.Up;
    }
}
