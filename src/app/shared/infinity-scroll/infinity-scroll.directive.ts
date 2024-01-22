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

    private borderObserver(elem: HTMLElement) {
        const currentScrollTop = elem.scrollTop;
        const scrollHeight = elem.scrollHeight;
        const height = elem.offsetHeight;
        const isScrollToBottom = this.lastScrollTop < currentScrollTop;

        const nearBottom = scrollHeight - (height + currentScrollTop) <= this.borderOffset;

        if (nearBottom && isScrollToBottom) {
            this.loadData.emit(LoadDirection.fromBottom);

            this.lastScrollTop = currentScrollTop;

            return;
        }

        const nearTop = currentScrollTop <= this.borderOffset;

        if (nearTop && !isScrollToBottom) {
            this.loadData.emit(LoadDirection.fromTop);

            this.lastScrollTop = currentScrollTop;
        }
    }
}
