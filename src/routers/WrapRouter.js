import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import CategoryDetailPage from '../pages/CategoryDetailPage';
import EventDetailPage from '../pages/EventDetailPage';

import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

import CreateEventPage from '../pages/CreateEventPage';
import PreviewEvent from '../containers/event/PreviewEvent';
import history from '../utils/history';

import BaseRoute from './BaseRoute';

class WrapRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const routes = [
      {
        path: '/event-list/:id',
        exact: false,
        main: (match) => <CategoryDetailPage match={match} />,
      },
      {
        path: '/event/:id',
        exact: true,
        main: (match) => <EventDetailPage match={match} />,
      },
      {
        path: '/event/:id/:name',
        exact: true,
        main: (match) => <EventDetailPage match={match} />,
      },
      {
        path: '/login',
        exact: true,
        main: () => <LoginPage />,
      },
      {
        path: '/signup',
        exact: true,
        main: () => <SignUpPage />,
      },

      {
        path: '/create',
        exact: true,
        main: (match) => <CreateEventPage match={match} />,
      },
      {
        path: '/preview/:id',
        exact: true,
        main: (match) => <PreviewEvent match={match} />,
      },

      {
        path: '/forgotpassword',
        exact: true,
        main: () => <ForgotPasswordPage />,
      },

      {
        path: '',
        exact: true,
        main: () => <BaseRoute />,
      },
    ];

    return (
      <Router history={history}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogined: state.user.isLogined,
  };
};

export default connect(mapStateToProps, null)(WrapRouter);
