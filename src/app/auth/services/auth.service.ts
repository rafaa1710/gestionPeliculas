import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable}  from 'rxjs';
import {URL_API} from 'src/environtments/environment'



@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient){ }

  login(data: {username: string; password: string}): Observable<any>{
    const body = JSON.stringify(data);

    return this.http.post(`${URL_API}/login.php`,body, {
      headers: {'content-Type': 'application/json'}
    })
  }


  //metodo para captar el nombre publico y que se indique al iniciar sesion
  getNombrePublico(): string{
    return localStorage.getItem('nombre_publico') || '';
  }


  //Metodo para cerrar sesion
  logOut(): Observable<any>{
    const body  = new FormData();
    const usuario = localStorage.getItem('usuario') || '';
    body.append('user',usuario);

    //limpio localStorage y cookies
    localStorage.clear();

    return this.http.post(`${URL_API}/logout.php`,body)
  }

}
