import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TemplateData} from 'src/app/shared/types/template-data';

@Injectable({
    providedIn: 'root',
})
export class PopupHostService {
    private readonly templateDataSource$ = new BehaviorSubject<TemplateData | null>(null);
    readonly currentTemplateData$ = this.templateDataSource$.asObservable();

    openPopup(templateData: TemplateData | null): void {
        if (templateData?.template) {
            this.templateDataSource$.next(templateData);

            return;
        }

        this.templateDataSource$.next(null);
    }

    closePopup() {
        this.openPopup(null);
    }
}
