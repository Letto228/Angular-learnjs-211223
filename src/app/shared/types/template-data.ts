import {TemplateRef} from '@angular/core';

export type TemplateData = {
    template: TemplateRef<unknown> | undefined | null;
    context?: unknown;
};
