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
    id_rol: ['', Validators.required],
    habilitado: [true],
    password: ['']
  });

  roles = [
    { id: 1, nombre: 'Administrador' },
    { id: 2, nombre: 'Supervisor' },
    { id: 3, nombre: 'Vendedor' }
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

      if (resp.ok && resp.data) {

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

    const body = {
      ...this.formUser.value,
      habilitado: this.formUser.value.habilitado ? 1 : 0
    };

    this.userService.update(body).subscribe((resp: any) => {
      console.log("Respuesta UPDATE:", resp);

      if (resp.ok) {
        alert('Usuario actualizado correctamente');
        this.router.navigate(['/users/list']);
      } else {
        alert('Error al guardar');
      }
    });
  }

  volver() {
    this.router.navigate(['/users/list']);
  }


}
