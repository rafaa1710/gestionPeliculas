import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

import { TvService } from '../../service/tv.service';
import {
  FavoritesResponse,
  FavoritesTvService
} from '../../service/favorites-tv.service';
import { Tv } from '../../interface/tv.interface';

@Component({
  selector: 'app-tv-favorites',
  templateUrl: './tv-favorites.component.html',
  styleUrls: ['./tv-favorites.component.css']
})
export class TvFavoritesComponent implements OnInit {

  public favorites: Tv[] = [];
  public loading = false;

  constructor(
    private favoritesService: FavoritesTvService,
    private tvService: TvService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.loading = true;

    this.favoritesService.getFavorites().subscribe({
      next: (res: FavoritesResponse) => {
        console.log('Respuesta backend:', res);

        if (!res.status || !Array.isArray(res.data)) {
          console.warn('Backend devolvió un formato inesperado:', res);
          this.favorites = [];
          this.loading = false;
          return;
        }

        const ids: number[] = res.data
          .map((id: number) => Number(id))
          .filter((id: number) => Number.isInteger(id) && id > 0);

        if (ids.length === 0) {
          this.favorites = [];
          this.loading = false;
          return;
        }

        const peticiones: Observable<Tv>[] = ids.map(
          (id: number) => this.tvService.tvById(id)
        );

        forkJoin(peticiones).subscribe({
          next: (tvs: Tv[]) => {
            this.favorites = tvs;
            this.loading = false;
          },
          error: (err: unknown) => {
            console.error('Error obteniendo series desde TMDB:', err);
            this.favorites = [];
            this.loading = false;
          }
        });
      },
      error: (err: unknown) => {
        console.error('Error obteniendo favoritos:', err);
        this.favorites = [];
        this.loading = false;
      }
    });
  }

  onFavoriteChange(serie: Tv, isFavorite: boolean): void {
    if (!isFavorite) {
      this.favorites = this.favorites.filter(item => item.id !== serie.id);
    }
  }
}
