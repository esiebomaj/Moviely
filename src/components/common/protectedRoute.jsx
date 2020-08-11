import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

class ProtectedRoute extends Component {
  render() {
    const { path, component: Conponent, render, ...rest } = this.props;
    const user = auth.getCurrentUser();
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          if (user) {
            return Component ? <Conponent {...props} /> : render(props);
          } else {
            return (
              <Redirect
                to={{ pathname: "/login", state: props.location.pathname }}
              />
            );
          }
        }}
      />
    );
  }
}

export default ProtectedRoute;
