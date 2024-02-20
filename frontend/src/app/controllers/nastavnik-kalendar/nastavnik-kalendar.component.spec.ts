import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikKalendarComponent } from './nastavnik-kalendar.component';

describe('NastavnikKalendarComponent', () => {
  let component: NastavnikKalendarComponent;
  let fixture: ComponentFixture<NastavnikKalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikKalendarComponent]
    });
    fixture = TestBed.createComponent(NastavnikKalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
