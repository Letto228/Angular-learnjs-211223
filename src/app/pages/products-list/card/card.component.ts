import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input()
    product: IProduct | null = null;

    @Output()
    readonly productIsAddedChange = new EventEmitter<IProduct['_id']>();

    protected isDisabledBuyButton = false;

    onProductBuy(): void {
        if (this.product) {
            this.productIsAddedChange.emit(this.product._id);
            this.isDisabledBuyButton = true;
        }
    }

    isStarActive(starIndex: number): boolean {
        return this.product ? this.product.rating >= starIndex : false;
    }
}
