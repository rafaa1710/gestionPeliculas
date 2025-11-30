import { PermissionService } from './../services/permission.service';
import { Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate{

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private permissionService: PermissionService
  ) {}

  private showMessage(message: string, success: boolean = true): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: success ? ['snackbar-success'] : ['snackbar-error']
    });
  }

  //El guard comprueba si existe un token en el localStorage (es decir, si el usuario está logueado).
  // Si no hay token, lo redirige automáticamente al login.
  // Si sí hay token, le permite pasar. Esto añade seguridad a la navegación de la app.
  // si no hay token pero esta registrado en la bd lo deja entrar y se genera si no esta registrado no hay token no lo deja
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!token){
      //sin token redirige al login
      this.router.navigate(['/login']);
      this.showMessage('Usuario sin acceso, debe iniciar sesion', false);
      //console.log('Usuario sin acceso');
      return false;
    }

    //  Comprobar si tiene el rol necesario si el rol no es 1 (administrador) te redirige al list aqui salta el snackbar

    console.log('Comprobando permisos de administrador...');
    const response=!this.permissionService.isAdmin()
    // se va al users-routing con el rol y alli si es 1 te deja y si no vuelve aqui y te pone el snackbar
    console.log(response)
    if (response ) {
      this.showMessage('Acceso denegado, debes de ser administrador', false);
      this.router.navigate(['/movies']);
      return false;
    }

    //si hay token te deja acceder
     return true;

  }

}




