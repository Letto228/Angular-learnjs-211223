import {Component} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';
import {productMock} from 'src/app/shared/products/product.mock';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    protected readonly product = productMock;

    protected onAddClick(event: MouseEvent, productName: IProduct['name']): void {
        event.stopPropagation();
        // eslint-disable-next-line no-console
        console.log(productName);
    }
}
