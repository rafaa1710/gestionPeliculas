import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-delete-usuario',
  templateUrl: './delete-usuario.component.html',
  styleUrls: ['./delete-usuario.component.css']
})
export class DeleteUsuarioComponent {

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  confirmDelete(): void {
    this.usersService.delete(this.id).subscribe({
      next: () => {
        alert('Usuario eliminado correctamente');
        this.router.navigate(['/users']);
      },
      error: () => {
        alert('Error eliminando usuario');
      }
    });
  }

}
