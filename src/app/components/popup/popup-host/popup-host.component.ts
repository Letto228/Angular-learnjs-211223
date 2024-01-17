import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @ViewChild(TemplateRef, {static: true})
    private readonly popupWrapperTemplate: TemplateRef<unknown> | null = null;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportViewContainerRef: ViewContainerRef | null = null;

    templateValue: TemplateRef<unknown> | null = null;
    @Input() set template(value: TemplateRef<unknown> | null) {
        this.templateValue = value;
        this.viewportViewContainerRef?.clear();

        if (this.popupWrapperTemplate && value) {
            this.viewportViewContainerRef?.createEmbeddedView(this.popupWrapperTemplate);
        }
    }
}
