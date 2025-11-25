import { Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{

  constructor(private router: Router) {}

  //El guard comprueba si existe un token en el localStorage (es decir, si el usuario está logueado).
  // Si no hay token, lo redirige automáticamente al login.
  // Si sí hay token, le permite pasar. Esto añade seguridad a la navegación de la app.
  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (!token){
      //sin token redirige al login
      this.router.navigate(['/login']);
      return false;
    }

    //si hay token te deja acceder
     return true;

  }

}




