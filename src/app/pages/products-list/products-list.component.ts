import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productsMock} from 'src/app/shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    protected readonly products = productsMock;

    onProductBuy(productId: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(`${productId} was added to cart`);
    }
}
