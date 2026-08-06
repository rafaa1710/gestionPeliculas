import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { WatchedService } from '../../service/watched.service';
import { TvService } from '../../service/tv.service';
import { Tv } from '../../interface/tv.interface';


@Component({
  selector: 'app-tv-watched',
  templateUrl: './tv-watched.component.html',
  styleUrls: ['./tv-watched.component.css']
})
export class TvWatchedComponent implements OnInit {

  public watchedTv: Tv[] = [];
  public loading = false;

  constructor(
    private watchedService: WatchedService,
    private tvService: TvService,
  ) {}

  ngOnInit(): void {
    this.loadWatchedTv();
  }

  loadWatchedTv(): void {
    this.loading = true;

    this.watchedService.getWatchedTv().subscribe({
      next: (res) => {
        console.log('Respuesta backend:', res);

        if (!res.status || !Array.isArray(res.data)) {
          console.warn('El backend devolvió un formato inesperado:', res);
          this.watchedTv = [];
          this.loading = false;
          return;
        }

        const ids = [...new Set(res.data.map(id => Number(id)))];

        if (ids.length === 0) {
          this.watchedTv = [];
          this.loading = false;
          return;
        }

        const requests = ids.map(id =>
          this.tvService.tvById(id)
        );

        forkJoin(requests).subscribe({
          next: (tvShows) => {
            this.watchedTv = tvShows;
            this.loading = false;
          },
          error: (err) => {
            console.error('Error al cargar los detalles de las series de TV:', err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener las series de TV vistas:', err);
        this.loading = false;
      }
    });
  }

}
