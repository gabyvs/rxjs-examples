import { css }           from 'emotion';
import React             from 'react';
import { SuggestionBox } from './SuggestionBox';

const style = css`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #73bbd9;
  width: 100%;
  height: 100vh;       
`;

export const App: React.FC = () => {
  return (
    <div className={style}>
      <SuggestionBox />
    </div>
  );
}