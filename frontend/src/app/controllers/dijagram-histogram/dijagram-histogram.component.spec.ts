import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijagramHistogramComponent } from './dijagram-histogram.component';

describe('DijagramHistogramComponent', () => {
  let component: DijagramHistogramComponent;
  let fixture: ComponentFixture<DijagramHistogramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DijagramHistogramComponent]
    });
    fixture = TestBed.createComponent(DijagramHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
