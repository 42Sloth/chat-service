import { ChatPage, Home, SignIn, SignUp } from 'Pages';
import SignUpSuccess from 'Pages/SignUp/Success/SignUpSuccess';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signup-success" component={SignUpSuccess} />
          <Route path="/chat/:id" component={ChatPage} />
          <Route path="/dm/:id" exact component={ChatPage} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
};

export default App;
