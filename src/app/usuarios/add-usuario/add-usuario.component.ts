import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent {

   user = {
    usuario: '',
    password: '',
    nombre_publico: '',
    id_rol: 3,
    observaciones: ''
  };

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  save(): void {

    if (!this.user.usuario || !this.user.password || !this.user.nombre_publico) {
      alert('Faltan campos obligatorios.');
      return;
    }

    this.usersService.create(this.user).subscribe({
      next: () => {
        alert('Usuario creado correctamente');
        this.router.navigate(['/users/list']);
      },
      error: () => {
        alert('Error al crear usuario');
      }
    });
  }

}
