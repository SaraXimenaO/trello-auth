import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService} from '@services/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private TokenService: TokenService,
    private router: Router
  )
  {}

  canActivate(): boolean {

    const token = this.TokenService.getToken();
    if(!token){
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
