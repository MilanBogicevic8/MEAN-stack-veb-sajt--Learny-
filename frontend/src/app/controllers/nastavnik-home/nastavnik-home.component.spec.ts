import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikHomeComponent } from './nastavnik-home.component';

describe('NastavnikHomeComponent', () => {
  let component: NastavnikHomeComponent;
  let fixture: ComponentFixture<NastavnikHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikHomeComponent]
    });
    fixture = TestBed.createComponent(NastavnikHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
