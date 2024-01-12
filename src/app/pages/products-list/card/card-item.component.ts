import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./card-item.scss'],
})
export class CardItemComponent {
    readonly productMock = productMock;

    buyProduct(): void {
        // eslint-disable-next-line no-console
        console.log('Товар куплен!');
    }
}
