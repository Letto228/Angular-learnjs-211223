import {
    AfterViewInit,
    Component,
    Input,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.scss'],
})
export class PopupHostComponent implements AfterViewInit {
    isVisible = false;

    @Input() set template(template: TemplateRef<unknown> | null) {
        this.viewContainer?.clear();
        this.isVisible = false;

        if (template) {
            this.viewContainer?.createEmbeddedView(template);
            this.isVisible = true;
        }
    }

    @ViewChild('viewContainer', {read: ViewContainerRef})
    viewContainer: ViewContainerRef | null = null;

    ngAfterViewInit(): void {
        if (!this.viewContainer?.length) {
            this.isVisible = false;
        }
    }
}
