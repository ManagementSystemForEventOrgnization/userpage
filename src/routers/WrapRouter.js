import React from 'react';
import { Route } from 'react-router-dom';

const WrapRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    component={(match) => (
      <Layout>
        <Component match={match} />
      </Layout>
    )}
  />
);

export default WrapRoute;
