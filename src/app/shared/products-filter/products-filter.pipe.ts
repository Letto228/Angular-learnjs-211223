import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'productsFilter',
})
export class ProductsFilterPipe<T extends {name?: string}> implements PipeTransform {
    transform(products: T[], searchName: string): T[] {
        return products.filter(product => {
            if (!!product.name === false) {
                return;
            }

            const name = product.name.toLocaleLowerCase();

            searchName = searchName.toLocaleLowerCase();

            return name.includes(searchName);
        });
    }
}
