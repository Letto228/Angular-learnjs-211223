import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from '../load-direction/load-direction.enum';

@Directive({
    selector: '[appInfinityScroll]',
})
export class InfinityScrollDirective {
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    private readonly borderOffset = 100;
    private lastScrollTop = 0;

    @HostListener('scroll', ['$event.target']) onScroll(elem: HTMLElement) {
        this.borderObserver(elem);
    }

    private borderObserver({scrollTop, scrollHeight, offsetHeight}: HTMLElement) {
        const isScrollToBottom = this.lastScrollTop < scrollTop;
        const nearBottom = scrollHeight - (offsetHeight + scrollTop) <= this.borderOffset;

        this.lastScrollTop = scrollTop;

        if (nearBottom && isScrollToBottom) {
            this.loadData.emit(LoadDirection.fromBottom);

            return;
        }

        const nearTop = scrollTop <= this.borderOffset;

        if (nearTop && !isScrollToBottom) {
            this.loadData.emit(LoadDirection.fromTop);
        }
    }
}
