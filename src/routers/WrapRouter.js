import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { userActions } from '../action/user.action';

import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import CategoryDetailPage from '../pages/CategoryDetailPage';
import EventDetailPage from '../pages/EventDetailPage';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ProfilePage from '../pages/ProfilePage';
import UserEventPage from '../pages/UserEventPage';
import CreateEventPage from '../pages/CreateEventPage';
import MyEventsPage from '../pages/MyEventsPage';

import PreviewEvent from '../containers/event/PreviewEvent';

const ROUTES = [
  {
    path: '/',
    exact: true,
    main: () => <HomePage />,
  },
  {
    path: '/event-list',
    exact: false,
    main: () => <CategoryDetailPage />,
  },
  {
    path: '/event/:id',
    exact: true,
    main: ({ match, history }) => (
      <EventDetailPage match={match} history={history} />
    ),
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
    path: '/create/preview',
    exact: true,
    main: () => <PreviewEvent />,
  },
  {
    path: '/create',
    exact: true,
    main: () => <CreateEventPage />,
  },
  {
    path: '/my-events',
    exact: true,
    main: () => <MyEventsPage />,
  },
  {
    path: '',
    exact: true,
    main: () => <NotFoundPage />,
  },
];

class WrapRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: ROUTES,
    };
  }

  componentDidMount = () => {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  };

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { isLogined } = nextProps;
    const routes = [
      {
        path: '/',
        exact: true,
        main: () => <HomePage />,
      },
      {
        path: '/event-list',
        exact: false,
        main: () => <CategoryDetailPage />,
      },
      {
        path: '/event/:id',
        exact: true,
        main: ({ match, history }) => (
          <EventDetailPage match={match} history={history} />
        ),
      },
      {
        path: '/login',
        exact: true,
        main: () => (!isLogined ? <LoginPage /> : <Redirect to="/" />),
      },
      {
        path: '/signup',
        exact: true,
        main: () => (!isLogined ? <SignUpPage /> : <Redirect to="/" />),
      },
      {
        path: '/profile',
        exact: true,
        main: () => (isLogined ? <ProfilePage /> : <Redirect to="/login" />),
      },
      {
        path: '/my-events',
        exact: true,
        main: () => (isLogined ? <MyEventsPage /> : <Redirect to="/login" />),
      },
      {
        path: '/registered-event',
        exact: true,
        main: () => (isLogined ? <UserEventPage /> : <Redirect to="/login" />),
      },
      {
        path: '/participated-event',
        exact: true,
        main: () => (isLogined ? <UserEventPage /> : <Redirect to="/login" />),
      },
      {
        path: '/created-event',
        exact: true,
        main: () => (isLogined ? <UserEventPage /> : <Redirect to="/home" />),
      },
      {
        path: '/create',
        exact: true,
        main: (match) => <CreateEventPage match={match} />,
      },
      {
        path: '/create/preview',
        exact: true,
        main: () => <PreviewEvent />,
      },
      {
        path: '',
        exact: true,
        main: () => <NotFoundPage />,
      },
    ];

    this.setState({
      routes,
    });
  };

  render() {
    const { routes } = this.state;
    return (
      <Router>
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

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(userActions.getCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WrapRouter);
