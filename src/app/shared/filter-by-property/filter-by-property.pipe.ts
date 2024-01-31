import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filterByProperty',
})
export class FilterByPropertyPipe implements PipeTransform {
    transform<T, S extends keyof T>(
        entities: T[] | undefined | null,
        propertyName: S,
        searchValue: T[S],
    ): T[] | undefined | null {
        if (!entities) {
            return entities;
        }

        const isSearchValueString = typeof searchValue === 'string';

        if (isSearchValueString) {
            return entities.filter(entity =>
                (entity[propertyName] as string).includes(searchValue),
            );
        }

        return entities.filter(entity => entity[propertyName] === searchValue);
    }
}
