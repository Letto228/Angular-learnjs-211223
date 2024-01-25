import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './scroll-with-loading.interface';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class AppScrollWithLoadingDirective {
    @Output() loadData: EventEmitter<LoadDirection> = new EventEmitter<LoadDirection>();

    private readonly borderOffset = 100;
    private tempScrollTop = 0;
    constructor(private readonly el: ElementRef) {}

    @HostListener('scroll', ['$event.target'])
    onScroll({scrollTop, scrollHeight}: HTMLElement): void {
        const scrollBottom = scrollTop + window.innerHeight;

        if (scrollTop > this.tempScrollTop) {
            if (scrollBottom >= scrollHeight - this.borderOffset) {
                this.loadData.emit(LoadDirection.Down);
            }
        } else if (scrollTop < this.tempScrollTop) {
            if (scrollTop <= this.borderOffset) {
                this.loadData.emit(LoadDirection.Up);
            }
        }

        this.tempScrollTop = scrollTop;
    }
}
