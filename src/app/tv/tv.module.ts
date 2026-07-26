import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TvRoutingModule } from './tv-routing.module';
import { ListTvPageComponent } from './pages/list-tv-page/list-tv-page.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { TvCardComponent } from './components/tv-card/tv-card.component';
import { TvPageComponent } from './pages/tv-page/tv-page.component';
import { TvSearchComponent } from './pages/tv-search/tv-search.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListTvPageComponent,
    TvCardComponent,
    TvPageComponent,
    TvSearchComponent
  ],
  imports: [
    CommonModule,
    TvRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TvModule { }
