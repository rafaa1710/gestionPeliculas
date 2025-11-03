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


    login(){
      const email = this.formEmail.value.email!;
      const password = this.formPassword.value.password!;
      console.log('Login enviado', {email,password});
      //aqui se conecta con le backend
      this.authService.login({email,password}).subscribe({
        next: (resp) => {
          console.log('Respuesta del backend',resp);

        //aqui evalua la respuesta y redirige si ok

        if(resp.ok){
          localStorage.setItem('token',resp.token)
          this.router.navigate(['/movies'])
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error:(err) =>{
        console.error('Error de login', err);
        alert('Error de conexion con el servidor');
      }
    });
  }



}
