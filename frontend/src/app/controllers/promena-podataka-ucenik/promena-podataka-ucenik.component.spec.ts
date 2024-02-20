import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaPodatakaUcenikComponent } from './promena-podataka-ucenik.component';

describe('PromenaPodatakaUcenikComponent', () => {
  let component: PromenaPodatakaUcenikComponent;
  let fixture: ComponentFixture<PromenaPodatakaUcenikComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromenaPodatakaUcenikComponent]
    });
    fixture = TestBed.createComponent(PromenaPodatakaUcenikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
