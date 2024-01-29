import {Component, TemplateRef, ViewChild} from '@angular/core';
import {applicationConfigMock} from './shared/application-config/application-config.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    readonly applicationConfig = applicationConfigMock;

    switchTemplate = false;
    closeTemplate = true;

    template: TemplateRef<unknown> | null = null;

    @ViewChild('firstTemplate')
    readonly firstTemplate: TemplateRef<unknown> | null = null;

    @ViewChild('secondTemplate')
    readonly secondTemplate: TemplateRef<unknown> | null = null;

    constructor() {
        setTimeout(() => {
            this.switchTemplate = !this.switchTemplate;
            this.template = this.switchTemplate ? this.firstTemplate : this.secondTemplate;
            // or
            this.closeTemplate = !this.closeTemplate;
        }, 3000);
        setTimeout(() => {
            this.switchTemplate = !this.switchTemplate;
            this.template = this.switchTemplate ? this.firstTemplate : this.secondTemplate;
            // or
            this.closeTemplate = !this.closeTemplate;
        }, 6000);
        setTimeout(() => {
            this.switchTemplate = !this.switchTemplate;
            this.template = this.switchTemplate ? this.firstTemplate : this.secondTemplate;
            // or
            this.closeTemplate = !this.closeTemplate;
        }, 9000);
    }
}
