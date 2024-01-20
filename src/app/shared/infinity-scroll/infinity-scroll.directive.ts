import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {LoadDirection} from '../load-direction/load-direction.enum';

@Directive({
    selector: '[appInfinityScroll]',
})
export class InfinityScrollDirective {
    constructor() {
        this.lastScrollTop = this.scrollContainer?.scrollTop || 0;
    }

    @Input() scrollContainer: HTMLElement | undefined;
    @Output() readonly loadData = new EventEmitter<LoadDirection>();

    private readonly borderOffset = 100;
    private lastScrollTop: number;

    @HostListener('scroll') onScroll() {
        this.borderObserver();
    }

    private borderObserver() {
        if (this.scrollContainer) {
            const currentScrollTop = this.scrollContainer.scrollTop;
            // console.log(currentScrollTop, 'current');

            if (currentScrollTop <= this.borderOffset && this.lastScrollTop > currentScrollTop) {
                this.loadData.emit(LoadDirection.fromTop);
            }

            if (
                this.scrollContainer.scrollHeight -
                    (this.scrollContainer.getBoundingClientRect().height + currentScrollTop) <=
                    this.borderOffset &&
                this.lastScrollTop < currentScrollTop
            ) {
                this.loadData.emit(LoadDirection.fromBottom);
            }

            this.lastScrollTop = currentScrollTop;
            // console.log(this.lastScrollTop, 'last');
        }
    }
}
