import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() loadData = new EventEmitter<LoadDirection>();

    private readonly borderOffsetTop = 100;

    private scrollPosBefore = 0;

    @HostListener('scroll', ['$event.target'])
    onScroll(target: HTMLElement) {
        const loadDirection = this.getLoadDirection(target.scrollTop);

        this.scrollPosBefore = target.scrollTop;

        if (target.scrollTop <= this.borderOffsetTop && loadDirection === LoadDirection.Before) {
            this.loadData.emit(LoadDirection.Before);

            return;
        }

        if (
            target.scrollTop >= this.getBorderOffsetBottom(target.clientHeight) &&
            loadDirection === LoadDirection.After
        ) {
            this.loadData.emit(LoadDirection.After);
        }
    }

    private getBorderOffsetBottom(clientHeight: number): number {
        return clientHeight - this.borderOffsetTop;
    }

    getLoadDirection(scrollTop: number): LoadDirection {
        return scrollTop > this.scrollPosBefore ? LoadDirection.After : LoadDirection.Before;
    }
}
