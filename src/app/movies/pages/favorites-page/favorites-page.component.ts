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

      console.log("Respuesta backend:", res); // ✅ debug

      // 1️⃣ Validación de respuesta
      if (!res.status || !Array.isArray(res.data)) {
        console.warn("⚠️ Backend devolvió un formato inesperado:", res);
        return;
      }

      const ids = res.data; // ✅ Aquí sí es un array real

      // 2️⃣ Si está vacío, limpiamos favoritos y salimos
      if (ids.length === 0) {
        this.favorites = [];
        return;
      }

      // 3️⃣ Convertimos IDs en películas reales usando forkJoin
      forkJoin(ids.map(id => this.moviesService.movieById(id))).subscribe(movies => {
        this.favorites = movies;
      });


    });



  }






}
