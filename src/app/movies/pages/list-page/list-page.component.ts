import { MoviesService } from './../../services/movies.service';
import { Component, OnInit} from '@angular/core';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{

  //lista de pelis
  public movies: Movie[]=[]

  constructor(private moviesService: MoviesService){}


  ngOnInit(): void {
    //obtengo la lista de pelis
    this.moviesService.getPopularMovie().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (err) => {
        console.log('Error al cargar peliculas populares')
      }

    })
  }


  getImageUrl(path: string | null): string{
    return this.moviesService.getImageUrl(path)

  }


}
