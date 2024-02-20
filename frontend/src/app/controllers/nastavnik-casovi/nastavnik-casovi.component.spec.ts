import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikCasoviComponent } from './nastavnik-casovi.component';

describe('NastavnikCasoviComponent', () => {
  let component: NastavnikCasoviComponent;
  let fixture: ComponentFixture<NastavnikCasoviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikCasoviComponent]
    });
    fixture = TestBed.createComponent(NastavnikCasoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
