import React from 'react';
import { Link } from 'react-router-dom';
import {
  compose,
  withState,
  withHandlers,
} from 'recompose';

import type SearchProps from './typings.js';

type SearchPropsInner = SearchProps;

const withRepoInState : Function = withState('repo', 'setRepo', '');

const withExtendedHandlers : Function = withHandlers({
  handleInputValue : ({
    repo,
    setRepo,
  } : SearchPropsInner) : Function => ({ target } : SyntheticInputEvent) : void => {
    setRepo(target.value);
  },
  handleKeyPress : ({
    repo,
    ...props,
  } : SearchPropsInner) : Function => (event : SyntheticInputEvent) : void => {
    if(event.key == 'Enter'){
      props.history.push(`/DeFuex/${repo}`);
    }
  },
});

const Search : Function = ({
  repo,
  handleInputValue,
  handleKeyPress,
} : SearchPropsInner) : React.Element<any> => (
  <div>
    <input
      type={'text'}
      maxLength={40}
      onChange={handleInputValue}
      onKeyUp={handleKeyPress}
    />
    <Link to={`/DeFuex/${repo}`}>
      {repo} Repository
    </Link>
  </div>
)

export default compose(
  withRepoInState,
  withExtendedHandlers,
)(Search);
