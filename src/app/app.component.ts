import {Component} from '@angular/core';
import {applicationConfigMock} from './shared/application-config/application-config.mock';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    readonly applicationConfig = applicationConfigMock;

    // isSidenavOpenedApp = false;

    // onMenuClick() {
    //     this.isSidenavOpenedApp = !this.isSidenavOpenedApp;

    //     // eslint-disable-next-line no-console
    //     console.log('Menu clicked | App');
    // }
}
