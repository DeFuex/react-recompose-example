import React, { Component } from 'react';
import { Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
// import Home from '../components/Home';

const Home = () => <div>Hello World is on so what is going on</div>
const NotFound = () => <h4>Not Found :( </h4>;

export const routes = (
	<Route path='/' title='App' component={Home}>
		<IndexRoute component={Home} />
		<Route path='*' title='404: Not Found' component={NotFound} />
	</Route>
);

export default routes;
