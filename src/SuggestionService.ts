import { fromFetch }   from 'rxjs/fetch';
import {
  catchError,
  flatMap,
  map,
  startWith,
  switchMap }          from 'rxjs/operators';
import { of, Subject } from 'rxjs/index';

const refreshStream = new Subject();

const requestStream = refreshStream
  .pipe(
    startWith('startup click'),
    map(_ => {
      const randomOffset = Math.floor(Math.random() * 500);
      return `https://api.github.com/users?since=${randomOffset}`;
    }),
  );

const suggestionsStream = requestStream
  .pipe(
    flatMap((requestUrl: string) => {
      return fromFetch(requestUrl).pipe(
        switchMap(response => {
          if (response.ok) {
            return response.json();
          } else {
            return of({ error: true, message: `Error ${response.status}` });
          }
        }),
        catchError(err => {
          console.error(err);
          return of({ error: true, message: err.message })
        })
      );
    })
  );

export {
  suggestionsStream,
  refreshStream
}