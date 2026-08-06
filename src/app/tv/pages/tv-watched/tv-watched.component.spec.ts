import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TvWatchedComponent } from './tv-watched.component';
import { WatchedService } from '../../service/watched.service';
import { TvService } from '../../service/tv.service';

describe('TvWatchedComponent', () => {
  let component: TvWatchedComponent;
  let fixture: ComponentFixture<TvWatchedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvWatchedComponent],
      providers: [
        {
          provide: WatchedService,
          useValue: { getWatchedTv: () => of({ status: true, message: '', data: [] }) }
        },
        {
          provide: TvService,
          useValue: { tvById: jasmine.createSpy('tvById') }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(TvWatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
