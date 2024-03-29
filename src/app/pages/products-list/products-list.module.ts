import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {PaginationModule} from '../../shared/pagination/pagination.module';
import {FilterByPropertyModule} from '../../shared/filter-by-property/filter-by-property.module';
import {ProductsListRoutingModule} from './products-list-routing.module';
import {FilterModule} from './filter/reactive/filter.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [
        ProductsListRoutingModule,
        CommonModule,
        CardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        PaginationModule,
        FilterByPropertyModule,
        RouterModule,
        FilterModule,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
