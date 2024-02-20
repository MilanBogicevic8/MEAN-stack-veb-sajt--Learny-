import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijagramLinijaComponent } from './dijagram-linija.component';

describe('DijagramLinijaComponent', () => {
  let component: DijagramLinijaComponent;
  let fixture: ComponentFixture<DijagramLinijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DijagramLinijaComponent]
    });
    fixture = TestBed.createComponent(DijagramLinijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
