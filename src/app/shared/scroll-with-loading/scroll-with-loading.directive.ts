import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './scroll-with-loading.interface';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class AppScrollWithLoadingDirective {
    @Output() loadData: EventEmitter<LoadDirection> = new EventEmitter<LoadDirection>();

    private readonly borderOffset = 100;
    private tempScrollTop = 0;

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, scrollHeight, clientHeight}: HTMLElement): void {
        const isScrollToTop = this.tempScrollTop > scrollTop;
        const isNearTop = scrollTop >= this.borderOffset;

        if (isScrollToTop && isNearTop) {
            this.loadData.emit(LoadDirection.Up);

            return;
        }

        const isNearBottom = scrollTop <= scrollHeight - clientHeight - this.borderOffset;

        if (!isScrollToTop && isNearBottom) {
            this.loadData.emit(LoadDirection.Down);
        }

        this.tempScrollTop = scrollTop;
    }
}
