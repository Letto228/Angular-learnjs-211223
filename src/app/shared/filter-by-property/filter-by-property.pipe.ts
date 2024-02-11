import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
    pure: false,
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T>(
        product: T[],
        propertyName: string,
        searchPropertyValue: string | number | boolean | object,
    ): T[] {
        if (typeof searchPropertyValue === 'string') {
            return product.filter((item: T) =>
                (item[propertyName as keyof T] as string).includes(searchPropertyValue),
            );
        }

        return product.filter((item: T) => item[propertyName as keyof T] === searchPropertyValue);
    }
}
