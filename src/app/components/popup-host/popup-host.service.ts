import {Injectable, TemplateRef} from '@angular/core';
import {Subject, combineLatest, map} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PopupHostService {
    private readonly templateSubject$ = new Subject<TemplateRef<unknown> | null>();
    private readonly contextSubject$ = new Subject<unknown | null>();

    readonly popupData$ = combineLatest([
        this.templateSubject$.asObservable(),
        this.contextSubject$.asObservable(),
    ]).pipe(
        map(([template$, context$]) => ({
            template: template$,
            context: context$,
        })),
    );

    setTemplate<T>(templateRef: TemplateRef<T> | null, context: T | null = null) {
        this.templateSubject$.next(templateRef);
        this.contextSubject$.next(context);
    }

    setContext<T>(context: T) {
        this.contextSubject$.next(context);
    }
}
