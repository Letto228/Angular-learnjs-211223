import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './load-direction.type';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @HostListener('scroll', ['$event.target'])
    onScroll(nativeElement: Element) {
        if (this.isScrollTop(nativeElement)) {
            this.setScrollState(LoadDirection.top);

            return;
        }

        if (this.isScrollBottom(nativeElement)) {
            this.setScrollState(LoadDirection.bottom);

            return;
        }

        this.setScrollState(LoadDirection.idle);
    }

    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    private currentScrollState: LoadDirection = LoadDirection.idle;

    private readonly borderOffset = 100;

    private setScrollState(newState: LoadDirection) {
        if (this.currentScrollState !== newState) {
            this.currentScrollState = newState;
            this.emit(this.currentScrollState);
        }
    }

    private emit(e: LoadDirection) {
        if (e !== LoadDirection.idle) {
            this.loadData.emit(e);
        }
    }

    private isScrollTop({scrollTop}: Element) {
        return scrollTop <= this.borderOffset;
    }

    private isScrollBottom({scrollHeight, scrollTop, clientHeight}: Element) {
        return scrollHeight - scrollTop - clientHeight <= this.borderOffset;
    }
}
