import React          from 'react';
import { Suggestion } from './Suggestion';
import styles         from './SuggestionBox.module.css';

export const SuggestionBox: React.FunctionComponent = () => {
  const suggestions = [1,2,3].map((n) => {
    return <Suggestion index={n} key={n} />
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Who to follow</div>
        <button className={styles.refresh}>Refresh</button>
      </div>
      <div className={styles.suggestions}>
        {suggestions}
      </div>
    </div>
  );
};