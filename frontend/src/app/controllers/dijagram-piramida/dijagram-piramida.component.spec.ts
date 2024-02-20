import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijagramPiramidaComponent } from './dijagram-piramida.component';

describe('DijagramPiramidaComponent', () => {
  let component: DijagramPiramidaComponent;
  let fixture: ComponentFixture<DijagramPiramidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DijagramPiramidaComponent]
    });
    fixture = TestBed.createComponent(DijagramPiramidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
