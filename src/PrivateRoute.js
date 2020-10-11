import React from 'react';
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({
    isAuth,
    component: Component,
    ...rest
}) => {
    localStorage.setItem("lastPath", rest.location.pathname);
    return ( 
        <Route 
            {...rest}
            component={(props) => (
                (isAuth) 
                ? (<Component {...props}/>)
                : (<Redirect to="/"/>)
            )}
        />
     );
}
 
export default PrivateRoute;