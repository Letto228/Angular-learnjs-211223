import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from '../load-direction/load-direction.enum';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    @HostListener('scroll', ['$event.target.offsetHeight', '$event.target.scrollTop'])
    onScroll(offsetHeight: number, scrollTop: number) {
        const top = scrollTop;
        const offsetBottom = offsetHeight - this.borderOffset;

        if (this.lastScrollTop > top) {
            if (scrollTop < this.borderOffset) {
                this.loadData.emit(LoadDirection.ScrollTop);
            }
        } else if (this.lastScrollTop < top) {
            if (scrollTop > offsetBottom) {
                this.loadData.emit(LoadDirection.ScrollBottom);
            }
        }

        this.lastScrollTop = top;
    }

    lastScrollTop = 0;
    borderOffset = 100;
}
