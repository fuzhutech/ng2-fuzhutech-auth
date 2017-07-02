import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChainPathDialogComponent} from './chain-path-dialog.component';

describe('ChainPathDialogComponent', () => {
    let component: ChainPathDialogComponent;
    let fixture: ComponentFixture<ChainPathDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChainPathDialogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChainPathDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
