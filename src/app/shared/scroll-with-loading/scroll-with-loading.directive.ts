import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './enum/load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output()
    loadData = new EventEmitter<LoadDirection>();

    private readonly borderOffset = 100;
    private prevScrollTop = -1;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, clientHeight, scrollHeight}: HTMLElement) {
        const prevScrollTop = this.prevScrollTop;

        this.prevScrollTop = scrollTop;

        const lowerScrollPosition = scrollHeight - clientHeight;
        const loadDown = this.isScrollBottom(scrollTop, lowerScrollPosition, prevScrollTop);
        const loadTop = this.isScrollTop(scrollTop, prevScrollTop);

        if (loadDown) {
            this.loadData.emit(LoadDirection.After);

            return;
        }

        if (loadTop) {
            this.loadData.emit(LoadDirection.Before);
        }
    }

    private isScrollTop(scrollTop: number, prevScrollTop: number): boolean {
        return scrollTop < this.borderOffset && scrollTop < prevScrollTop;
    }

    private isScrollBottom(
        scrollTop: number,
        lowerScrollPosition: number,
        prevScrollTop: number,
    ): boolean {
        return lowerScrollPosition - scrollTop < this.borderOffset && scrollTop > prevScrollTop;
    }
}
