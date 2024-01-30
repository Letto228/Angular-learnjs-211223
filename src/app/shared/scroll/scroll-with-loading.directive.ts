import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from '../load-direction/load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', [
        '$event.target.scrollHeight',
        '$event.target.scrollTop',
        '$event.target.offsetHeight',
    ])
    onScroll(scrollHeight: number, scrollTop: number, offsetHeight: number) {
        const scroll = Math.round(scrollTop + offsetHeight);
        const offset = scrollHeight - this.borderOffset;
        const isScrollToTop = this.lastScrollTop > scrollTop;
        const isNearTop = scrollTop < this.borderOffset;

        if (isScrollToTop && isNearTop) {
            this.loadData.emit(LoadDirection.ScrollTop);

            return;
        }

        const isNearBottom = scroll > offset;

        if (!isScrollToTop && isNearBottom) {
            this.loadData.emit(LoadDirection.ScrollBottom);
        }

        this.lastScrollTop = scrollTop;
    }

    lastScrollTop = 0;
    readonly borderOffset = 100;
}
