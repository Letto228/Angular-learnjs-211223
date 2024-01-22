import {
    Component,
    Input,
    TemplateRef,
    ViewContainerRef,
    ViewChild,
    OnChanges,
    SimpleChanges,
    Output,
    EventEmitter,
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
    @Output() isOpenedChange = new EventEmitter<boolean>();

    ngOnChanges({template}: SimpleChanges): void {
        if (template) {
            const IS_FIRST_CHANGE = template.firstChange;
            const HAVE_CURRENT_VALUE = template.currentValue;
            const HAVE_PREVIOUS_VALUE = template.previousValue;
            const IS_OPENED = this.isOpened;

            if (
                (IS_FIRST_CHANGE !== true &&
                    HAVE_CURRENT_VALUE !== undefined &&
                    HAVE_PREVIOUS_VALUE !== undefined) ||
                (IS_FIRST_CHANGE === true && IS_OPENED === true)
            ) {
                this.updateView();

                return;
            }

            if (
                IS_FIRST_CHANGE !== true &&
                (HAVE_CURRENT_VALUE === undefined || HAVE_PREVIOUS_VALUE === undefined)
            ) {
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
