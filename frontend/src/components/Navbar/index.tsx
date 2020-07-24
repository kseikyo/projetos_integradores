import React from 'react';
import { Link } from 'react-router-dom';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import './styles.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      backgroundColor: "#F2C94C",
      color: "#111",
    },
  }),
);

const Navbar: React.FC = () => {
  const classes = useStyles();
  return (
    <header>
      <nav>
        <Link to="/disciplines">
          Minhas disciplinas
        </Link>
        <Link to="/students" className="align-center">
          Alunos
        </Link>
        <Link to="/scores">
          Ver notas
        </Link>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;