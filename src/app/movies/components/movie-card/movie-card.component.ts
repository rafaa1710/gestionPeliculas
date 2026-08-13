import { FavoritesService} from './../../services/favorites.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../interfaces/movie.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WatchedService } from '../../services/watched.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  @Input() movie!: Movie;
  @Input() isFavorite: boolean = false;
  @Input() isWatched: boolean = false;

  @Output()
  public favoriteChange = new EventEmitter<boolean>();
  constructor(
    private movieService: MoviesService,
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar,
    private watchedService: WatchedService
  ){}



  getImageUrl(path: string | null):string {
    return this.movieService.getImageUrl(path)
  }


  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.movie.id, this.isFavorite).subscribe({
      next: (response) => {
        if (!response.status) {
          this.snackBar.open(response.message || 'No se pudo actualizar favoritos', 'Cerrar', {
            duration: 2000
          });
          return;
        }

        this.isFavorite = !this.isFavorite;
        this.favoriteChange.emit(this.isFavorite);
        this.snackBar.open(
          this.isFavorite
            ? 'Película añadida a favoritos'
            : 'Película eliminada de favoritos',
          'Cerrar',
          { duration: 2000 }
        );
      },
      error: () => {
        this.snackBar.open('No se pudo actualizar favoritos', 'Cerrar', {
          duration: 2000
        });
      }
    });
  }

}
