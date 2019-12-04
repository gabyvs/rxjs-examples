import React                                from 'react';
import { Subscription }                     from 'rxjs';
import { Suggestion }                       from './Suggestion';
import styles                               from './SuggestionBox.module.css';
import { User }                             from './domain';
import { refreshStream, suggestionsStream } from './SuggestionService';

interface Props {}

interface State {
  suggestions: User[];
}

export class SuggestionBox extends React.Component<Props, State> {
  private _subscription: Subscription | undefined;

  state = {
    suggestions: []
  }

  handleRefresh = () => {
    this.setState({ suggestions: [] });
    refreshStream.next({ value: '' });
  }

  componentDidMount() {
    this._subscription = suggestionsStream.subscribe((response: any[]) => {
      const firstThree = response.slice(0,3);
      this.setState({ suggestions: firstThree });
    });
  }

  componentWillUnmount () {
    this._subscription && this._subscription.unsubscribe();
  }

  render () {
    const suggestionElements = this.state.suggestions.map((user: User) => {
      return <Suggestion key={user.id} user={user} />
    });

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>Who to follow</div>
          <button
            className={styles.refresh}
            onClick={this.handleRefresh}>Refresh</button>
        </div>
        <div className={styles.suggestions}>
          {suggestionElements}
        </div>
      </div>
    );
  }
}