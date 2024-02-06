import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PopupHostService} from './popup-host.service';

@Component({
    selector: 'app-popup-host',
    templateUrl: './popup-host.component.html',
    styleUrls: ['./popup-host.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopupHostComponent {
    readonly popupService = inject(PopupHostService);

    onCloseClick() {
        this.popupService.setTemplate(null);
    }
}
