import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { CircularProgress } from '@mui/material';

const Layout: React.FC = ({ children }) => {
  const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => {
		setIsLoading(true);	
	}, []);


  useEffect(() => {
    const updateLoadingStatus = () => setIsLoading(true);

    Router.events.on('routeChangeStart', updateLoadingStatus);
    Router.events.on('routeChangeComplete', updateLoadingStatus);

    return () => {
      Router.events.off('routeChangeStart', updateLoadingStatus);
      Router.events.off('routeChangeComplete', updateLoadingStatus);
    };
  }, [ isLoading ]);

  return (
    <>
		  {children}
    </>
  );
};

export default Layout;
