import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {BehaviorSubject, filter, map, pairwise} from 'rxjs';
import {ScrollState, LoadDirectionEvent} from './load-direction.type';
import {scrollStateToLoadDirectionEventMap} from './utils/scroll-state-to-load-direction-event-map';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @HostListener('scroll', ['$event.target'])
    onScroll(nativeElement: Element) {
        if (this.isScrollTop(nativeElement)) {
            this.scrollState$.next(ScrollState.top);

            return;
        }

        if (this.isScrollBottom(nativeElement)) {
            this.scrollState$.next(ScrollState.bottom);

            return;
        }

        this.scrollState$.next(ScrollState.idle);
    }

    @Output() readonly loadData = new EventEmitter<LoadDirectionEvent>();
    private readonly scrollState$ = new BehaviorSubject<ScrollState>(ScrollState.idle);

    private readonly borderOffset = 100;

    ngOnInit() {
        this.listenScrollState();
    }

    private shouldEmitEvent([oldState, newState]: ScrollState[]) {
        return newState !== ScrollState.idle && newState !== oldState;
    }

    private listenScrollState() {
        this.scrollState$
            .pipe(
                pairwise(),
                filter(e => this.shouldEmitEvent(e)),
                map(([_, s]) => s),
                // takeUntil(this.destroy$),
            )
            .subscribe(state => {
                this.loadData.emit(scrollStateToLoadDirectionEventMap[state]);
            });
    }

    private isScrollTop({scrollTop}: Element) {
        return scrollTop <= this.borderOffset;
    }

    private isScrollBottom({scrollHeight, scrollTop, clientHeight}: Element) {
        return scrollHeight - scrollTop - clientHeight <= this.borderOffset;
    }
}
