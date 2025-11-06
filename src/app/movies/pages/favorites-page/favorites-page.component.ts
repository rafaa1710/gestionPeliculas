import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { FavoritesService } from '../../services/favorites.service';
import { Movie } from '../../interfaces/movie.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent {

  public favorites : Movie[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private moviesService: MoviesService
  ) {}


  ngOnInit(): void{
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoritesService.getFavorites().subscribe(res => {

  if (!Array.isArray(res)) {
    console.warn("⚠️ Backend NO devolvió un array:", res);
    return;
  }

  const ids = res;

  if (ids.length === 0) return;

  forkJoin(ids.map(id => this.moviesService.movieById(id))).subscribe(movies => {
    this.favorites = movies;
  });
});
  }

}
