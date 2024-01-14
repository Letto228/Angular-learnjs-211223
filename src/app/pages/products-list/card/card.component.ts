import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
    @Input({required: true})
    product: IProduct | null = null;

    @Output()
    productId = new EventEmitter<string>();

    imageUrl = '';

    ngOnInit(): void {
        if (this.product?.images) {
            this.imageUrl = this.product.images[0].url;
        }
    }

    onProductBuy(event: Event) {
        event.stopPropagation();

        // eslint-disable-next-line no-console
        this.productId.emit(this.product?._id);
    }

    isStarActive(starIndex: number): boolean | null {
        return this.product ? this.product?.rating >= starIndex : null;
    }
}
