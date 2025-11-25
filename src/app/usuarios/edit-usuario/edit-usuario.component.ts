import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent {

  userId!: number;

  formUser = this.fb.group({
    id_usuario: [0],
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
    private router: Router
  ) {}

  ngOnInit(): void {

    this.userId = Number(this.route.snapshot.paramMap.get('id'));

  this.userService.getById(this.userId).subscribe((resp: any) => {
    console.log("Respuesta GET:", resp);

    if (resp.status && resp.data) {

      const user = { ...resp.data };
      user.habilitado = user.habilitado == 1;

      this.formUser.patchValue(user);
    }
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

    alert('Usuario actualizado correctamente');
    this.router.navigate(['/users/list']);
  });
}

  volver() {
    this.router.navigate(['/users/list']);
  }


}
