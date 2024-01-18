import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popuphost.component.html',
    styleUrls: ['./popuphost.component.css'],
})
export class PopupHostComponent {
    @Input() set template(template: TemplateRef<unknown> | null) {
        this.isTemplateSet = template !== null;

        if (template) {
            this.updateTemplate(template);
        }
    }

    @ViewChild('viewport', {read: ViewContainerRef})
    private readonly viewportViewContainerRef: ViewContainerRef | null = null;

    private updateTemplate(template: TemplateRef<unknown>) {
        this.viewportViewContainerRef?.clear();

        if (template) {
            this.viewportViewContainerRef?.createEmbeddedView(template);
        }
    }

    isTemplateSet = false;
}
