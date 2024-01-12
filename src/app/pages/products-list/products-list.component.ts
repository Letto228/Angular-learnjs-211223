import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IProduct} from '../../shared/products/product.interface';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    @Input() cards: IProduct[] | null = null;
    // ToDo: Опять же вопрос на сколько правильно просто дублировать и прокидывать выше?
    @Output() addToCart = new EventEmitter<string>();

    onAddToCart(id: string): void {
        // eslint-disable-next-line no-console
        this.addToCart.emit(id);
    }
}
