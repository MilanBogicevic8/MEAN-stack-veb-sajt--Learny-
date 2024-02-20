import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijagramDonutComponent } from './dijagram-donut.component';

describe('DijagramDonutComponent', () => {
  let component: DijagramDonutComponent;
  let fixture: ComponentFixture<DijagramDonutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DijagramDonutComponent]
    });
    fixture = TestBed.createComponent(DijagramDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
