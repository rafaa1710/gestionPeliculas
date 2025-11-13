import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from 'src/environtments/environment';

export interface FavoritesResponse {
  status: boolean;
  message: string;
  data: number[];
}

const FAVORITES_API = `${URL_API}/favoritas.php`;

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) {}

  private getHeader(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  addToFavorites(movieId: number): Observable<FavoritesResponse> {
    const body = {
      action: 'add',
      movie_id: movieId,
      email: localStorage.getItem('usuario')
    };
    return this.http.post<FavoritesResponse>(FAVORITES_API, body, { headers: this.getHeader() });
  }

  removeFromFavorites(movieId: number): Observable<FavoritesResponse> {
    const body = {
      action: 'del',
      movie_id: movieId,
      email: localStorage.getItem('usuario')
    };
    return this.http.post<FavoritesResponse>(FAVORITES_API, body, { headers: this.getHeader() });
  }

  getFavorites(): Observable<FavoritesResponse> {
    const body = {
      action: 'list',
      email: localStorage.getItem('usuario')
    };
    return this.http.post<FavoritesResponse>(FAVORITES_API, body, { headers: this.getHeader() });
  }

  toggleFavorite(movieId: number, isFavorite: boolean): Observable<FavoritesResponse> {
  if (isFavorite) {
    return this.removeFromFavorites(movieId);
  }
  return this.addToFavorites(movieId);
}
}
