import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | null = null;
    @Output() readonly addToCart = new EventEmitter<string>();

    get coverUrl() {
        return this.product ? this.product.images[0].url : 'link to error.img';
    }

    onProductBuy(event: Event) {
        event.stopPropagation();

        this.product && this.addToCart.emit(this.product._id);

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return !!this.product && this.product.rating >= starIndex;
    }
}
