import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from 'src/app/shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent {
    @Input() product: IProduct | undefined;

    @Output() readonly productBuy = new EventEmitter<IProduct | undefined>();

    onProductBuy(event: MouseEvent) {
        event.stopPropagation();
        this.productBuy.emit(this.product);

        // eslint-disable-next-line no-console
        console.log('Buy product');
    }

    isStarActive(starIndex: number): boolean {
        return Number(this.product?.rating) >= starIndex;
    }
}
