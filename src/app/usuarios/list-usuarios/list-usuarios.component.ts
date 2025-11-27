import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {

  usuarios: any[] = [];

  displayedColumns = [
    'id_usuario',
    'usuario',
    'nombre_publico',
    'rol',
    'habilitado',
    'acciones'
  ];

  constructor(
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  private showMessage(message: string, success: boolean = true): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: success ? ['snackbar-success'] : ['snackbar-error']
    });
  }

  cargarUsuarios() {
  this.usersService.getAll().subscribe({
    next: (resp: any) => {
      console.log("Respuesta backend:", resp);

      if (resp.ok && Array.isArray(resp.data)) {
        this.usuarios = resp.data;
      } else {
        console.warn("Formato inesperado:", resp);
        this.usuarios = [];
      }
    },
    error: (err) => {
      console.error("Error cargando usuarios", err);
    }
  });
}

  editar(id: number) {
    this.router.navigate(['/users/edit', id]);
  }

  crear() {
    this.router.navigate(['/users/add']);
  }

  eliminar(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este usuario?')) return;

    this.usersService.delete(id).subscribe((resp: any) => {
      if (resp.status) {
        this.showMessage('Usuario eliminado correctamente', true);
        this.cargarUsuarios();
      } else {
        this.showMessage('Error al eliminar usuario', false);
      }
    });
  }

}
