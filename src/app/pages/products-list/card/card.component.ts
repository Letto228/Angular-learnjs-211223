import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | null = null;
    @Output() readonly addToCart = new EventEmitter<string>();

    onAddToCart(): void {
        if (this.product) {
            this.addToCart.emit(this.product._id);
        }
    }

    isStarActive(starIndex: number): boolean {
        return starIndex <= (this.product?.rating ?? 0);
    }
}
