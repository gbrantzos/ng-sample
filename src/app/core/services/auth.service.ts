import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = false;
  constructor() { }

  get isLogged(): boolean {
    return this.logged;
  }

  login() {
    this.logged = true;
  }
}
