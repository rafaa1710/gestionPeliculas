import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tv } from '../../interface/tv.interface';
import { TvService } from '../../service/tv.service';
import { WatchedService } from '../../service/watched.service';

@Component({
  selector: 'app-tv-page',
  templateUrl: './tv-page.component.html',
  styleUrls: ['./tv-page.component.css']
})
export class TvPageComponent implements OnInit {

  public serie!: Tv;
  public isWatched = false;
  public updatingWatched = false;

  constructor(
    private route: ActivatedRoute,
    private tvService: TvService,
    private watchedService: WatchedService
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.tvService.tvById(+id).subscribe({
      next: (serie) => {
        this.serie = serie;
        this.checkWatchedStatus();
      },
      error: (err) => {
        console.error('Error al obtener la serie', err);
        alert('No se pudo cargar la información de la serie');
      }
    });

  }

  private checkWatchedStatus(): void {
    this.watchedService.getWatchedTv().subscribe({
      next: (response) => {
        if (response.status && Array.isArray(response.data)) {
          this.isWatched = response.data.some(id => Number(id) === this.serie.id);
        } else {
          console.error('Error al obtener el estado de la serie vista:', response.message);
        }
      },
      error: (err) => {
        console.error('Error al obtener el estado de la serie vista:', err);
      }
    });
  }

  public toggleWatched(): void {
    if (this.updatingWatched) return;

    this.updatingWatched = true;

    this.watchedService.toggleWatched(this.serie.id, this.isWatched).subscribe({
      next: (response) => {
        if (response.status) {
          this.isWatched = !this.isWatched;
        } else {
          console.error('Error al actualizar el estado de la serie vista:', response.message);
        }
        this.updatingWatched = false;
      },
      error: (err) => {
        console.error('Error al actualizar el estado de la serie vista:', err);
        this.updatingWatched = false;
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
