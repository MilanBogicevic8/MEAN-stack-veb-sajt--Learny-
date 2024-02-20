import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoKonferencijaComponent } from './video-konferencija.component';

describe('VideoKonferencijaComponent', () => {
  let component: VideoKonferencijaComponent;
  let fixture: ComponentFixture<VideoKonferencijaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideoKonferencijaComponent]
    });
    fixture = TestBed.createComponent(VideoKonferencijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
