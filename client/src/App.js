import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';

import Navbar from './components/navbar'

import Login from './pages/Login';
import Homepage from './pages/Homepage';
import SinglePost from './pages/SinglePost';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

const  App = () => {

  return (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Navbar /> 
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/post/:id" component={SinglePost} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </main>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
