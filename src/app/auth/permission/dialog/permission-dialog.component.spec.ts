import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PermissionDialogComponent} from './permission-dialog.component';

describe('ResourceDialogComponent', () => {
    let component: PermissionDialogComponent;
    let fixture: ComponentFixture<PermissionDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PermissionDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PermissionDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
