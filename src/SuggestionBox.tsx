import React             from 'react';
import { Suggestion }    from './Suggestion';
import styles            from './SuggestionBox.module.css';
import { refreshStream } from './SuggestionService';

export const SuggestionBox: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Who to follow</div>
        <button
          className={styles.refresh}
          onClick={() => refreshStream.next(null)}>Refresh</button>
      </div>
      <div className={styles.suggestions}>
        <Suggestion key={1}/>
        <Suggestion key={2}/>
        <Suggestion key={3}/>
      </div>
    </div>
  );
}