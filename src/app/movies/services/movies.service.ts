import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiKey: string = '33383b32ec32a786f1e847ef33436589'
  private apiUrl: string= 'https://api.themoviedb.org/3'


  constructor(private http: HttpClient) { }


  getPopularMovie(page: number = 1): Observable <Movie[]>{
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'es-ES')
      .set('page', page);

      return this.http.get<{ results: Movie[]}>(`${this.apiUrl}/movie/popular`, {params})
      .pipe(map(resp => resp.results));
  }

  getImageUrl(path: string | null): string{

    if(!path) return 'https://www.ucm.es/icae/file/no-image-available/?ver';
      return `https://image.tmdb.org/t/p/w500${path}`;

  }

  movieById(id:number): Observable<Movie>{
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('language', 'es-ES')

    return this.http.get<Movie>(`${this.apiUrl}/movie/${id}`, {params});
  }

  //metodo GET con la busqueda del usuario usando el ENDPOINT /search/movie
  searchMovies(query: string): Observable<Movie[]>{
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('language','es-ES')
    .set('query',query)
    .set('page',1)
    .set('include_adult', false)

    return this.http.get<{ results: Movie[]}>(`${this.apiUrl}/search/movie`, {params})
    .pipe(map(resp=> resp.results))

  }

}
