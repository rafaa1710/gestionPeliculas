import { MoviesService } from './../../services/movies.service';
import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Movie } from '../../interfaces/movie.interface';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit{

  // 🎬 Lista de películas
  public movies: Movie[] = [];

  // 🔍 Campo de búsqueda
  public searchInput = new FormControl('');

  // ⏳ Indicador de carga
  public loading = false;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadPopularMovies();

    // 🕓 Escucha cambios en el buscador con un pequeño retardo
    this.searchInput.valueChanges
      .pipe(debounceTime(400))
      .subscribe(value => this.onSearch(value));
  }

  /** 🔹 Carga las películas populares al inicio */
  private loadPopularMovies(): void {
    this.loading = true;
    this.moviesService.getPopularMovie().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al cargar películas populares:', err);
        this.loading = false;
      }
    });
  }

  /** 🔹 Busca películas según el texto escrito */
  onSearch(value: string | null): void {
    const query = value?.trim();

    if (!query) {
      this.loadPopularMovies(); // 🔁 si está vacío, vuelve a populares
      return;
    }

    this.loading = true;
    this.moviesService.searchMovies(query).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error al buscar películas:', err);
        this.loading = false;
      }
    });
  }

  /** 🔹 Limpia el campo de búsqueda */
  clearSearch(): void {
    this.searchInput.setValue('');
  }

  /** 🔹 Devuelve la URL completa del póster */
  getImageUrl(path: string | null): string {
    return this.moviesService.getImageUrl(path);
  }



}
