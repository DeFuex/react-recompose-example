import React from 'react';
import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Commit from './Commit';

type CommitsMapItem = {
  sha      : string,
  message? : string,
};

const RepoQuery : Function = gql`
  query RepoQuery($owner: String!, $repo: String!) {
    github {
      repo(ownerUsername: $owner, name: $repo) {
        commits(limit: 5) {
          sha
          message
        }
      }
    }
  }`;

const withRequestToProps : Function = graphql(RepoQuery, {
  options: props => ({
    variables: {
      owner: props.match.params.owner,
      repo: props.match.params.repo
    }
  })
});

const withLoading : Function = Component => props => {
  if (props.data.loading) {
    return <div>Loading Repo Commits …</div>;
  }
  return <Component {...props} />;
};

const renderCommits : Function = (
  commits : Array<CommitsMapItem>,
) : Array<React.Element<any>> => commits.map(({
  id,
  sha,
  message,
} : CommitsMapItem) : React.Element<any> => (
    <Commit
      key={sha}
      sha={sha}
      message={message}
    />
  )
);

const Commits : Function = props => (
  <div>
    {renderCommits(props.data.github.repo.commits)}
  </div>
);

export default compose(
  withRouter,
  withRequestToProps,
  withLoading
)(Commits);
