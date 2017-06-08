import React from 'react'
// import { Router, browserHistory } from 'react-router'
import { render } from 'react-dom'
// import configureStore from './config/store'
import { Provider } from 'react-redux'
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider, gql, graphql  } from 'react-apollo';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom';
import { compose } from 'recompose';

import routes from './App'

// const store = configureStore();

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://www.graphqlhub.com/graphql'
  })
});

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

const Repo = props => (
  <div>
    {props.data.github.repo.commits.map(commit => (
      <div key={commit.sha}>
        #{commit.sha.substring(0, 7)} - {commit.message}
      </div>
    ))}
  </div>
);

const withLoading = Component => props => {
  if (props.data.loading) {
    return <div>Loading Repo …</div>;
  }
  return <Component {...props} />;
};

const enhance = compose(
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
);

const RepoWithData = enhance(Repo);

if (typeof document !== 'undefined') {
  render(
    // <Provider store={store}>
  	// 		<Router history={browserHistory} routes={routes} />
    // </Provider>,
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Route path="/:owner/:repo" component={RepoWithData} />
          <Route
            exact
            path="/"
            component={() => (
              <Link to={'/DeFuex/Blogolio'}>
                Blogolio Repository
              </Link>
            )}
          />
        </div>
      </Router>
    </ApolloProvider>,
    document.getElementById('root')
  )
}

export * from './App'
