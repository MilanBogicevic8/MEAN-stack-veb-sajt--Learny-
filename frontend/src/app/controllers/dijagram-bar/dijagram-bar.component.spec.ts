import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijagramBarComponent } from './dijagram-bar.component';

describe('DijagramBarComponent', () => {
  let component: DijagramBarComponent;
  let fixture: ComponentFixture<DijagramBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DijagramBarComponent]
    });
    fixture = TestBed.createComponent(DijagramBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
