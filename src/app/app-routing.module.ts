import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LoginPagesComponent } from './auth/pages/login-pages/login-pages.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginPagesComponent },

    { path: 'movies',
      loadChildren:() => import('./movies/movies.module').then(m => m.MoviesModule)
    },

  { path: '**', component: Error404PageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
