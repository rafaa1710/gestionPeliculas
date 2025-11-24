import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
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
        alert('Usuario eliminado');
        this.cargarUsuarios();
      } else {
        alert('Error al eliminar');
      }
    });
  }

}
