import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import {environment} from '@environments/environment'
import { switchMap, tap } from 'rxjs';
import { TokenService} from '@services/token.service';
import { ResponseLogin} from '@models/auth.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;
  constructor(private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email:string, password:string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
      email,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
      })
    );
  }

  Register(name: string, email:string, password:string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      name,
      email,
      password
    });
  }

  ValidateUser(email:string){
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`, { email });
  }

  RegisterAndLogin(name: string, email:string, password:string){
    return this.Register(name, email, password)
    .pipe(
      switchMap(()=> this.login(email, password))
    );
  }

  recovery(email: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, {email});
  }

  changePassword(token: string, newPassword: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, {token, newPassword});
  }




}
