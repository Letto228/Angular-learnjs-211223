import {
    Component,
    Input,
    TemplateRef,
    ViewContainerRef,
    ViewChild,
    OnChanges,
    SimpleChanges,
} from '@angular/core';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
})
export class PopupHostComponent implements OnChanges {
    @Input() template: TemplateRef<unknown> | undefined;

    @ViewChild('viewport', {read: ViewContainerRef, static: true})
    private readonly viewContainer: ViewContainerRef | undefined;

    isOpened = false;

    ngOnChanges({template}: SimpleChanges): void {
        this.isOpened = !!template.currentValue; // для стилизации

        template && this.updateView();
    }

    private updateView() {
        this.viewContainer?.clear();

        if (this.template) {
            this.viewContainer?.createEmbeddedView(this.template);
        }
    }
}
