import { environment } from './../../../environtments/environments.prod';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {URL_API} from 'src/environtments/environment'

const FAVORITES_API = `${URL_API}/favoritas.php`

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }


  private getHeader(): HttpHeaders{
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  private favoritesCache: number[] = [];




  addToFavorites(movieId: number): Observable<any> {
    const body = {
      action: 'add',
      movie_id: movieId,
      email: localStorage.getItem('usuario')
    };
    return this.http.post(FAVORITES_API,body, {headers: this.getHeader()});

  }

  removeFromFavorites(movieId: number):Observable<any>{
    const body = {
      action: 'del',
      movie_id: movieId,
      email: localStorage.getItem('usuario')
    };
    return this.http.post(FAVORITES_API,body, {headers: this.getHeader()});
  }

  getFavorites():Observable<number[]>{
    const body = {
      action: 'list',
      email: localStorage.getItem('usuario')
    }
    return this.http.post<number[]>(FAVORITES_API, body, { headers: this.getHeader()});
  }



}
