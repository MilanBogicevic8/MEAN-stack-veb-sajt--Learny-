import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NastavnikPromenapodatakaComponent } from './nastavnik-promenapodataka.component';

describe('NastavnikPromenapodatakaComponent', () => {
  let component: NastavnikPromenapodatakaComponent;
  let fixture: ComponentFixture<NastavnikPromenapodatakaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NastavnikPromenapodatakaComponent]
    });
    fixture = TestBed.createComponent(NastavnikPromenapodatakaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
