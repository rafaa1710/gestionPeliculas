import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tv } from '../interface/tv.interface';


@Injectable({
  providedIn: 'root'
})
export class TvService {

  private apiKey: string = '33383b32ec32a786f1e847ef33436589'
  private apiUrl: string= 'https://api.themoviedb.org/3'

  constructor(private http: HttpClient) { }


  getPopularSeries(page: number = 1): Observable<Tv[]> {
  const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('language', 'es-ES')
    .set('page', page);

  return this.http
    .get<{ results: Tv[] }>(
      `${this.apiUrl}/tv/popular`,
      { params }
    )
    .pipe(
      map(response => response.results)
    );
}

tvById(id: number): Observable<Tv> {
  const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('language', 'es-ES');

  return this.http.get<Tv>(
    `${this.apiUrl}/tv/${id}`,
    { params }
  );
}


searchSeries(query: string): Observable<Tv[]> {
  const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('language', 'es-ES')
    .set('query', query)
    .set('page', 1)
    .set('include_adult', false);

  return this.http
    .get<{ results: Tv[] }>(
      `${this.apiUrl}/search/tv`,
      { params }
    )
    .pipe(
      map(response => response.results)
    );
}

}
