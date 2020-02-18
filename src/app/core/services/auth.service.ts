import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = false;
  constructor() { }

  get isLogged(): boolean {
    return this.logged;
  }

  login(): Observable<void> {
    const subject = new Subject<void>();

    setTimeout(() => {
      subject.error('Log in failed!');
    }, 2000);

    setTimeout(() => {
      console.log('On service');
      this.logged = true;
      subject.next();
    }, 3000);

    return subject.asObservable();
  }
}
