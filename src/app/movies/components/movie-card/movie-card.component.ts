import { FavoritesService} from './../../services/favorites.service';
import { Component, Input } from '@angular/core';
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
  constructor(
    private movieService: MoviesService,
    private favoritesService: FavoritesService,
    private snackBar: MatSnackBar,
    private watchedService: WatchedService
  ){}



  getImageUrl(path: string | null):string {
    return this.movieService.getImageUrl(path)
  }


  toggleFavorite():void{
    if(this.isFavorite){
      this.favoritesService.removeFromFavorites(this.movie.id).subscribe(() => {
        this.isFavorite = false;
        this.snackBar.open('Pelicula eliminada de favoritos','Cerrar', {duration:2000})
      })
    }else{
      this.favoritesService.addToFavorites(this.movie.id).subscribe(() =>{
        this.isFavorite = true;
        this.snackBar.open('Pelicula añadida a favoritos','Cerrar', {duration:2000})
      })
    }
  }

}
