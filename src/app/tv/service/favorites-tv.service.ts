import { Injectable } from '@angular/core';
import { URL_API } from 'src/environtments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface FavoritesResponse {
  status: boolean;
  message: string;
  data: number[] | null;
}


const FAVORITES_API = `${URL_API}/tv-favoritas.php`;

@Injectable({
  providedIn: 'root'
})
export class FavoritesTvService {
  private readonly favoriteIdsSubject = new BehaviorSubject<Set<number>>(new Set());
  readonly favoriteIds$ = this.favoriteIdsSubject.asObservable();

  constructor(private http: HttpClient) { }


  private getHeader(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private getEmail(): string {
    return localStorage.getItem('usuario') ?? '';
  }

  private updateFavoriteIds(data: number[] | null): void {
    const ids = (data ?? [])
      .map(id => Number(id))
      .filter(id => Number.isInteger(id) && id > 0);
    this.favoriteIdsSubject.next(new Set(ids));
  }

  private updateFavoriteId(tvId: number, isFavorite: boolean): void {
    const ids = new Set(this.favoriteIdsSubject.value);
    isFavorite ? ids.add(tvId) : ids.delete(tvId);
    this.favoriteIdsSubject.next(ids);
  }

  addToFavorites(tvId: number): Observable<FavoritesResponse> {
      const body = {
        action: 'add',
        tv_id: tvId,
        email: this.getEmail()
      };
      return this.http.post<FavoritesResponse>(FAVORITES_API, body, { headers: this.getHeader() })
        .pipe(tap(response => {
          if (response.status) this.updateFavoriteId(tvId, true);
        }));
    }


    removeFromFavorites(tvId: number): Observable<FavoritesResponse> {
        const body = {
          action: 'del',
          tv_id: tvId,
          email: this.getEmail()
        };
        return this.http.post<FavoritesResponse>(FAVORITES_API, body, { headers: this.getHeader() })
          .pipe(tap(response => {
            if (response.status) this.updateFavoriteId(tvId, false);
          }));
    }


    getFavorites(): Observable<FavoritesResponse> {
        const body = {
          action: 'list',
          email: this.getEmail()
        };
        return this.http.post<FavoritesResponse>(FAVORITES_API, body, { headers: this.getHeader() })
          .pipe(tap(response => {
            if (response.status) this.updateFavoriteIds(response.data);
          }));
      }


    toggleFavorite(tvId: number, isFavorite: boolean): Observable<FavoritesResponse> {
      if (isFavorite) {
        return this.removeFromFavorites(tvId);
      }
      return this.addToFavorites(tvId);
    }

}
