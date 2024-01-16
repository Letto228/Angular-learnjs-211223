import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly productMock = productsMock;

    getProductId(roduct: IProduct): void {
        // eslint-disable-next-line no-console
        console.log(`Куплен товар с id: ${roduct._id}`);
    }
}
