import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    product = productMock;
    cover = this.product.images[0];

    // eslint-disable-next-line no-console
    buyNow = () => console.log('Buy now');
}
