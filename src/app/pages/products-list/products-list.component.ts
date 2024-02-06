import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs';
import {Product} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.queryParamMap.pipe(
        map(queryParamMap => queryParamMap.get('subCat')),
        tap(subcategoryId => {
            this.productsStoreService.loadProducts(subcategoryId);
        }),
        switchMap(() => this.productsStoreService.products$),
    );

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) {}

    trackById(_: number, item: Product): Product['_id'] {
        return item._id;
    }

    navigateToProduct() {
        // this.router.navigateByUrl('/product/id');
        // this.router.navigate(['/product/id']);
        this.router.navigate(['/', 'product', 'id']);
    }
}
