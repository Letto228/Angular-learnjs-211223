import {Component} from '@angular/core';
import {IProduct} from '../../shared/products/product.interface';
import {productsMock} from '../../shared/products/products.mock';
import {LoadDirection} from '../../shared/load-direction/load-direction.enum';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    productsStore: IProduct[] | null = null;

    get products(): IProduct[] | null {
        // eslint-disable-next-line no-console
        // console.log('Products calculated');

        return this.productsStore;
    }

    constructor() {
        setTimeout(() => {
            this.productsStore = productsMock;
        }, 3000);
    }

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    onLoad(event: LoadDirection): void {
        // eslint-disable-next-line no-console
        console.log(event);
    }
}
