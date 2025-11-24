import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';

const routes: Routes = [
  { path: 'list', component: ListUsuariosComponent },
  { path: 'add', component: AddUsuarioComponent },
  { path: 'edit/:id', component: EditUsuarioComponent },
  { path: 'delete/:id', component: DeleteUsuarioComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
