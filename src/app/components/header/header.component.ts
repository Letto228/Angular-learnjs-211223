import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
} from '@angular/core';
import {ApplicationConfig} from '../../shared/application-config/application-config.interface';
import {PopupHostService} from '../popup-host/popup-host.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    @Input() applicationConfig: ApplicationConfig | null = null;

    @Output() readonly menuClick = new EventEmitter<void>(true);

    constructor(private readonly popupHostService: PopupHostService) {}

    onMenuClick() {
        this.menuClick.emit();
    }

    openPopup(template: TemplateRef<{$implicit?: string}>) {
        this.popupHostService.openPopup(template, {$implicit: this.applicationConfig?.title});
    }

    closePopup() {
        this.popupHostService.closePopup();
    }
}
