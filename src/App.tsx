import { Home, SignIn } from 'Pages';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={SignIn} />
      </Switch>
    </Router>
  );
};

export default App;
