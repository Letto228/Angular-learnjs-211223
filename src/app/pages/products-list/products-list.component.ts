import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    readonly products$ = this.productsStoreService.products$;

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            // eslint-disable-next-line dot-notation
            const subCategoryId = params?.['subCategoryId'];

            this.productsStoreService.loadProducts(subCategoryId);
        });
    }

    trackById(_: number, item: Product): Product['_id'] {
        return item._id;
    }

    navigateToProduct() {
        // this.router.navigateByUrl('/product/id');
        // this.router.navigate(['/product/id']);
        this.router.navigate(['/', 'product', 'id']);
    }
}
