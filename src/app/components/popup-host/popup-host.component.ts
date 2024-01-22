import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.scss'],
})
export class PopupHostComponent {
    isVisible = false;

    @Input() set template(template: TemplateRef<unknown> | null) {
        this.viewContainer?.clear();
        this.isVisible = Boolean(template);

        if (template) {
            this.viewContainer?.createEmbeddedView(template);
        }
    }

    @ViewChild('viewContainer', {read: ViewContainerRef})
    viewContainer: ViewContainerRef | null = null;
}
