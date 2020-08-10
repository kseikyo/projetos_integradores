import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

import './styles.css';
import Navbar from '../Navbar';

const Content: React.FC = ({ children }) => {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container">
        <Navbar />
        <Box
          marginTop="3.125rem"
          height="78vh"
          width="85vw"
          justifySelf="center"
          boxShadow={18}
          justifyContent="center"
          alignItems="center" 
          display="flex"
          borderRadius="1.125rem"
        >
            {children}
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default Content;