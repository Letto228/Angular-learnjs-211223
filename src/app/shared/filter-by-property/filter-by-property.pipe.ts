import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T extends object, K extends keyof T>(
        items: T[],
        propertyName: K,
        searchValue: T[K] | null | undefined,
    ): T[] {
        const isStringSearch = typeof searchValue === 'string';
        const stringSearchValueLowerCase: string | null = isStringSearch
            ? (searchValue as string).toLocaleLowerCase()
            : null;

        return items.filter(item => {
            const propertyValue = item[propertyName];

            if (propertyValue === null) {
                return searchValue === null;
            }

            if (propertyValue === undefined) {
                return searchValue === undefined;
            }

            if (searchValue === null || searchValue === undefined) {
                return false;
            }

            if (isStringSearch) {
                return (propertyValue as string)
                    .toLocaleLowerCase()
                    .includes(stringSearchValueLowerCase!);
            }

            return propertyValue === searchValue;
        });
    }
}
