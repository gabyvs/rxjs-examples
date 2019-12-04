import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  flatMap,
  map,
  startWith,
  switchMap }        from 'rxjs/operators';
import {
  merge,
  Observable,
  of,
  Subject }          from 'rxjs/index';
import { User }      from './domain';

const refreshStream = new Subject<null>();
const discard1Stream = new Subject();
const discard2Stream = new Subject();
const discard3Stream = new Subject();

const requestStream: Observable<string> = refreshStream
  .pipe(
    startWith('startup click'),
    map(_ => {
      const randomOffset = Math.floor(Math.random() * 500);
      return `https://api.github.com/users?since=${randomOffset}`;
    }),
  );

const suggestionsStream: Observable<Array<User>> = requestStream
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

function createSuggestionStream (): Observable<User | null> {
  const suggestionStream = suggestionsStream
    .pipe(
      map((usersList: User[]) => {
        const randomIndex = Math.floor(Math.random() * usersList.length);
        return usersList[randomIndex];
      })
    );
  const refresh = refreshStream.pipe(
    map(_ => null)
  );
  return merge(suggestionStream, refresh);
}

export {
  suggestionsStream,
  refreshStream,
  discard1Stream,
  discard2Stream,
  discard3Stream,
  createSuggestionStream,
}