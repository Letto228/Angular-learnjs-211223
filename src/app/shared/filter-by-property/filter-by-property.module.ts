import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FilterByPropertyPipe} from './filter-by-property.pipe';

@NgModule({
    declarations: [FilterByPropertyPipe],
    imports: [CommonModule],
    exports: [FilterByPropertyPipe],
})
export class FilterByPropertyModule {}
