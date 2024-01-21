import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from '../load-direction/load-direction.enum';

@Directive({
    selector: '[appInfinityScroll]',
})
export class InfinityScrollDirective {
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    private readonly borderOffset = 100;
    private lastScrollTop = 0;

    @HostListener('scroll', ['$event', '$event.target']) onScroll(
        event: MouseEvent,
        elem: HTMLElement,
    ) {
        this.borderObserver(elem);
        event.stopPropagation();
    }

    private borderObserver(elem: HTMLElement) {
        if (elem) {
            const CURRENT_SCROLL_TOP = elem.scrollTop;
            const HEIGHT = elem.getBoundingClientRect().height;
            const SCROLL_HEIGHT = elem.scrollHeight;

            if (
                SCROLL_HEIGHT - (HEIGHT + CURRENT_SCROLL_TOP) <= this.borderOffset &&
                this.lastScrollTop < CURRENT_SCROLL_TOP
            ) {
                this.loadData.emit(LoadDirection.fromBottom);
            } else if (
                CURRENT_SCROLL_TOP <= this.borderOffset &&
                this.lastScrollTop > CURRENT_SCROLL_TOP
            ) {
                this.loadData.emit(LoadDirection.fromTop);
            }

            this.lastScrollTop = CURRENT_SCROLL_TOP;
        }
    }
}
