import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {URL_API} from 'src/environtments/environment'


@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
  }

  isAdmin() {
    return this.http.get(`${URL_API}/permission.php`, { headers: this.getHeaders() });
  }

}
