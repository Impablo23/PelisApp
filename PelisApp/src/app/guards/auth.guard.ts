import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, CanActivate, CanLoad, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Permises } from '../interfaces/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}


  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const response = await this.auth.isAuthenticated(state.url);

    if (!response) {
      this.router.navigate(['/home']);
    }

    return response;
  }

}




