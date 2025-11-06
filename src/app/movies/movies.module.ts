import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    MovieCardComponent,
    MoviePageComponent,
    SearchPageComponent,
    FavoritesPageComponent,

  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MoviesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class MoviesModule { }
