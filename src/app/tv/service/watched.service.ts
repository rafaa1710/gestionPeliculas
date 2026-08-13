import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from 'src/environtments/environment';



export interface WatchedResponse {
  status: boolean;
  message: string;
  data: number[] | null;
}

const WATCHED_API = `${URL_API}/tv-vistas.php`;

@Injectable({
  providedIn: 'root'
})
export class WatchedService {

  constructor(private http: HttpClient) { }

  private getHeader(): HttpHeaders {
    const token = localStorage.getItem('token') || '';

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }


  private getEmail(): string {
    return localStorage.getItem('usuario') ?? '';
  }

  getWatchedTv(): Observable<WatchedResponse> {
    return this.http.post<WatchedResponse>(
      WATCHED_API,
      {
        action: 'list',
        email: this.getEmail()
      },
      {
        headers: this.getHeader()
      }
    );
  }

  addWatched(tvId: number): Observable<WatchedResponse> {
    const body = {
      action: 'add',
      tv_id: tvId,
      email: this.getEmail()
    };

    return this.http.post<WatchedResponse>(WATCHED_API, body, { headers: this.getHeader() });
  }

  removeWatched(tvId: number): Observable<WatchedResponse> {
    const body = {
      action: 'del',
      tv_id: tvId,
      email: this.getEmail()
    };

    return this.http.post<WatchedResponse>(WATCHED_API, body, { headers: this.getHeader() });
  }

  toggleWatched(tvId: number, isWatched: boolean): Observable<WatchedResponse> {
    if (isWatched) {
      return this.removeWatched(tvId);
    }
    return this.addWatched(tvId);
  }
}
