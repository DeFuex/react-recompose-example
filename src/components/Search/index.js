// @flow

import React from 'react';
import { Link } from 'react-router-dom';
import {
  compose,
  withState,
  withHandlers,
} from 'recompose';
import styles from './styles.css';
import type SearchProps from './typings.js';

type SearchPropsInner = SearchProps;

const withOwnerInState : Function = withState('owner', 'setOwner', '');
const withRepoInState : Function = withState('repo', 'setRepo', '');
const withCommitsInState : Function = withState('commitsNumber', 'setCommitsNumber', 0);

const withExtendedHandlers : Function = withHandlers({
  handleOwnerInputValue : ({
    owner,
    setOwner,
  } : SearchPropsInner) : Function => ({ target } : SyntheticInputEvent) : void => {
    setOwner(target.value);
  },
  handleRepoInputValue : ({
    repo,
    setRepo,
  } : SearchPropsInner) : Function => ({ target } : SyntheticInputEvent) : void => {
    setRepo(target.value);
  },
  handleCommitsInputValue : ({
    commitsNumber,
    setCommitsNumber,
  } : SearchPropsInner) : Function => ({ target } : SyntheticInputEvent) : void => {
    setCommitsNumber(target.value);
  },
  handleKeyPress : ({
    owner,
    repo,
    commitsNumber,
    ...props,
  } : SearchPropsInner) : Function => (event : SyntheticInputEvent) : void => {
    if(event.key == 'Enter') {
      console.log(props.commitsNumber);
      // props.history.push(`/${owner}/${repo}`);
      props.history.push({ pathname: `/${owner}/${repo}`, state: { commitsNumber: commitsNumber } });
    }
  },
});

const Search : Function = ({
  owner,
  repo,
  commitsNumber,
  handleOwnerInputValue,
  handleRepoInputValue,
  handleCommitsInputValue,
  handleKeyPress,
} : SearchPropsInner) : React.Element<any> => (
  <div className={styles.Wrapper}>
    <span className={styles.Title}>Github Owner: 
      <input
        className={styles.Input}
        type={'text'}
        maxLength={10}
        onChange={handleOwnerInputValue}
        onKeyUp={handleKeyPress}
      />
    </span>
    <input
      className={styles.Input}
      type={'text'}
      maxLength={40}
      onChange={handleRepoInputValue}
      onKeyUp={handleKeyPress}
    />
    <Link className={styles.Link} to={`/${owner}/${repo}`}>
      {repo} Repository
    </Link>
        <input
      className={styles.Input}
      type={'text'}
      maxLength={40}
      onChange={handleCommitsInputValue}
      onKeyUp={handleKeyPress}
    />
    <Link className={styles.Link} to={{ pathname: `/${owner}/${repo}`, state: { commitsNumber: commitsNumber } }}>
      How many Commits?
      { (commitsNumber > 0) && <span> {commitsNumber} it is! </span> }
    </Link>
  </div>
)

export default compose(
  withCommitsInState,
  withOwnerInState,
  withRepoInState,
  withExtendedHandlers,
)(Search);
