import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  flatMap,
  map,
  startWith,
  switchMap }        from 'rxjs/operators';
import {
  combineLatest,
  merge,
  Observable,
  of,
  Subject }          from 'rxjs';
import { User }      from './domain';

const refreshStream = new Subject<null>();
const discard1Stream = new Subject<null>();
const discard2Stream = new Subject<null>();
const discard3Stream = new Subject<null>();

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

function createSuggestionStream (closeStream: Observable<null>): Observable<User | null> {
  const closeStreamStart = closeStream
    .pipe(
      startWith(null)
    );
  const suggestionStream = combineLatest(closeStreamStart, suggestionsStream)
    .pipe(
      map((value: [null, User[]]) => {
        const randomIndex = Math.floor(Math.random() * value[1].length);
        return value[1][randomIndex];
      })
    );
  const refresh = refreshStream.pipe(
    map(_ => null)
  );
  return merge(suggestionStream, refresh)
    .pipe(
      startWith(null),
    );
}

function getDiscardStream(index: number): Subject<null> {
  switch(index) {
    case 1:
      return discard1Stream;
    case 2:
      return discard2Stream;
    default:
      return discard3Stream;
  }
}

export {
  refreshStream,
  createSuggestionStream,
  getDiscardStream,
}