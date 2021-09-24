import SignUpSuccess from 'Pages/SignUp/Success/SignUpSuccess';
import { Home, SignIn, SignUp } from 'Pages';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { app } from './fBase';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signup-success" component={SignUpSuccess} />
      </Switch>
    </Router>
  );
};

export default App;
