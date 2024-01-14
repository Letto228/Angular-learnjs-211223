import {Component} from '@angular/core';
import {productsMock} from '../../shared/products/products.mock';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    readonly mockData = productsMock;

    onAddToCart(id: string): void {
        // eslint-disable-next-line no-console
        console.log('Add to cart clicked | ProductsList', id);
    }
}
