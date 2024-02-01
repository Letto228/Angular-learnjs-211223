import {FilterByPropertyPipe} from './filter-by-property.pipe';

describe('ProductsFilterPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterByPropertyPipe();

        expect(pipe).toBeTruthy();
    });
});
