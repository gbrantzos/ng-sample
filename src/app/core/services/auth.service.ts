import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logged = true;
  constructor() { }

  get isLogged(): boolean {
    return this.logged;
  }

  login(): Observable<void> {
    const subject = new BehaviorSubject<void>(null);

    setTimeout(() => {
      subject.error('Log in failed!');
    }, 20000);

    setTimeout(() => {
      console.log('On service');
      this.logged = true;
      subject.next();
    }, 3000);

    return subject.asObservable();
  }
}
