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

      console.log("Respuesta backend:", res); // debug

      //Validacion de respuesta
      if (!res.status || !Array.isArray(res.data)) {
        console.warn(" Backend devolvió un formato inesperado:", res);
        return;
      }

      const ids = res.data; // Aquí si es un array real

      // si está vaciio, limpio favoritos y salgo
      if (ids.length === 0) {
        this.favorites = [];
        return;
      }

      // Convierto IDs en peliculas reales usando forkJoin forkJoin usa todas las peticiones en paralelo espera a que recoja todos los datos y despues emite array con todo
      forkJoin(ids.map(id => this.moviesService.movieById(id))).subscribe(movies => {
        this.favorites = movies;
      });


    });



  }






}
