import React    from 'react';
import { User } from './domain';
import styles   from './Suggestion.module.css';

export interface SuggestionProps {
  user: User;
}

export const Suggestion: React.FC<SuggestionProps> = (props: SuggestionProps) => {
  return (
    <div className={styles.suggestion}>
      <div className={styles.picture}>
        <img className={styles.image} alt='suggestion' src={props.user.avatar_url}/>
      </div>
      <span className={styles.at}>@{props.user.login}</span>
      <div className={styles.links}>
        <button className={styles.link}>Discard</button>
        <button className={styles.link}>Follow</button>
      </div>
    </div>
  );
};