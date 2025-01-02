import React from 'react';
import { Container, Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Page404 = () => {

  const navigate = useNavigate();

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      textAlign: 'center',
    }}>
      <section className='first-section'>
        <Box sx={{
          mx: "auto",
        }}>
          <Box>
            <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 'bold' }}>
              404
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Oops! The page you're looking for doesn't exist.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/')}
            >
              Go to Home
            </Button>
          </Box>

        </Box>
      </section>
    </Container>
  );
};

export default Page404;
