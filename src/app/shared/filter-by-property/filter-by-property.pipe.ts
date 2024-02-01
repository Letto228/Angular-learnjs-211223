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
        const result = new Array<T>();
        let isStringProperty: boolean | null = null;
        let stringSearchValueLowerCase: string | null = null;

        for (const item of items) {
            const value = item[propertyName];

            if (value === null) {
                if (searchValue === null) {
                    result.push(item);
                }

                continue;
            } else if (value === undefined) {
                if (searchValue === undefined) {
                    result.push(item);
                }

                continue;
            } else if (searchValue === null || searchValue === undefined) {
                continue;
            }

            if (isStringProperty === null) {
                isStringProperty = typeof value === 'string';

                if (isStringProperty) {
                    stringSearchValueLowerCase = (searchValue as string).toLocaleLowerCase();
                }
            }

            if (
                isStringProperty &&
                value.toString().toLocaleLowerCase().includes(stringSearchValueLowerCase!)
            ) {
                result.push(item);
                continue;
            }

            if (value === searchValue) {
                result.push(item);
                continue;
            }
        }

        return result;
    }
}
