import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvFavoritesComponent } from './tv-favorites.component';

describe('TvFavoritesComponent', () => {
  let component: TvFavoritesComponent;
  let fixture: ComponentFixture<TvFavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvFavoritesComponent]
    });
    fixture = TestBed.createComponent(TvFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
