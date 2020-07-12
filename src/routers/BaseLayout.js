import React from 'react';
import Header from 'containers/share/_layout/Header';
import Footer from 'containers/share/_layout/Footer';

export default ({ children }) => (
  <>
    <div className="fixed-top">
      <Header />
    </div>
    {children}
    <Footer />
  </>
);
