import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: null | IProduct = null;
    @Output() readonly productBuy = new EventEmitter<string>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.product) {
            this.productBuy.emit(this.product._id);
        }
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
