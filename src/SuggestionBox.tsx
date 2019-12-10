import React                                               from 'react';
import { Suggestion }                                      from './Suggestion';
import styles                                              from './SuggestionBox.module.css';
import { getDiscardStream, refreshStream } from './SuggestionService';

export const SuggestionBox: React.FC = () => {
  const suggestions = [1,2,3].map(createSuggestion);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>Who to follow</div>
        <button
          className={styles.refresh}
          onClick={() => refreshStream.next(null)}>Refresh</button>
      </div>
      <div className={styles.suggestions}>
        {suggestions}
      </div>
    </div>
  );
}

function createSuggestion(index: number) {
  return <Suggestion key={index} discardStream={getDiscardStream(index)}/>
}