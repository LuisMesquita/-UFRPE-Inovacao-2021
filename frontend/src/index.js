// Global
import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
// Store
import { store, history } from './redux/store'
// Components
import Home from './pages/Home'
// Stylesheet
import '@clayui/css/lib/css/atlas.css'

const queryClient = new QueryClient()

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root'),
)
