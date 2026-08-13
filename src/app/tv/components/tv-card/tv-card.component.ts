import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Tv } from '../../interface/tv.interface';
import { FavoritesTvService } from '../../service/favorites-tv.service';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.css']
})
export class TvCardComponent {

  @Input()
  public serie!: Tv;

  @Input()
  public isFavorite = false;

  @Output()
  public favoriteChange = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private favoritesService: FavoritesTvService,
    private snackBar: MatSnackBar
  ) {}

  // Devuelve la imagen de la serie
  get imageUrl(): string {

    if (!this.serie.poster_path) {
      return 'https://www.ucm.es/icae/file/no-image-available/?ver';
    }

    return `https://image.tmdb.org/t/p/w500${this.serie.poster_path}`;
  }

  // Navega a la página de detalles de la serie
  goToDetails(): void {
    this.router.navigate(['/tv', this.serie.id]);
  }

  toggleFavorite(): void {
    this.favoritesService.toggleFavorite(this.serie.id, this.isFavorite).subscribe({
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
            ? 'Serie añadida a favoritos'
            : 'Serie eliminada de favoritos',
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
