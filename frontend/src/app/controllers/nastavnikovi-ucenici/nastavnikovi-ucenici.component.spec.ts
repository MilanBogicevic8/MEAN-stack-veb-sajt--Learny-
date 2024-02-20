import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikoviUceniciComponent } from './nastavnikovi-ucenici.component';

describe('NastavnikoviUceniciComponent', () => {
  let component: NastavnikoviUceniciComponent;
  let fixture: ComponentFixture<NastavnikoviUceniciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikoviUceniciComponent]
    });
    fixture = TestBed.createComponent(NastavnikoviUceniciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
