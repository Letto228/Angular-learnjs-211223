import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PopupHostComponent} from './popuphost.component';

describe('PopuphostComponent', () => {
    let component: PopupHostComponent;
    let fixture: ComponentFixture<PopupHostComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PopupHostComponent],
        });
        fixture = TestBed.createComponent(PopupHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
