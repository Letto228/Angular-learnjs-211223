import { Component } from '@angular/core';
import { productMock } from '../../../shared/products/product.mock';

@Component({
    selector: 'app-card-item',
    templateUrl: './card-item.component.html',
    styleUrls: ['./styles/card-item.scss'],
})
export class CardItemComponent {
    public price: number = productMock.price;
    public imageUrl: string = productMock.images[0].url;

    constructor(){}

    public buyProduct(): void {
      console.log('Товар куплен!')
    }
}
