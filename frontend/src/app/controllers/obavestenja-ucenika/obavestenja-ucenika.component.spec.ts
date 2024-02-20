import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjaUcenikaComponent } from './obavestenja-ucenika.component';

describe('ObavestenjaUcenikaComponent', () => {
  let component: ObavestenjaUcenikaComponent;
  let fixture: ComponentFixture<ObavestenjaUcenikaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObavestenjaUcenikaComponent]
    });
    fixture = TestBed.createComponent(ObavestenjaUcenikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
