import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router'

@Component({
  selector: 'app-login-pages',
  templateUrl: './login-pages.component.html',
  styleUrls: ['./login-pages.component.css']
})
export class LoginPagesComponent {

  paso: number =1;
  loading = false;


  formEmail = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  })


  formPassword = this.fb.group({
    password: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private authService:  AuthService,
    private router: Router
  ){ }

    siguientePaso(){
      if(this.formEmail.valid){
        this.loading = true;
        setTimeout(() =>{
          this.loading = false,
          this.paso =2;
        }, 1500 )  //este es el delay

      }
    }


  login() {
    const username = this.formEmail.value.email!;
    const password = this.formPassword.value.password!;

    this.authService.login({ username, password }).subscribe({
      next: (resp) => {

        console.log('🔍 RESPUESTA DEL BACKEND COMPLETA:', resp);

        // Guardamos la respuesta cruda para depurar si algo falla
        localStorage.setItem('DEBUG_RESP', JSON.stringify(resp));

        // ✅ Validación correcta (acepta `status:true` o `ok:true`)
        if ((resp.status || resp.ok) && resp.data) {

          // ✅ Guarda token desde resp o resp.data (cubre ambas variantes)
          localStorage.setItem('token', resp.data.token ?? resp.token ?? '');

          // ✅ Guarda usuario si existe
          localStorage.setItem('usuario', resp.data.usuario ?? resp.usuario ?? '');

          // ✅ Guarda nombre público, en snake_case o camelCase
          localStorage.setItem('nombre_publico',
            resp.data.nombre_publico ?? resp.data.nombrePublico ?? ''
          );

          this.router.navigate(['/movies']);

        } else {
          console.warn('⚠️ Backend respondió pero sin status válido:', resp);
          alert('Credenciales incorrectas');
        }

      },
      error: (err) => {
        console.error('❌ Error de login:', err);
        alert('Error de conexión con el servidor');
      }
    });
  }


  logout(){
    this.authService.logOut().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        console.error('Error al cerrar sesion', err);
        alert('Error cerrando sesion')
      }
    });
  }



}
