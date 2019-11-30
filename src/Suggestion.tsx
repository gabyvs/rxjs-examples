import React from 'react';
import styles from './Suggestion.module.css';

export interface SuggestionProps {
  index: number;
}

export const Suggestion: React.FC<SuggestionProps> = (props: SuggestionProps) => {
  console.log('rendering suggestion: ', props.index);
  return (
    <div className={styles.suggestion}>
      <div className={styles.picture}>
        <img className={styles.image} alt='suggestion'/>
      </div>
      <div className={styles.data}>
        <span className={styles.name}>Erik Meijer</span>
        <span className={styles.at}>@headinthebox</span>
      </div>
      <div className={styles.links}>
        <button className={styles.link}>Follow</button>
        <button className={styles.link}>Discard</button>
      </div>
    </div>
  );
};