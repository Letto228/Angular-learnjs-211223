import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CrossSvgComponent} from './cross-svg.component';

describe('CrossSvgComponent', () => {
    let component: CrossSvgComponent;
    let fixture: ComponentFixture<CrossSvgComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [CrossSvgComponent],
        });
        fixture = TestBed.createComponent(CrossSvgComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
