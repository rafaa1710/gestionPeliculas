import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { DeleteUsuarioComponent } from './delete-usuario/delete-usuario.component';
import { AuthGuard } from '../auth/guards/auth.guard';


// aqui en las rutas viene del authGuards con el rol y este te deja si es 1 (administrador)
const routes: Routes = [
  { path: 'list', component: ListUsuariosComponent ,canActivate: [AuthGuard],
  data: { rol: 1 }},
  { path: 'add', component: AddUsuarioComponent ,canActivate: [AuthGuard],
  data: { rol: 1 }},
  { path: 'edit/:id', component: EditUsuarioComponent,canActivate: [AuthGuard],
  data: { rol: 1 } },
  { path: 'delete/:id', component: DeleteUsuarioComponent,canActivate: [AuthGuard],
  data: { rol: 1 } },
  { path: '', redirectTo: 'list', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
