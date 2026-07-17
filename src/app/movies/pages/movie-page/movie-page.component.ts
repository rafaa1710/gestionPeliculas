import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { WatchedService } from '../../services/watched.service';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit{

  //almacena pelicula obtenida por id
  movie!: Movie;


  //estado d ela pelicula para el usuario
  isWatched = false;
  updatingWatched = false;


  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private watchedService: WatchedService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    console.log('Id d ela pelicula', id)

    //si no hay id sale
    if(!id) return;


    this.moviesService.movieById(+id).subscribe({
      next: (movie) => this.movie = movie,
      error: (err) => {
        console.log('Error al obtener los detalles de la pelicula')
        alert('No se ha podico cargar la información de la pelicula')
      }
    });
  }

 private checkWatchedStatus(): void {
  this.watchedService.getWatchedMovies().subscribe({
    next: (response) => {
      if (response.status && response.data) {
        this.isWatched = response.data.includes(this.movie.id);
      } else {
        console.error('Error al obtener el estado de la película vista:', response.message);
      }
    },
    error: (err) => {
      console.error('Error al obtener el estado de la película vista:', err);
    }
  });
}


  toggleWatched(): void {
    if (this.updatingWatched) return; // Evita múltiples solicitudes simultáneas
    this.updatingWatched = true;

    const request$ = this.isWatched
      ? this.watchedService.removeWatched(this.movie.id)
      : this.watchedService.addWatched(this.movie.id);

    request$.subscribe({
      next: (response) => {
        if (response.status) {
          this.isWatched = !this.isWatched;
        }
        this.updatingWatched = false;
      },
      error: (err) => {
        console.error('Error al actualizar el estado de la película vista:', err);
        this.updatingWatched = false;
      }
    });
  }


  //funcion para captar la imagen d ela pelicula
  get MovieImage(): string {

    if(!this.movie){
      return 'https://www.ucm.es/icae/file/no-image-available/?ver';
    }

    //si no hay poster ni backdrop uso imagen por defecto
    const path = this.movie.poster_path || this.movie.backdrop_path
    if(!path){
      return 'https://www.ucm.es/icae/file/no-image-available/?ver';
    }

    //si hay imagen se construye la url
    return `https://image.tmdb.org/t/p/w500${path}`

  }

}
