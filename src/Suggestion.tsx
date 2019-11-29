import React from 'react';
import styles from './Suggestion.module.css';

export interface SuggestionProps {
  index: number;
}

export const Suggestion: React.FC<SuggestionProps> = (props: SuggestionProps) => {
  return (
    <div className={styles.suggestion}>
      <div className={styles.picture}>
        <img className={styles.image}/>
      </div>
      <div className={styles.data}>
        <span className={styles.name}>Erik Meijer</span>
        <span className={styles.at}>@headinthebox</span>
      </div>
      <div className={styles.links}>
        <a href="#" target="_blank" className={styles.link}>Follow</a>
        <a href="#" className={styles.link}>Discard</a>
      </div>
    </div>
  );
};