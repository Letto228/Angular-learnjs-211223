import {Component} from '@angular/core';
import {IProduct} from '../../shared/products/product.interface';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.scss'],
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
        setTimeout(() => {
            // this.productsStore = [...productsMock];
            this.productsStore = productsMock.map(item => ({...item, feedbacksCount: 0}));
        }, 5000);
    }

    onProductBuy(id: IProduct['_id']) {
        // eslint-disable-next-line no-console
        console.log(id);
    }

    // trackBy(_: number, item: IProduct): IProduct {
    //     return item;
    // }

    trackById(_: number, item: IProduct): IProduct['_id'] {
        return item._id;
    }

    // trackByFeedback(_: number, item: IProduct): IProduct['feedbacksCount'] {
    //     return item.feedbacksCount;
    // }

    // onLoad(direction: LoadDirection) {
    //     // eslint-disable-next-line no-console
    //     console.log(`load ${direction}`);
    // }
}
