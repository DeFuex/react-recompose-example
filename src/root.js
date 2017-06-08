import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
	Switch,
} from 'react-router-dom';
import Commit from './components/Commit';

const NoMatch = () => <div>404</div>

const Root = () => (
	<Router>
		<Switch> {/* necessary cause to render one Route exclusively */}
			<Route exact path="/" component={() => (
					<Link to={'/DeFuex/react-recompose-example'}>
						react-recompose-example Repository
					</Link>
				)}
			/>
			<Route path="/:owner/:repo" component={Commit} />
			<Route component={NoMatch}/>
		</Switch>
	</Router>
)

export default Root;
