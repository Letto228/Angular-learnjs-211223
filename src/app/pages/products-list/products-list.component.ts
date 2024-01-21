import {Component} from '@angular/core';
import {LoadDirection} from 'src/app/shared/scroll-with-loading/load-direction.type';
import {IProduct} from '../../shared/products/product.interface';
import {productsMock} from '../../shared/products/products.mock';

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

    onLoad(e: LoadDirection) {
        // eslint-disable-next-line no-console
        console.log(e);
    }
}
