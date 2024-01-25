import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationControlComponent} from './pagination-control.component';

@NgModule({
    declarations: [PaginationControlComponent],
    imports: [CommonModule],
    exports: [PaginationControlComponent],
})
export class PaginationControlModule {}
