import {Component} from '@angular/core';
import {applicationConfigMock} from './shared/application-config/application-config.mock';
import {productsMock} from './shared/products/products.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    readonly applicationConfig = applicationConfigMock;
    readonly mockData = productsMock;

    // isSidenavOpenedApp = false;

    // onMenuClick() {
    //     this.isSidenavOpenedApp = !this.isSidenavOpenedApp;

    //     // eslint-disable-next-line no-console
    //     console.log('Menu clicked | App');
    // }

    // TodO: Это же чепуха так прокидывать и дублировать код на самый вверх?
    onAddToCart(id: string): void {
        // eslint-disable-next-line no-console
        console.log('Product added to cart', id);
    }
}
