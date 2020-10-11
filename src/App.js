import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import { useStateValue } from './StateProvider';
function App() {
    const[{token}, dispatch]= useStateValue()
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PrivateRoute exact path={"/home"} component={Home} isAuth={token}/>
            </Switch>
        </Router>
    )
}

export default App
