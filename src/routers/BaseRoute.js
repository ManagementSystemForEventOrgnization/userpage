import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import { routeConstant } from 'constants/index';
import NoLayout from './NoLayout';
import BaseLayout from './BaseLayout';
import WrapRoute from './WrapRouter';
// import Homepage from 'pages/HomePage';

class BaseRoute extends React.Component {
  render() {
    return (
      <Switch>
        {routeConstant.routes.map((route) => (
          <WrapRoute
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.main}
            layout={BaseLayout}
          />
        ))}
        {routeConstant.route1.map((route) => (
          <WrapRoute
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.main}
            layout={NoLayout}
          />
        ))}
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogined: state.user.isLogined,
  };
};

export default connect(mapStateToProps, null)(BaseRoute);
