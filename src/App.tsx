import { getAuth, onAuthStateChanged } from '@firebase/auth';
import { ChatPage, Home, SignIn, SignUp } from 'Pages';
import SignUpSuccess from 'Pages/SignUp/Success/SignUpSuccess';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { app } from './fBase';

const App: React.FC = () => {
  // let history = useHistory();

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (data) => {
  //     if (data) {
  //       history.push({
  //         pathname: '/',
  //       });
  //     } else {
  //       history.push('/signin');
  //     }
  //   });
  // }, []);

  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signup-success" component={SignUpSuccess} />
          <Route path="/chat/:id" component={ChatPage} />
          {/* <Route path="/chat" exact component={ChatPage} /> */}
          <Route path="/dm/:id" exact component={ChatPage} />
        </Switch>
      </Router>
    </RecoilRoot>
  );
};

export default App;
