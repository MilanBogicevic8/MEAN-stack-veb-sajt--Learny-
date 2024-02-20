import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteraktivniKalendarComponent } from './interaktivni-kalendar.component';

describe('InteraktivniKalendarComponent', () => {
  let component: InteraktivniKalendarComponent;
  let fixture: ComponentFixture<InteraktivniKalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteraktivniKalendarComponent]
    });
    fixture = TestBed.createComponent(InteraktivniKalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
