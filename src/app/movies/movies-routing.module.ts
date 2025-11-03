
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from '../shared/pages/error404-page/error404-page.component';
import { LayoutPageComponent } from './page/layout-page/layout-page.component';

const routes: Routes = [
  { path: '', component: LayoutPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
