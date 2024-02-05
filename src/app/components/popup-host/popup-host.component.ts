import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent {
    @Input()
    set template(value: TemplateRef<unknown> | null) {
        this.popupViewContainer?.clear();

        if (value !== null) {
            this.popupViewContainer?.createEmbeddedView(value);
        }
    }

    @ViewChild('popupViewPort', {read: ViewContainerRef})
    protected readonly popupViewContainer?: ViewContainerRef;

    protected get shouldHideContainer(): boolean {
        return !this.popupViewContainer?.length;
    }
}
