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
            const IS_FIRST_CHANGE = template.firstChange === true;
            const HAVE_CURRENT_VALUE = template.currentValue !== undefined;
            const HAVE_PREVIOUS_VALUE = template.previousValue !== undefined;
            const IS_OPENED = this.isOpened === true;

            if (
                (!IS_FIRST_CHANGE && HAVE_CURRENT_VALUE && HAVE_PREVIOUS_VALUE) ||
                (IS_FIRST_CHANGE && IS_OPENED)
            ) {
                this.updateView();

                return;
            }

            if (!IS_FIRST_CHANGE && (!HAVE_CURRENT_VALUE || !HAVE_PREVIOUS_VALUE)) {
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
