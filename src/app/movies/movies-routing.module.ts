
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';

const routes: Routes = [
  { path: '', component: LayoutPageComponent,   //pagina principal con menu lateral de navegacion
    children: [
      {
        path: 'list', component: ListPageComponent  //ruta para ver el listado de peliculas
      },
      {
        path: 'movie/:id',
        component: MoviePageComponent      //esta ruta es para ver la ficha de la pelicula
      },
      {
        path:'',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
