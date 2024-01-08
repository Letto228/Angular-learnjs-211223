import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    protected mocks: IProduct = productMock;
    protected price = this.mocks.price;
    protected image = this.mocks.images[0].url;

    protected buyItem(event: Event): void {
        // eslint-disable-next-line no-console
        console.log('Click');
        event.stopPropagation();
    }
}
