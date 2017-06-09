import React from 'react';
import type CommitProps from './typings.js';

type CommitPropsInner = CommitProps;

const Commit : Function = ({
  sha,
  message,
} : CommitPropsInner) : React.Element<any> => (
  <p>
    #{sha.substring(0, 7)} - {message}
  </p>
)

export default Commit;
