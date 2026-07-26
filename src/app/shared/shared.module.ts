import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutPageComponent } from './components/layout-page/layout-page.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,

],
exports: [
  Error404PageComponent,
  LayoutPageComponent,
  RouterModule
]
})
export class SharedModule { }
