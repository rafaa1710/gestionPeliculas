import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

    { path: 'movies',
      canActivate: [AuthGuard],
      loadChildren:() => import('./movies/movies.module').then(m => m.MoviesModule)
    },
  {
    path: 'tv',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tv/tv.module').then(m => m.TvModule)
  },

  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'users',
    loadChildren: () => import('./usuarios/users.module').then(m => m.UsersModule)
  },
  { path: '**', component: Error404PageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
