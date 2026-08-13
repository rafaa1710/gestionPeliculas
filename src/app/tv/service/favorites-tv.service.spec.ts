import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { URL_API } from 'src/environtments/environment';
import { FavoritesTvService } from './favorites-tv.service';

describe('FavoritesTvService', () => {
  let service: FavoritesTvService;
  let httpMock: HttpTestingController;
  const endpoint = `${URL_API}/tv_favoritas.php`;

  beforeEach(() => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('usuario', 'test@example.com');

    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(FavoritesTvService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  });

  it('lists favorites and publishes normalized IDs', () => {
    let favoriteIds = new Set<number>();
    service.favoriteIds$.subscribe(ids => favoriteIds = ids);

    service.getFavorites().subscribe(response => expect(response.status).toBeTrue());

    const request = httpMock.expectOne(endpoint);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ action: 'list', email: 'test@example.com' });
    expect(request.request.headers.get('Authorization')).toBe('Bearer test-token');
    request.flush({ status: true, message: '', data: ['10', 20, 0, 'invalid'] } as unknown as { status: boolean; message: string; data: number[] });

    expect([...favoriteIds]).toEqual([10, 20]);
  });

  it('adds a favorite using tv_id and updates its state', () => {
    let favoriteIds = new Set<number>();
    service.favoriteIds$.subscribe(ids => favoriteIds = ids);

    service.addToFavorites(42).subscribe();

    const request = httpMock.expectOne(endpoint);
    expect(request.request.body).toEqual({ action: 'add', tv_id: 42, email: 'test@example.com' });
    request.flush({ status: true, message: 'added', data: null });

    expect(favoriteIds.has(42)).toBeTrue();
  });

  it('removes a favorite using tv_id and updates its state', () => {
    service.addToFavorites(42).subscribe();
    httpMock.expectOne(endpoint).flush({ status: true, message: '', data: null });

    let favoriteIds = new Set<number>();
    service.favoriteIds$.subscribe(ids => favoriteIds = ids);
    service.removeFromFavorites(42).subscribe();

    const request = httpMock.expectOne(endpoint);
    expect(request.request.body).toEqual({ action: 'del', tv_id: 42, email: 'test@example.com' });
    request.flush({ status: true, message: 'deleted', data: null });

    expect(favoriteIds.has(42)).toBeFalse();
  });

  it('chooses add or remove when toggling', () => {
    service.toggleFavorite(7, false).subscribe();
    const addRequest = httpMock.expectOne(endpoint);
    expect(addRequest.request.body.action).toBe('add');
    addRequest.flush({ status: true, message: '', data: null });

    service.toggleFavorite(7, true).subscribe();
    const removeRequest = httpMock.expectOne(endpoint);
    expect(removeRequest.request.body.action).toBe('del');
    removeRequest.flush({ status: true, message: '', data: null });
  });
});
