import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { ListUsuariosComponent } from '../list-usuarios/list-usuarios.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent {

  id!: number;
  user: any = null;


  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

  }

  private showMessage(message: string, success: boolean = true): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: success ? ['snackbar-success'] : ['snackbar-error']
    });
  }

  confirmDelete(): void {
    this.usersService.delete(this.id).subscribe({
      next: () => {
        this.showMessage('Usuario eliminado correctamente', true);
        this.router.navigate(['/users']);
      },
      error: () => {
        this.showMessage('Error eliminando usuario', false);
      }
    });
  }

}
