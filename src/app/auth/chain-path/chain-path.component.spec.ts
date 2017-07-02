import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ChainPathComponent} from './chain-path.component';

describe('ChainPathComponent', () => {
    let component: ChainPathComponent;
    let fixture: ComponentFixture<ChainPathComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChainPathComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ChainPathComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
