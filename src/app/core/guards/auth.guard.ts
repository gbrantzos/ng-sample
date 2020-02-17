import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const redirectUrl = state.url;

    if (this.authService.isLogged) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        ['/auth/login'], {
        queryParams: {
          redirectUrl
        }
      })
    );
    return false;
  }
}
