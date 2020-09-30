import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './utils/PrivateRoute';
import NoMatch from './components/NoMatch';
import UserProfile from './components/UserProfile';
import AddProduct from './components/AddProduct';
import AddCategory from './components/AddCategory';
import Welcome from './components/Welcome';


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Welcome} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <PrivateRoute path='/addproduct' component={AddProduct} />
          <PrivateRoute path='/profile' component={UserProfile} />
          <PrivateRoute path='/addcategory' component={AddCategory} />

          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
