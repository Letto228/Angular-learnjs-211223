import {Component, Input, TemplateRef, ViewContainerRef, ViewChild, OnChanges} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges {
    @Input() template: TemplateRef<unknown> | undefined;

    @ViewChild('viewport', {read: ViewContainerRef, static: true}) private readonly viewContainer:
        | ViewContainerRef
        | undefined;

    ngOnChanges(): void {
        this.viewContainer?.clear();

        if (this.template) {
            this.viewContainer?.createEmbeddedView(this.template);
        }
    }
}
