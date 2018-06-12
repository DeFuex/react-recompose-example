// @flow

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
	Switch,
} from 'react-router-dom';
import Search from './components/Search';
import Commits from './components/Commits';

const NoMatch : Function = () => <div>404</div>

const Root : Function = () => (
	<Router>
		<Switch> {/* necessary cause to render one Route exclusively */}
			<Route exact path="/" component={Search}
			/>
			<Route path="/:owner/:repo" component={Commits} />
			<Route component={NoMatch}/>
		</Switch>
	</Router>
)

export default Root;
