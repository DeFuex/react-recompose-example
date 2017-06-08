import React from 'react';
import { gql, graphql } from 'react-apollo';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

const RepoQuery = gql`
  query RepoQuery($owner: String!, $repo: String!) {
    github {
      repo(ownerUsername: $owner, name: $repo) {
        commits(limit: 5) {
          sha
          message
        }
      }
    }
  }
`;

const withLoading = Component => props => {
  if (props.data.loading) {
    return <div>Loading Repo Commits …</div>;
  }
  return <Component {...props} />;
};

const Commit = props => (
  <div>
    {props.data.github.repo.commits.map(commit => (
      <div key={commit.sha}>
        #{commit.sha.substring(0, 7)} - {commit.message}
      </div>
    ))}
  </div>
);

export default compose(
  withRouter,
  graphql(RepoQuery, {
    options: props => ({
      variables: {
        owner: props.match.params.owner,
        repo: props.match.params.repo
      }
    })
  }),
  withLoading
)(Commit);
