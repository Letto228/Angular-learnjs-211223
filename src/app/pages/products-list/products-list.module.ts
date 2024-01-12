import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsListComponent} from './products-list.component';
import {CardItemModule} from './card/card-item.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [CommonModule, CardItemModule],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
