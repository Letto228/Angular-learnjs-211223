import {EmbeddedViewRef, Injectable, TemplateRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PopupHostService {
    // private readonly templateSource$ = new BehaviorSubject<TemplateRef<unknown> | null>(null);
    private readonly templateSource$ = new BehaviorSubject<EmbeddedViewRef<unknown> | null>(null);
    readonly currentTemplate$ = this.templateSource$.asObservable();

    openPopup(template: TemplateRef<unknown> | null | undefined, context: unknown) {
        if (template) {
            const view = template.createEmbeddedView(context);

            this.templateSource$.next(view);

            return;
        }

        this.templateSource$.next(null);
    }

    closePopup() {
        this.openPopup(null, null);
    }
}
