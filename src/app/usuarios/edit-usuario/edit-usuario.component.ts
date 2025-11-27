import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent {

  userId!: number;

  formUser = this.fb.group({
    id_usuario: [this.userId],
    usuario: ['', Validators.required],
    nombre_publico: ['', Validators.required],
    observaciones: [''],
    id_rol: [null, Validators.required],
    habilitado: [true],
    password: ['']
  });

  roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Usuario' },


  ];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userService.getById(this.userId).subscribe((resp: any) => {
      console.log("Respuesta GET:", resp);

      if (resp.status && resp.data) {

        const user = { ...resp.data };

        this.formUser.patchValue({
          id_usuario: this.userId,
          usuario: user.usuario,
          nombre_publico: user.nombre_publico,
          observaciones: user.observaciones,
          id_rol: user.id_rol,
          habilitado: user.habilitado == 1
        });

      }
    });
  }


  private showMessage(message: string, success: boolean = true): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: success ? ['snackbar-success'] : ['snackbar-error']
    });
  }

  guardar() {
  if (this.formUser.invalid) {
    this.formUser.markAllAsTouched();
    return;
  }

  const formValue = this.formUser.value;

  const body = {
    id_usuario: formValue.id_usuario,
    usuario: formValue.usuario,
    nombre_publico: formValue.nombre_publico,
    observaciones: formValue.observaciones,
    id_rol: Number(formValue.id_rol),
    habilitado: formValue.habilitado ? 1 : 0,
    password: formValue.password ?? ''
  };

  this.userService.update(body).subscribe((resp: any) => {
    console.log("UPDATE:", resp);
    this.showMessage('Usuario actualizado correctamente', true);
    this.router.navigate(['/users/list']);
  });
}

  volver() {
    this.router.navigate(['/users/list']);
  }


}
