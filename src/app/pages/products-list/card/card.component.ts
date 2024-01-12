import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {IProduct} from '../../../shared/products/product.interface';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
    @Input() card: IProduct | null = null;
    @Output() addToCart = new EventEmitter<string>();
    rating = 0;

    // Todo: Я помню ты говорил что надо через родителя, а такой вариант не подходит?
    ngOnInit(): void {
        if (this.card) {
            this.rating = this.card.rating;
        }
    }

    onAddToCart(): void {
        if (this.card) {
            this.addToCart.emit(this.card?._id);
        }
    }

    isStarActive(starIndex: number): boolean {
        return starIndex <= this.rating;
    }
}
