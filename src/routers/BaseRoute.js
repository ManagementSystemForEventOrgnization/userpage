import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import AboutUs from '../pages/AboutUsPage';

import CategoryDetailPage from '../pages/CategoryDetailPage';
import MyEventsPage from '../pages/MyEventsPage';

import UserEventPage from '../pages/UserEventPage';
import PrepareForCreateEvent from '../pages/PrepareForCreateEvent';
import ManageEventPage from '../pages/ManageEventPage';
import CreateHistoryEventPage from '../pages/CreateHistoryEvent';

import Header from 'containers/share/_layout/Header';
import Footer from 'containers/share/_layout/Footer';

class WrapRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const routes = [
      {
        path: `/`,
        exact: true,
        main: (match) => <HomePage match={match} />,
      },
      {
        path: '/about-us',
        exact: true,
        main: () => <AboutUs />,
      },
      {
        path: '/event-list/:id',
        exact: false,
        main: (match) => <CategoryDetailPage match={match} />,
      },
      {
        path: '/profile',
        exact: true,
        main: () => <MyEventsPage />,
      },
      {
        path: '/manage/:id',
        exact: true,
        main: (match) => <ManageEventPage match={match} />,
      },
      {
        path: '/registered-event',
        exact: true,
        main: (match) => <UserEventPage match={match} />,
      },
      {
        path: '/created-event',
        exact: true,
        main: (match) => <CreateHistoryEventPage match={match} />,
      },
      {
        path: '/prepare',
        exact: true,
        main: () => <PrepareForCreateEvent />,
      },
    ];

    return (
      <div>
        <div className="fixed-top">
          <Header />
        </div>

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
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogined: state.user.isLogined,
  };
};

export default connect(mapStateToProps, null)(WrapRouter);
