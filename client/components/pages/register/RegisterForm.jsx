import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import useRegisterUser from '../../../api/users/useRegisterUser';
import SuccessSnackbar from '../../common/successSnackbar';

export default function RegisterForm() {
  const router = useRouter();

  const [isError, setIsError] = React.useState(false);
  const [msgError, setMsgError] = React.useState(null);
  const [showSnackbar, setShowSnackbar] = React.useState(false);

  const onSuccess = (successData) => {
    // console.log(successData.data);
    setShowSnackbar(true);
    router.push('/login');
  };

  const onError = (error) => {
    console.log('test');
    setIsError(true);
    setMsgError(error.response.data);
  };

  const { mutate: newUser } = useRegisterUser(onSuccess, onError);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerPayload = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password')
    };
    newUser({ ...registerPayload, user_authority: 'developer' });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                // error={isError}
                focused
                required
                fullWidth
                id='name'
                label='Name'
                name='name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={isError}
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                // error={isError}
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/login'>
                <Typography
                  variant='subtitle2'
                  sx={{
                    '&:hover': {
                      cursor: 'pointer',
                      color: '#CE93D8'
                    }
                  }}
                >
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
        {isError && msgError && (
          <Alert severity='error' sx={{ marginTop: 3 }} variant='filled'>
            {msgError}
          </Alert>
        )}
        {console.log(showSnackbar)}
        <SuccessSnackbar
          successMessage='Account Created!'
          showSnackbar={showSnackbar}
        />
      </Box>
    </Container>
  );
}
