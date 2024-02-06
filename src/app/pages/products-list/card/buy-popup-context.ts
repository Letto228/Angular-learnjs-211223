import {Product} from 'src/app/shared/products/product.interface';

export interface BuyPopupContext {
    $implicit: Product;
    name: string;
}
