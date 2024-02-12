import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../products/product.interface';

@Pipe({
    name: 'productsFilter',
    pure: false,
})
export class ProductsFilterPipe implements PipeTransform {
    transform(product: Product[], searchName: string): Product[] {
        return product.filter((item: Product) => item.name.includes(searchName));
    }
}
