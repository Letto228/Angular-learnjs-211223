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
    private readonly templateData$ = this.popupHostService.currentTemplateData$;
    private readonly destroy$ = new Subject<void>();

    @HostBinding('class.empty') shouldShowPopup = true;

    @ViewChild('container', {read: ViewContainerRef, static: true})
    private readonly container: ViewContainerRef | null = null;

    constructor(private readonly popupHostService: PopupHostService) {}

    ngOnInit(): void {
        this.listenTemplate();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private listenTemplate() {
        this.templateData$.pipe(takeUntil(this.destroy$)).subscribe(templateData => {
            this.container?.clear();
            this.shouldShowPopup = !templateData?.template;

            if (templateData?.template) {
                this.container?.createEmbeddedView(templateData.template, templateData?.context);
            }
        });
    }

    closePopup() {
        this.popupHostService.closePopup();
    }
}
