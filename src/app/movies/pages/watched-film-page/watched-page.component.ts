import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Movie } from '../../interfaces/movie.interface';
import { MoviesService } from '../../services/movies.service';
import { WatchedService } from '../../services/watched.service';

@Component({
  selector: 'app-watched-page',
  templateUrl: './watched-page.component.html',
  styleUrls: ['./watched-page.component.css']
})
export class WatchedPageComponent implements OnInit {

  public watchedMovies: Movie[] = [];
  public loading = false;

  constructor(
    private watchedService: WatchedService,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.loadWatchedMovies();
  }

  loadWatchedMovies(): void {
    this.loading = true;

    this.watchedService.getWatchedMovies().subscribe({
      next: (res) => {
        console.log('Respuesta backend:', res);

        if (!res.status || !Array.isArray(res.data)) {
          console.warn('El backend devolvió un formato inesperado:', res);
          this.watchedMovies = [];
          this.loading = false;
          return;
        }

        const ids = [...new Set(res.data.map(id => Number(id)))];

        if (ids.length === 0) {
          this.watchedMovies = [];
          this.loading = false;
          return;
        }

        const requests = ids.map(id =>
          this.moviesService.movieById(id)
        );

        forkJoin(requests).subscribe({
          next: (movies) => {
            this.watchedMovies = movies;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al cargar los detalles de las películas:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener las películas vistas:', err);
        this.loading = false;
      }
    });
  }
}
