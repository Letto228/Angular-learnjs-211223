import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {PopupHostService} from './popup-host.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent implements OnInit, OnDestroy {
    private readonly template$ = this.popupHostService.currentTemplate$;
    private readonly destroy$ = new Subject<void>();

    @ViewChild('container', {read: ViewContainerRef, static: true})
    container: ViewContainerRef | null = null;

    constructor(readonly popupHostService: PopupHostService) {}

    ngOnInit(): void {
        this.template$.pipe(takeUntil(this.destroy$)).subscribe(view => {
            this.container?.clear();

            if (view) {
                this.shouldShowPopup = false;
                // this.container?.createEmbeddedView(template);
                this.container?.insert(view);

                return;
            }

            this.shouldShowPopup = true;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    @HostBinding('class.empty') shouldShowPopup = true;
}
