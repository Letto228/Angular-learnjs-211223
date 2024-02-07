import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {LoadDirection} from './enum/load-direction';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @Output()
    readonly loadData = new EventEmitter<LoadDirection>();

    private currentScrollTop = 0;

    @HostListener('scroll', ['$event.target'])
    private onScroll({scrollHeight, scrollTop, clientHeight}: HTMLElement): void {
        const scrollBottom = scrollHeight - scrollTop - clientHeight;
        const OFFSET = 100;
        const currentScrollTop = this.currentScrollTop;

        this.currentScrollTop = scrollTop;

        if (scrollBottom < OFFSET && currentScrollTop < scrollTop) {
            this.loadData.emit(LoadDirection.Bottom);

            return;
        }

        if (scrollTop < OFFSET && currentScrollTop > scrollTop) {
            this.loadData.emit(LoadDirection.Top);
        }
    }
}
