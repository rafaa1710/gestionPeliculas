import { Component, OnInit } from '@angular/core';
import { Tv } from '../../interface/tv.interface';
import { TvService } from '../../service/tv.service';

@Component({
  selector: 'app-list-tv-page',
  templateUrl: './list-tv-page.component.html',
  styleUrls: ['./list-tv-page.component.css']
})
export class ListTvPageComponent implements OnInit {

  public series: Tv[] = [];

  //iniciador de carga
  public loading = false;


  public currentPage: number = 1;

  constructor(private tvService: TvService) { }

  ngOnInit(): void {
    this.getPopularSeries();
  }

  private getPopularSeries(reset: boolean = false): void {

    if (reset) {
      this.currentPage = 1;
      this.series = [];
    }

    this.loading = true;
    this.tvService.getPopularSeries(this.currentPage).subscribe({
      next: (series) => {
        this.series = [...this.series, ...series];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar series populares:', err);
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    this.currentPage++;
    this.getPopularSeries();
  }

}
