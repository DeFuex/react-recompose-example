import React from 'react'
import { render } from 'react-dom'
// import configureStore from './config/store'
import { Provider } from 'react-redux'
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import Root from './root.js'

// const store = configureStore();

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://www.graphqlhub.com/graphql'
  })
});

if (typeof document !== 'undefined') {
  render(
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>,
    document.getElementById('root')
  )
}
