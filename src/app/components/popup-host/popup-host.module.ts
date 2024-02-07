import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrossSvgModule} from 'src/app/shared/cross-svg/cross-svg.module';
import {PopupHostComponent} from './popup-host.component';

@NgModule({
    declarations: [PopupHostComponent],
    imports: [CommonModule, CrossSvgModule],
    exports: [PopupHostComponent],
})
export class PopupHostModule {}
