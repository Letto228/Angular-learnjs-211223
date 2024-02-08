import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {Product} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit, OnDestroy {
    readonly products$ = this.productsStoreService.products$;
    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly productsStoreService: ProductsStoreService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.activatedRoute.paramMap.pipe(takeUntil(this.destroy$)).subscribe(paramMap => {
            this.productsStoreService.loadProducts(paramMap.get('id'));
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
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
