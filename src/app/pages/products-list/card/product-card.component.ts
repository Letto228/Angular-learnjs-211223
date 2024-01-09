import {Component} from '@angular/core';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
    readonly product = productMock;

    buyClick(event: MouseEvent) {
        event.stopPropagation();
        // eslint-disable-next-line no-console
        console.log('buy click');
    }
}
