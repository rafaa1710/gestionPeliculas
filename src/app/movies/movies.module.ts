import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviesRoutingModule } from './movies-routing.module';
import { MaterialModule } from '../material/material.module';
import { ListPageComponent } from './pages/list-film-page/list-page.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FavoritesPageComponent } from './pages/favorites-page/favorites-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { WatchedPageComponent } from './pages/watched-film-page/watched-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ListPageComponent,
    MovieCardComponent,
    MoviePageComponent,
    SearchPageComponent,
    FavoritesPageComponent,
    WatchedPageComponent,


  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MoviesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatExpansionModule,
    SharedModule
  ],
  exports: [
    MatTooltipModule,
    MatExpansionModule
  ]
})
export class MoviesModule { }
