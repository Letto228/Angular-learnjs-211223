import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfinityScrollModule} from 'src/app/shared/infinity-scroll/infinity-scroll.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProductsListComponent} from './products-list.component';
import {CardModule} from './card/card.module';
import {DumpNgIfModule} from '../../shared/dump-ng-if/dump-ng-if.module';

@NgModule({
    declarations: [ProductsListComponent],
    imports: [
        CommonModule,
        CardModule,
        DumpNgIfModule,
        MatProgressSpinnerModule,
        InfinityScrollModule,
    ],
    exports: [ProductsListComponent],
})
export class ProductsListModule {}
