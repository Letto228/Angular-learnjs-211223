import {productsReducer} from './products/products.reducer';
import {PRODUCTS_FEATURE, ProductsState} from './products/products.state';

export interface State {
    [PRODUCTS_FEATURE]: ProductsState;
}

export const storeReducer = {
    [PRODUCTS_FEATURE]: productsReducer,
};
