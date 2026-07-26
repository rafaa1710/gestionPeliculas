import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTvPageComponent } from './pages/list-tv-page/list-tv-page.component';
import { LayoutPageComponent } from '../shared/components/layout-page/layout-page.component';
import { TvPageComponent } from './pages/tv-page/tv-page.component';
import { TvSearchComponent } from './pages/tv-search/tv-search.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'list',
        component: ListTvPageComponent
      },
      {
        path: 'search',
        component: TvSearchComponent
      },
      {
        path: ':id',
        component: TvPageComponent
      },
      {
        path: '',
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
export class TvRoutingModule { }
