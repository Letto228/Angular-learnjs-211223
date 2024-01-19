import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewportViewContainerRef: ViewContainerRef | null = null;

    isPopupHidden = true;

    @Input() set template(value: TemplateRef<unknown> | null) {
        this.viewportViewContainerRef?.clear();
        this.isPopupHidden = !value;

        if (value) {
            this.viewportViewContainerRef?.createEmbeddedView(value);
        }
    }
}
