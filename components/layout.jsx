import React from 'react';
import Footer from './footer';
import Navigation from './navigation';

const Layout = ({ children }) => {
  return (
    <>
      <Navigation />
      <div className="content">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
