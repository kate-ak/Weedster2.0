import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './pages/common/components/Navbar';
import Feature from './pages/Feature';


import {
  WrappedSignUp,
  WrappedSignIn,
} from './pages/Viewer';

function App() {
  return (
    <Router>
      <Navbar/>
      <Route path='/signup' component={WrappedSignUp}/>
      <Route path='/signin' component={WrappedSignIn}/>
      <Route path='/feature' component={Feature}/>
      <Route exact path="/">
        <h1>Welcome to the about</h1>
      </Route>
    </Router>
  );
}

export default App;