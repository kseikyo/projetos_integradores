import React, { FormEvent, useState, ChangeEvent } from 'react';
import './styles.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Svg from '../../assets/undraw_Login_v483.svg'
import { CardHeader, TextField, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: "#F2C94C",
      color: "#111",
      margin: theme.spacing(3, 5, 2),
      padding: theme.spacing(1.5)
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    MuiCard: {
      padding: "2rem 0 1rem 0",
      margin: "0 -2rem 0 -2rem"
    },
    input: {
      width: "80%",
      alignSelf: "center",
    }
  }),
);

const Logon = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({...formData, [name]: value })
  }

  const handleLoginSubmit = (event: FormEvent) => {
    event.preventDefault();
    
    const { email, password } = formData;

    /**
     * TODO
     * Send data to API and send user to /disciplines
     */
  }

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="container_logon">
        <aside className="aside_logon">
          <img src={Svg} alt="Login" />
        </aside>
        <Container component="main" maxWidth="xs" style={{
          alignSelf: "center",
          marginTop: "min(300px, 6rem)"
        }}>
          <Card className={classes.MuiCard}>
            <CardHeader title="Login" className="align-center" />
            <CardContent>
              <form onSubmit={handleLoginSubmit} className={classes.form}>
                <TextField
                  className={classes.input}
                  variant="filled"
                  margin="normal"
                  required
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleInputChange}
                />
                <TextField
                  className={classes.input}
                  variant="filled"
                  margin="normal"
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<ExitToAppIcon />}
                >
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Logon;