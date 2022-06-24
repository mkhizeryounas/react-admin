import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Tables from './pages/Tables';
import Billing from './pages/Billing';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Main from './components/layout/Main';
import 'antd/dist/antd.css';
import './assets/styles/main.css';
import './assets/styles/responsive.css';
import { useAuth0 } from '@auth0/auth0-react';
import Loader from './components/Loader';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className='App'>
      <Switch>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Route path='/sign-in' exact component={SignIn} />
            {isAuthenticated ? (
              <Main>
                <Route exact path='/dashboard' component={Home} />
                <Route exact path='/tables' component={Tables} />
                <Route exact path='/billing' component={Billing} />
                <Route exact path='/profile' component={Profile} />
                <Redirect from='*' to='/dashboard' />
              </Main>
            ) : (
              <>
                <Redirect from='*' to='/sign-in' />
              </>
            )}
          </>
        )}
      </Switch>
    </div>
  );
}

export default App;
