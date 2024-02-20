import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DosijeUcenikaComponent } from './dosije-ucenika.component';

describe('DosijeUcenikaComponent', () => {
  let component: DosijeUcenikaComponent;
  let fixture: ComponentFixture<DosijeUcenikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DosijeUcenikaComponent]
    });
    fixture = TestBed.createComponent(DosijeUcenikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
