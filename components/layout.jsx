import React from 'react';
import Footer from './footer';
import HTMLHead from './htmlhead';
import Navigation from './navigation';

const Layout = ({ children }) => {
  return (
    <>
      <HTMLHead />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
