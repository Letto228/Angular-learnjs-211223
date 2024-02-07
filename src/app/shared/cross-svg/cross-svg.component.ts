import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-cross-svg',
    templateUrl: './cross-svg.component.html',
    styleUrls: ['./cross-svg.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrossSvgComponent {}
