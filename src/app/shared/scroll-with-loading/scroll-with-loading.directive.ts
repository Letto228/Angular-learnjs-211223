import {Directive, EventEmitter, HostListener, Output} from '@angular/core';
import {BehaviorSubject, Subject, filter, map, pairwise, takeUntil} from 'rxjs';
import {ScrollState, LoadDirectionEvent} from './load-direction.type';
import {scrollStateToLoadDirectionEventMap} from './utils/scroll-state-to-load-direction-event-map';
import {isScrollReachedTopBorder} from './utils/is-scroll-reached-top-border';
import {isScrollReachedBottomBorder} from './utils/is-scroll-reached-bottom-border';

@Directive({
    selector: '[appScrollWithLoading]',
})
export class ScrollWithLoadingDirective {
    @HostListener('scroll', ['$event.target'])
    onScroll(nativeElement: Element) {
        if (isScrollReachedTopBorder(nativeElement)) {
            this.scrollState$.next(ScrollState.top);

            return;
        }

        if (isScrollReachedBottomBorder(nativeElement)) {
            this.scrollState$.next(ScrollState.bottom);

            return;
        }

        this.scrollState$.next(ScrollState.idle);
    }

    @Output() readonly loadData = new EventEmitter<LoadDirectionEvent>();
    private readonly scrollState$ = new BehaviorSubject<ScrollState>(ScrollState.idle);
    private readonly destroy$ = new Subject<void>();

    ngOnInit() {
        this.listenScrollState();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private shouldEventEmit([previousState, currentState]: ScrollState[]) {
        return currentState !== ScrollState.idle && currentState !== previousState;
    }

    private listenScrollState() {
        this.scrollState$
            .pipe(
                pairwise(),
                filter(e => this.shouldEventEmit(e)),
                map(([_, scrollState]) => scrollStateToLoadDirectionEventMap[scrollState]),
                takeUntil(this.destroy$),
            )
            .subscribe(loadDirectionEvent => {
                this.loadData.emit(loadDirectionEvent);
            });
    }
}
