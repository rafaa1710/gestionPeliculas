import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  private showMessage(message: string, success: boolean = true): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: success ? ['snackbar-success'] : ['snackbar-error']
    });
  }

  save(): void {

    if (!this.user.usuario || !this.user.password || !this.user.nombre_publico) {
      this.showMessage('Faltan campos obligatorios.', false);
      return;
    }

    this.usersService.create(this.user).subscribe({
      next: () => {
        this.showMessage('Usuario creado correctamente', true);
        this.router.navigate(['/users/list']);
      },
      error: () => {
        this.showMessage('Error al crear usuario', false);
      }
    });
  }

}
