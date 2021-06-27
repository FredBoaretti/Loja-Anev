import React, {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Container, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const Header = () => {
  const classes = useStyles();

  const [nome, setNome] = useState(null);
  
  useEffect(() => {
    const nomeUsuario = localStorage.getItem('nome');
    if (nomeUsuario) {
      setNome(nomeUsuario)
    } else {
      setNome(null)
    }
  }, [])

  return (
    <Container className="header">
      <div className={classes.root}>
        <Typography variant="h4">
          {nome ? `Bem vindo, ${nome}` : 'É um prazer ter você em nossa loja!'}
        </Typography>
        </div>
    </Container>
  )
}

export default Header;