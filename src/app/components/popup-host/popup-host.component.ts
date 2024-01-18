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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['template']) {
            if (
                (changes['template'].firstChange !== true &&
                    changes['template'].currentValue !== undefined &&
                    changes['template'].previousValue !== undefined) ||
                (changes['template'].firstChange === true && this.isOpened === true)
            ) {
                this.updateView();
            } else if (
                changes['template'].firstChange !== true &&
                (changes['template'].currentValue === undefined ||
                    changes['template'].previousValue === undefined)
            ) {
                this.isOpenedChange.emit(this.isOpened);
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
