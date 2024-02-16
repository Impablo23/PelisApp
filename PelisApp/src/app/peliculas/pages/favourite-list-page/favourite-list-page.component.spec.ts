import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteListPageComponent } from './favourite-list-page.component';

describe('FavouriteListPageComponent', () => {
  let component: FavouriteListPageComponent;
  let fixture: ComponentFixture<FavouriteListPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavouriteListPageComponent]
    });
    fixture = TestBed.createComponent(FavouriteListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
