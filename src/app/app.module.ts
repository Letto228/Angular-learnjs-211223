import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderModule} from './components/header/header.module';
import {ProductsListModule} from './pages/products-list/products-list.module';
import {SidenavModule} from './components/sidenav/sidenav.module';
import {PopupHostModule} from './components/popup-host/popup-host.module';
import {InsertShadowModule} from './shared/insert-shadow/insert-shadow.module';
import {ProductsStoreService} from './shared/products/products-store.service';
import {ProductsApiService} from './shared/products/products-api.service';
import {BASE_URL} from './shared/base-url/base-url.token';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HeaderModule,
        ProductsListModule,
        SidenavModule,
        MatListModule, // providers: [{provide: {name: 'user'}, useClass: ...}]
        PopupHostModule,
        InsertShadowModule,
    ],
    providers: [
        // ...MatListModule.providers,
        ProductsApiService,
        ProductsStoreService,
        {
            provide: BASE_URL,
            useValue: '',
        },
        // {
        //     provide: ProductsStoreService, // token
        //     useClass: ProductsStoreService, // class
        // },
        // {
        //     provide: 'ProductsStoreServiceString', // token
        //     useExisting: ProductsStoreService, // token
        //     // useClass: ProductsStoreService, // class
        // },
        // {
        //     provide: 'baseUrl',
        //     useValue: 'http://....',
        // },
        // {
        //     provide: 'productsStream$',
        //     useFactory: () => inject(ProductsStoreService).products$,
        //     // useFactory: (productsStoreService: ProductsStoreService) => productsStoreService,
        //     // deps: [ProductsStoreService],
        //     // useFactory: () => new ProductsStoreService(),
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
