import React from 'react'
import { render } from 'react-dom'
// import configureStore from './config/store'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
// import Home from './App'

// const store = configureStore()

const Home = () => <div>Hello World</div>

if (typeof document !== 'undefined') {
  render(
    // <Provider store={store}>
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
    // </Provider>,
        document.getElementById('root')
  )
}

export * from './App'
