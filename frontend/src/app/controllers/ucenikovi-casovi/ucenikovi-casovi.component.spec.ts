import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcenikoviCasoviComponent } from './ucenikovi-casovi.component';

describe('UcenikoviCasoviComponent', () => {
  let component: UcenikoviCasoviComponent;
  let fixture: ComponentFixture<UcenikoviCasoviComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcenikoviCasoviComponent]
    });
    fixture = TestBed.createComponent(UcenikoviCasoviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
