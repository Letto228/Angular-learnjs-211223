import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, take, tap} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {Product} from '../../shared/products/product.interface';
// import {ProductsStoreService} from '../../shared/products/products-store.service';
import {BrandsService} from '../../shared/brands/brands.service';
import {getFilterFromQuery} from './query-params/get-filter-from-query';
import {ProductsFilterQueryParams} from './query-params/products-filter-query-params.interface';
import {ProductsFilter} from './filter/products-filter.interface';
import {getQueryFromFilter} from './query-params/get-query-from-filter';
import {State} from '../../store/reducer';
import {selectProducts} from '../../store/products/products.slecltors';
import {loadProducts} from '../../store/products/products.actions';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
    readonly products$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            // this.productsStoreService.loadProducts(subCategoryId);
            this.store$.dispatch(loadProducts(subCategoryId));
        }),
        // switchMap(() => this.productsStoreService.products$),
        switchMap(() =>
            this.store$.pipe(
                // map(selectProducts),
                // distinctUntilChanged(),
                select(selectProducts), // select = map + distinctUntilChanged
            ),
        ),
    );

    readonly brands$ = this.activatedRoute.paramMap.pipe(
        map(paramMap => paramMap.get('subCategoryId')),
        tap(subCategoryId => {
            this.brandsService.loadBrands(subCategoryId);
        }),
        switchMap(() => this.brandsService.brands$),
    );

    readonly initialFilter$ = this.activatedRoute.queryParams.pipe(
        take(1),
        map(queryParams => getFilterFromQuery(queryParams as ProductsFilterQueryParams)),
    );

    readonly searchName$ = this.activatedRoute.queryParamMap.pipe(
        map(queryParamMap => queryParamMap.get('name')),
    );

    constructor(
        // private readonly productsStoreService: ProductsStoreService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly brandsService: BrandsService,
        private readonly router: Router,
        private readonly store$: Store<State>,
    ) {}

    onFilterChange(filter: ProductsFilter) {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: getQueryFromFilter(filter),
        });
    }

    trackById(_: number, item: Product): Product['_id'] {
        return item._id;
    }
}
