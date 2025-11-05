import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { MaterialModule } from '../material/material.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    MovieCardComponent,
    MoviePageComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MaterialModule
  ]
})
export class MoviesModule { }
