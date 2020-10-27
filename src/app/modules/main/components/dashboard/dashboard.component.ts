import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  tap,
  finalize,
  catchError,
  delay,
  map,
  flatMap,
  filter,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private serviceCall$: Observable<any[]>;
  private visibleItems: string[];

  public inputControl = new FormControl();
  public userList$: Observable<any[]>;
  public itemList$: Observable<string[]>;
  public loading = false;
  public errors = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.serviceCall$ = this
      .httpClient
      .get<any>('https://jsonplaceholder.typicode.com/users');

    // https://codinglatte.com/posts/angular/ng-material-autocomplete-http-lookup/
    this.itemList$ = this.inputControl
      .valueChanges
      .pipe(
        filter(value =>
          typeof value === 'string'
          && value.length > 2
          && (this.visibleItems ?? []).indexOf(value) === -1
        ),
        map(value => value.trim()),
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(value => {
          console.log(`Search value: ${value}`);

          return this.itemSearch(value);
        })
      );
  }


  itemSearch(itemName: string): Observable<string[]> {
    const url = `http://localhost:4001/api/data/query/GbWorks.SEn/query-item?p_q=${itemName.toUpperCase()}`;
    return this
      .httpClient
      .get<any>(url)
      .pipe(
        map(response => {
          const values = response.result.data.map((r: { itemname: string; }) => r.itemname);
          this.visibleItems = values;

          return values;
        })
      );
  }

  doSearch() {
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

  doItemSearch(itemName: string) {
    const result$ = of([])
      .pipe(
        tap(_ => {
          console.log('Starting item search...');
        }),
        flatMap(() => this.itemSearch(itemName)),
        catchError((err, _) => {
          console.log('Failed!', err.message);
          return of(null);
        }),
        finalize<any[]>(() => {
          console.log('Finished item search');
        })
      );
    return result$;

    // this.itemList$ = result$;
  }
}
