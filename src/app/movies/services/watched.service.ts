import { Injectable } from '@angular/core';
import  { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_API } from 'src/environtments/environment';

interface WatchedResponse {
  status: boolean;
  message: string;
  data: number[] | null;
}

const  WATCHED_API = `${URL_API}/vistas.php`;

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


  getWatchedMovies(movieId: number): Observable<WatchedResponse> {
    return this.http.post<WatchedResponse>(
      WATCHED_API,
       {
        action: 'list',
        movie_id: movieId,
         email: this.getEmail()
        },
        {
           headers: this.getHeader()
        }
      );
  }


  addWatched(movieId: number): Observable<WatchedResponse> {
    const body = {
      action: 'add',
      movie_id: movieId,
      email: this.getEmail()
    };

    return this.http.post<WatchedResponse>(WATCHED_API, body, { headers: this.getHeader() });
  }


  removeWatched(movieId: number): Observable<WatchedResponse> {
    const body = {
      action: 'del',
      movie_id: movieId,
      email: this.getEmail()
    };

    return this.http.post<WatchedResponse>(WATCHED_API, body, { headers: this.getHeader() });
  }


  toggleWatched(movieId: number, isWatched: boolean): Observable<WatchedResponse> {
    if (isWatched) {
      return this.removeWatched(movieId);
    }
    return this.addWatched(movieId);
  }



}







