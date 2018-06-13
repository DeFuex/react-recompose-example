// @flow

import React from 'react';
import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Commit from './Commit';
import styles from './styles.css';
import withRequestToGithub from './withRequestToGithub';

type CommitsMapItem = {
  sha      : string,
  message? : string,
};

// const RepoQuery : Function = gql`
//   query RepoQuery($owner: String!, $repo: String!, $commitsNumber: Int) {
//     github {
//       repo(ownerUsername: $owner, name: $repo) {
//         commits(limit: $commitsNumber) {
//           sha
//           message
//         }
//       }
//     }
//   }`;

// const withRequestToGithub : Function = graphql(RepoQuery, {
//   options: props => ({
//     variables: {
//       owner: props.match.params.owner,
//       repo: props.match.params.repo,
//       commitsNumber: parseInt(props.location.state.commitsNumber)
//     }
//   })
// });

const withLoading : Function = Component => props => {
  console.log(props.commitsNumber);
  if (props.data.loading) {
    return <div>Loading Repo Commits …</div>;
  } else if (props.data.error !== undefined) {
    return <div>Repository does not exist :(</div>;
  }
  return <Component {...props} />;
};

const renderCommits : Function = (
  commits : Array<CommitsMapItem>,
) : Array<any> => commits.map(({
  id,
  sha,
  message,
} : CommitsMapItem) : any => (
    <Commit
      key={sha}
      sha={sha}
      message={message}
    />
  )
);

const Commits : Function = ({
  ...props
}) => (
  console.log(props),
  <div className={styles.Wrapper}>
    <span className={styles.Title}>Commits in {props.data.variables.repo}</span>
    <ul className={styles.Collection}>
      {renderCommits(props.data.github.repo.commits)}
    </ul>
  </div>
);

// const GithubComponent = withRequestToGithub(Commits);

export default compose(
  withRouter,
  withRequestToGithub,
  withLoading
)(Commits);
