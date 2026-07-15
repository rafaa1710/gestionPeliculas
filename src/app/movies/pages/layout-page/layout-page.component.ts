import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  nombrePublico: string='';
  rolUsuario: number = 0;

  //  NECESARIO PARA QUE EL HTML NO DE ERROR
  sidebarItems = [
    { label: 'Películas', icon: 'list', url: '/movies/list' },
    { label: 'Favoritos', icon: 'favorite', url: '/movies/favorites' },
    { label: 'Buscador', icon: 'search', url: '/movies/search' }
  ];

  constructor(private authService: AuthService,private router: Router){}

  ngOnInit(): void {
    this.nombrePublico = this.authService.getNombrePublico();
    console.log('Nombre publico cargado:', this.nombrePublico);
    this.nombrePublico = this.authService.getNombrePublico();
    const rol = localStorage.getItem('id_rol');
    this.rolUsuario = Number(rol);

    this.configurarMenu();
  }

logout(){
  this.authService.logOut().subscribe({
    next: () => {
      this.router.navigateByUrl('/login');
    },
    error: (err) => {
      console.log('Error al cerrar sesion',err);
      alert('Error cerrando sesion')
    }
  })
}

configurarMenu() {
  if (this.rolUsuario === 1) {
    this.sidebarItems.push({
      label: 'Gestión de Usuarios',
      icon: 'group',
      url: '/users'
    });
  }
}

}
