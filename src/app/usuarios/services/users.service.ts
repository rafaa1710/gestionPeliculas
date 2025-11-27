import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_API } from 'src/environtments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 private base = `${URL_API}/usuario.php`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
  return new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });
}

  getAll() {
    return this.http.get(this.base, { headers: this.getHeaders() });
  }

  getById(id: number) {
    return this.http.get(`${this.base}?id=${id}`, { headers: this.getHeaders() });
  }

  create(body: any) {
    return this.http.post(this.base, body, { headers: this.getHeaders(), responseType: 'text' });
  }

  update(body: any) {
    return this.http.put(this.base, body, { headers: this.getHeaders()});
  }

  delete(id: number) {
    return this.http.delete(`${this.base}?id=${id}`, { headers: this.getHeaders(), responseType: 'text' });
  }

}
