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

    @Input() isOpened = false;

    ngOnChanges({template}: SimpleChanges): void {
        if (template) {
            const isFirstChange = template.firstChange === true;
            const haveCurrentValue = template.currentValue !== undefined;
            const havePreviousValue = template.previousValue !== undefined;
            const isOpened = this.isOpened === true;

            const isSwitch =
                (!isFirstChange && haveCurrentValue && havePreviousValue) ||
                (isFirstChange && isOpened);

            if (isSwitch) {
                this.updateView();

                return;
            }

            const isOpenAndClose = !isSwitch;

            if (isOpenAndClose) {
                this.updateView();
            }
        }
    }

    private updateView() {
        this.viewContainer?.clear();

        if (this.template) {
            this.viewContainer?.createEmbeddedView(this.template);
        }
    }
}
