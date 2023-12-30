import {Component} from '@angular/core';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
    testCardClick() {
        // eslint-disable-next-line no-console
        console.log('клик по карточке');
    }
}
