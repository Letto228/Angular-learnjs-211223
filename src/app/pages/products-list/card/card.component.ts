import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    readonly card = productMock;
    formattedPrice = `${this.card.price} ₽`;

    onButtonClick(e: Event) {
        e.stopPropagation();
        // eslint-disable-next-line no-console
        console.log('button');
    }

    onCardClick() {
        // eslint-disable-next-line no-console
        console.log('card');
    }
}
