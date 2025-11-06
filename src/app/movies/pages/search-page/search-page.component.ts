import { MoviesService } from './../../services/movies.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Movie } from '../../interfaces/movie.interface';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public movies : Movie[]= [];


  constructor(private moviesService: MoviesService) {}

  onSearch() {
  const value = this.searchInput.value?.trim();

  if (!value) {
    this.movies = []; // ✅ limpia resultados
    return;
  }

  this.moviesService.searchMovies(value)
    .subscribe(movies => this.movies = movies);
}


}
