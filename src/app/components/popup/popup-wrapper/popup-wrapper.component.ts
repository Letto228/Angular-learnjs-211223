import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-wrapper',
    templateUrl: './popup-wrapper.component.html',
    styleUrls: ['./popup-wrapper.component.css'],
})
export class PopupWrapperComponent {
    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportViewContainerRef: ViewContainerRef | null = null;

    @Input() set template(value: TemplateRef<unknown> | null) {
        if (value) {
            this.viewportViewContainerRef?.clear();
            this.viewportViewContainerRef?.createEmbeddedView(value);
        }
    }
}
