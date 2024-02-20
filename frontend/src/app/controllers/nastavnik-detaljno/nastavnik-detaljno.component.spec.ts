import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikDetaljnoComponent } from './nastavnik-detaljno.component';

describe('NastavnikDetaljnoComponent', () => {
  let component: NastavnikDetaljnoComponent;
  let fixture: ComponentFixture<NastavnikDetaljnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikDetaljnoComponent]
    });
    fixture = TestBed.createComponent(NastavnikDetaljnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
