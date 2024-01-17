import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopupHostComponent} from './popup-host.component';
import {PopupWrapperModule} from '../popup-wrapper/popup-wrapper.module';

@NgModule({
    declarations: [PopupHostComponent],
    imports: [CommonModule, PopupWrapperModule],
    exports: [PopupHostComponent],
})
export class PopupHostModule {}
