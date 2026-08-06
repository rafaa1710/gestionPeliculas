import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Tv } from '../../interface/tv.interface';
import { TvService } from '../../service/tv.service';

@Component({
  selector: 'app-tv-search',
  templateUrl: './tv-search.component.html',
  styleUrls: ['./tv-search.component.css']
})
export class TvSearchComponent {

  public searchInput = new FormControl('');
  public series: Tv[] = [];


  constructor(private tvService: TvService) {}

  searchSeries(): void {
    const value = this.searchInput.value?.trim();

    if (!value) {
      this.series = [];
      return;
    }



    this.tvService.searchSeries(value).subscribe({
      next: (series) => {
        this.series = series;

      },
      error: (err) => {
        console.error('Error al buscar series:', err);
        this.series = [];
      }
    });
  }

  clearSearch(): void {
    this.searchInput.setValue('');
    this.series = [];

  }
}
