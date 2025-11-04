import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  nombrePublico: string='';

  //  NECESARIO PARA QUE EL HTML NO DE ERROR
  sidebarItems = [
    { label: 'Películas', icon: 'list', url: '/movies/list' },
    { label: 'Favoritos', icon: 'favorites', url: '/movies/favorites' },
    { label: 'Perfil', icon: 'profile' ,url: '/auth/profile' }
  ];

  constructor(private authService: AuthService,private router: Router){
    this.nombrePublico = this.authService.getNombrePublico();
  }

  ngOnInit(): void {
    this.nombrePublico = this.authService.getNombrePublico();
    console.log('Nombre público cargado 🧠:', this.nombrePublico);
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


}
