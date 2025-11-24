import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { UsersRoutingModule } from './users-routing.module';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AddUsuarioComponent,
    EditUsuarioComponent,
    DeleteUsuarioComponent,
    ListUsuariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
     MatTableModule,
  ]
})
export class UsersModule { }
