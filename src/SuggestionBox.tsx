import React, { useEffect, useState } from 'react';
import { fromFetch }                  from 'rxjs/fetch';
import { of, merge, Subject }                from 'rxjs';
import {
  flatMap,
  map,
  switchMap,
  catchError }                        from 'rxjs/operators';
import { Suggestion }                 from './Suggestion';
import styles                         from './SuggestionBox.module.css';

const refreshStream = new Subject();

export const SuggestionBox: React.FunctionComponent = () => {
  console.log('rendering suggestionBox');
  const [suggestions, setSuggestions] = useState([]);



  useEffect(() => {
    console.log('in useEffect');

    const requestOnRefreshStream = refreshStream
      .pipe(
        map(_ => {
          const randomOffset = Math.floor(Math.random() * 500);
          return `https://api.github.com/users?since=${randomOffset}`;
        })
      );

    const startupRequestStream = of('https://api.github.com/users');

    const requestStream = merge(requestOnRefreshStream, startupRequestStream);

    const responseStream = requestStream
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

    const subscription = responseStream.subscribe((response) => {
      console.log(response);
    });

    return subscription.unsubscribe;
  });

  const suggestionElements = suggestions.map((n) => {
    return <Suggestion index={n} key={n} />
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Who to follow</div>
        <button
          className={styles.refresh}
          onClick={e => refreshStream.next({ value: '' })}>Refresh</button>
      </div>
      <div className={styles.suggestions}>
        {suggestionElements}
      </div>
    </div>
  );
};