import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaPageComponent } from './pelicula-page.component';

describe('PeliculaPageComponent', () => {
  let component: PeliculaPageComponent;
  let fixture: ComponentFixture<PeliculaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeliculaPageComponent]
    });
    fixture = TestBed.createComponent(PeliculaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
