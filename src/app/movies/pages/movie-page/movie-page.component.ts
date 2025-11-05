import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.css']
})
export class MoviePageComponent implements OnInit{

  //almacena pelicula obtenida por id
  movie!: Movie;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService

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
