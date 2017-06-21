import React from 'react';
import type CommitProps from './typings.js';
import styles from './styles.css';

type CommitPropsInner = CommitProps;

const Commit : Function = ({
  sha,
  message,
} : CommitPropsInner) : React.Element<any> => (
  <li className={styles.Item}>
    #{sha.substring(0, 7)} - {message}
  </li>
)

export default Commit;
