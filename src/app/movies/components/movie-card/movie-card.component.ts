import { Component, Input } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie.interface';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() movie!: Movie;

  constructor(private movieService: MoviesService) {}

  getImageUrl(path: string | null):string {
    return this.movieService.getImageUrl(path)
  }

}
