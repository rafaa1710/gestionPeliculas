import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable}  from 'rxjs';
import {URL_API} from 'src/environtments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthService{

  constructor(private http: HttpClient){ }

  login(data: {email: string; password: string}): Observable<any>{
    const body = JSON.stringify(data);

    return this.http.post(`${URL_API}/login.php`,body, {
      headers: {'content-Type': 'application/json'}
    })
  }

}
