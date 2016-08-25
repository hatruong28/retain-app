import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class AuthService implements CanActivate {
  JWT_KRY: string = 'retain_token';
  constructor(private router: Router) {}
  isAuthorized(): boolean {
    return Boolean(window.localStorage.getItem(this.JWT_KRY));
  }
  canActivate(): boolean {
    const isAuth = this.isAuthorized();
    if (!isAuth) {
      this.router.navigate(['', 'auth']);
    }
    return isAuth;
  }
}