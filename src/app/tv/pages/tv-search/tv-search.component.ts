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
  public loading = false;
  public searched = false;

  constructor(private tvService: TvService) {
    this.searchInput.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(value => this.searchSeries(value));
  }

  searchSeries(value: string | null): void {
    const query = value?.trim();

    if (!query) {
      this.series = [];
      this.searched = false;
      return;
    }

    this.loading = true;
    this.searched = true;

    this.tvService.searchSeries(query).subscribe({
      next: (series) => {
        this.series = series;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al buscar series:', err);
        this.series = [];
        this.loading = false;
      }
    });
  }

  clearSearch(): void {
    this.searchInput.setValue('');
    this.series = [];
    this.searched = false;
  }
}
