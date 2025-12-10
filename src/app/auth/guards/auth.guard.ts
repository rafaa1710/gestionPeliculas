import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PermissionService } from './../services/permission.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      this.showMessage('Usuario sin acceso, debe iniciar sesión', false);
      return false;
    }

    // Solo verifica si es admin
    const requireAdmin = route.data?.['requireAdmin'] ?? false;

    if (requireAdmin) {
      try {
        const resp: any = await this.permissionService.isAdmin();
        const isAdmin = !!resp?.data?.is_admin;

        if (!isAdmin) {
          this.showMessage('Acceso denegado, debes ser administrador', false);
          this.router.navigate(['/movies']);
          return false;
        }
      } catch (err) {
        console.error('Error comprobando permisos', err);
        this.showMessage('Error comprobando permisos', false);
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;
  }
}
