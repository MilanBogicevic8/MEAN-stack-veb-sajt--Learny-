import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijagramPitaComponent } from './dijagram-pita.component';

describe('DijagramPitaComponent', () => {
  let component: DijagramPitaComponent;
  let fixture: ComponentFixture<DijagramPitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DijagramPitaComponent]
    });
    fixture = TestBed.createComponent(DijagramPitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
