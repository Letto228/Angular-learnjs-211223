import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popuphost.component.html',
    styleUrls: ['./popuphost.component.css'],
})
export class PopupHostComponent {
    @Input() set template(template: TemplateRef<unknown> | null) {
        this.isTemplateSet = Boolean(template);

        if (template) {
            this.updateTemplate(template);
        }
    }

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportViewContainerRef: ViewContainerRef | null = null;

    private updateTemplate(template: TemplateRef<unknown>) {
        this.viewportViewContainerRef?.clear();

        if (template) {
            this.viewportViewContainerRef?.createEmbeddedView(template);
        }
    }

    isTemplateSet = false;
}
