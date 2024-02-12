import {Pipe, PipeTransform} from '@angular/core';
import {isString} from 'lodash';

@Pipe({
    name: 'filterByProperty',
    pure: false,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, P extends keyof T>(
        product: T[] | null | undefined,
        propertyName: P,
        searchPropertyValue: T[P],
    ): T[] | null | undefined {
        if (!product?.length) {
            return product;
        }

        if (isString(searchPropertyValue)) {
            const newSearchValue = searchPropertyValue.toUpperCase();

            return product.filter((item: T) =>
                (item[propertyName] as string).toUpperCase().includes(newSearchValue),
            );
        }

        return product.filter((item: T) => item[propertyName] === searchPropertyValue);
    }
}
