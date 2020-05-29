import React from 'react';
import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import AboutUs from '../pages/AboutUs';

import CategoryDetailPage from '../pages/CategoryDetailPage';
import EventDetailPage from '../pages/EventDetailPage';

import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';
import MyEventsPage from '../pages/MyEventsPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';

import UserEventPage from '../pages/UserEventPage';
import CreateEventPage from '../pages/CreateEventPage';
import PreviewEvent from '../containers/event/PreviewEvent';
import PrepareForCreateEvent from '../pages/PrepareForCreateEvent';
import ConfirmPage from '../pages/ConfirmPage';

import history from '../utils/history';

class WrapRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const routes = [
      {
        path: '/',
        exact: true,
        main: () => <HomePage />,
      },
      {
        path: '/about-us',
        exact: true,
        main: () => <AboutUs />,
      },
      {
        path: '/event-list/:id',
        exact: false,
        main: () => <CategoryDetailPage />,
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
        path: '/profile',
        exact: true,
        main: () => <ProfilePage />,
      },
      {
        path: '/my-events',
        exact: true,
        main: () => <MyEventsPage />,
      },
      {
        path: '/registered-event',
        exact: true,
        main: () => <UserEventPage />,
      },
      {
        path: '/participated-event',
        exact: true,
        main: () => <UserEventPage />,
      },
      {
        path: '/created-event',
        exact: true,
        main: () => <UserEventPage />,
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
        path: '/prepare',
        exact: true,
        main: () => <PrepareForCreateEvent />,
      },
      {
        path: '/forgotpassword',
        exact: true,
        main: () => <ForgotPasswordPage />,
      },
      {
        path: '/confirm',
        exact: true,
        main: (match) => <ConfirmPage match={match} />,
      },
      {
        path: '',
        exact: true,
        main: () => <NotFoundPage />,
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
