import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UcenikoviNastavniciComponent } from './ucenikovi-nastavnici.component';

describe('UcenikoviNastavniciComponent', () => {
  let component: UcenikoviNastavniciComponent;
  let fixture: ComponentFixture<UcenikoviNastavniciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UcenikoviNastavniciComponent]
    });
    fixture = TestBed.createComponent(UcenikoviNastavniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
