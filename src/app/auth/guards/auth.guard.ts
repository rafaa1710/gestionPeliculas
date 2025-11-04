import { Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{

  constructor(private router: Router) {}

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




