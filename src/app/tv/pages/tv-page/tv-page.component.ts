import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tv } from '../../interface/tv.interface';
import { TvService } from '../../service/tv.service';

@Component({
  selector: 'app-tv-page',
  templateUrl: './tv-page.component.html',
  styleUrls: ['./tv-page.component.css']
})
export class TvPageComponent implements OnInit {

  public serie!: Tv;

  constructor(
    private route: ActivatedRoute,
    private tvService: TvService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.tvService.tvById(+id).subscribe({
      next: (serie) => this.serie = serie,
      error: (err) => {
        console.error('Error al obtener la serie', err);
        alert('No se pudo cargar la información de la serie');
      }
    });

  }

  get serieImage(): string {

    if (!this.serie) {
      return 'https://www.ucm.es/icae/file/no-image-available/?ver';
    }

    const path = this.serie.poster_path || this.serie.backdrop_path;

    if (!path) {
      return 'https://www.ucm.es/icae/file/no-image-available/?ver';
    }

    return `https://image.tmdb.org/t/p/w500${path}`;

  }

}
