import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | null = null;
    @Output() readonly buyClick = new EventEmitter<string>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        if (this.product) {
            // eslint-disable-next-line no-console
            console.log('Send Product id to product-list:', this.product._id);
            this.buyClick.emit(this.product._id);
        }
    }

    get imageSrc(): string {
        return this.product ? this.product.images[0].url : '';
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
