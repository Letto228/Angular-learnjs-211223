import {Component} from '@angular/core';
import {productMock} from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly product = productMock;
    readonly mainImageSrc = this.product.images[0].url;

    addToCard(event: MouseEvent | TouchEvent) {
        // eslint-disable-next-line no-console
        console.log(`${this.product.name} product added to cart`);
        event.stopPropagation();
    }
}
