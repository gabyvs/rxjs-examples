import React                                     from 'react';
import { User }                                  from './domain';
import styles                                    from './Suggestion.module.css';
import { Subject, Subscription }                 from 'rxjs';
import { createSuggestionStream } from './SuggestionService';

export class Suggestion extends React.Component<{discardStream: Subject<null>}, { suggestion: User | null}> {
  private _subscription: Subscription | undefined;

  state = {
    suggestion: null
  };

  componentDidMount() {
    this._subscription = createSuggestionStream(this.props.discardStream)
      .subscribe((user: User | null) => {
        this.setState({ suggestion: user });
      })
  }

  componentWillUnmount () {
    this._subscription && this._subscription.unsubscribe();
  }

  render () {
    const suggestion = this.state.suggestion;
    if (suggestion) {
       const user = suggestion as User;
       return <UserSuggestion user={user} discardStream={this.props.discardStream}/>
    }

    return <EmptySuggestion />;
  }
}

const EmptySuggestion: React.FC = () => {
  return (
    <div className={styles.suggestion}>
      <div className={styles.picture}>
        <img
          className={styles.image}
          alt='suggestion'
          src='user.png'
        />
      </div>
      <div className={styles.empty} />
    </div>
  );
};

const UserSuggestion: React.FC<{user : User, discardStream: Subject<null>}> = (props) => {
  return (
    <div className={styles.suggestion}>
      <div className={styles.picture}>
        <img
          className={styles.image}
          alt='suggestion'
          src={props.user.avatar_url}
        />
      </div>
      <span className={styles.at}>@{props.user.login}</span>
      <div className={styles.links}>
        <button
          className={styles.link}
          onClick={() => props.discardStream.next(null)}
        > Discard
        </button>
        <button className={styles.link}>Follow</button>
      </div>
    </div>
  );
};