import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Product} from '../../shared/products/product.interface';
import {ProductsStoreService} from '../../shared/products/products-store.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
    // readonly products$ = of(productsMock);
    // readonly productsStoreService = new ProductsStoreService();
    readonly products$ = this.productsStoreService.products$;

    // for easy
    // name = null;

    // for hard
    readonly propertyName = 'price' as const;
    searchPropertyValue = 83;

    constructor(
        // @Inject(ProductsStoreService) private readonly productsStoreService: ProductsStoreService,
        // ~
        private readonly productsStoreService: ProductsStoreService, // @Inject('ProductsStoreServiceString') // private readonly productsStoreServiceString: ProductsStoreService, // @Inject('baseUrl') // private readonly baseUrl: string, // @Inject('productsStream$') // readonly products$: Observable<Product[] | null>,
    ) {
        // console.log(productsStoreServiceString === productsStoreService);
        // console.log(baseUrl);
    }

    // constructor(@Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef) {
    // constructor(private readonly changeDetectorRef: ChangeDetectorRef) {
    // setTimeout(() => {
    //     this.products = productsMock;

    //     this.changeDetectorRef.markForCheck();
    // }, 3000);
    // setTimeout(() => {
    //     this.products = productsMock.map(item => ({...item, price: 1000}));

    //     this.changeDetectorRef.markForCheck();
    // }, 5000);
    // }

    ngOnInit(): void {
        this.productsStoreService.loadProducts();
    }

    trackById(_: number, item: Product): Product['_id'] {
        return item._id;
    }
}
