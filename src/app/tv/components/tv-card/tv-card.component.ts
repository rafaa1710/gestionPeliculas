import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Tv } from '../../interface/tv.interface';

@Component({
  selector: 'app-tv-card',
  templateUrl: './tv-card.component.html',
  styleUrls: ['./tv-card.component.css']
})
export class TvCardComponent {

  @Input()
  public serie!: Tv;

  constructor(private router: Router) {}

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

}
