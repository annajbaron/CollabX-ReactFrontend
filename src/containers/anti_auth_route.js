import React from 'react';
import {Route, Redirect} from 'react-router-dom';

function AntiAuthRoute (props) {
  const {
    component: Component,
    isAuthenticated = false,
    history = {},
    ...restProps
  } = props;
  return (
    <Route {...restProps}
      render={
        props => {
          if (isAuthenticated) {
            return <Component {...props} history={props.history}/>
          } else {
            return <Redirect to={{pathname: "/"}} />
          }
        }
      }
    />
  )
}

export default AntiAuthRoute;
