import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, finalize, catchError, delay, map, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private serviceCall$: Observable<any[]>;
  public userList$: Observable<any[]>;
  public loading = false;
  public errors = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.serviceCall$ = this
      .httpClient
      .get<any>('https://jsonplaceholder.typicode.com/users');
  }

  search() {
    const result$ = of({})
      .pipe(
        tap(_ => {
          this.loading = true;
          this.errors = '';
          console.log('Starting...');
        }),
        flatMap(() => this.serviceCall$.pipe(delay(1000))),
        // map(data => []),
        catchError((err, _) => {
          this.errors = err.message;
          console.log('Failed!', err.message);
          return of(null);
        }),
        finalize<any[]>(() => {
          this.loading = false;
          console.log('Finished');
        })
      );

    this.userList$ = result$;
  }
}
