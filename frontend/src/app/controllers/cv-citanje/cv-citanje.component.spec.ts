import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvCitanjeComponent } from './cv-citanje.component';

describe('CvCitanjeComponent', () => {
  let component: CvCitanjeComponent;
  let fixture: ComponentFixture<CvCitanjeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CvCitanjeComponent]
    });
    fixture = TestBed.createComponent(CvCitanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
