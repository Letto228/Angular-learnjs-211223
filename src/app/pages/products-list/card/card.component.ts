import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    get imageUrl() {
        if (this.product) {
            return this.product.images[0].url;
        }

        return undefined;
    }

    @Input({required: true})
    product: IProduct | null = null;

    @Output()
    readonly productId = new EventEmitter<IProduct>();

    onProductBuy(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line no-console
        if (this.product) {
            this.productId.emit(this.product);
        }
    }

    isStarActive(starIndex: number): boolean {
        return Number(this.product?.rating) >= starIndex;
    }
}
