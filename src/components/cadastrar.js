import React, { useState, useEffect } from "react";
import {adicionar, detalhes, editar} from "../services/database";
import {IconButton, Button, Container, TextField, Typography} from "@material-ui/core";
import {Link, Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import LinkC from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <LinkC color="inherit" href="https://material-ui.com/">
        Your Website
      </LinkC>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

const useSpace = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const gridStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(169, 169, 169, 0.55)',
    },
  },
});

const useMargin = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Cadastrar = () => {
  useEffect(() => {
    const nomeUsuario = localStorage.getItem('nome');
    if (nomeUsuario) {
      setNome(nomeUsuario)
    } else {
      setNome(null)
    }
  }, [])

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const space = useSpace();
  const grid = gridStyles();
  const margin = useMargin();
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  const [imagem, setImagem] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [cadastrado, setCadastrado] = useState(false);

  const token = localStorage.getItem('token');

  const produto = localStorage.getItem('id')

  useEffect(() => {
    if (produto) {
      detalhes(produto, token)
        .then(response => {
          setNome(response.data.nome)
          setPreco(parseFloat(response.data.preco))
          setImagem(response.data.imagem)
          setDescricao(response.data.descricao)
          setQuantidade(parseInt(response.data.quantidade))
        })
        .catch(error => alert(error))
    }

    return () => {
      localStorage.removeItem('id');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (produto) {
      editar({
        _id: produto,
        nome,
        preco,
        imagem,
        descricao,
        quantidade,
      }, token).then(response => {
        alert(response.data);
        localStorage.removeItem('id');
        setCadastrado(true);
      }).catch(error => {
        alert(error);
      })
    } else {
      adicionar({
        nome,
        preco,
        imagem,
        descricao,
        quantidade,
        ativo: true,
      }, token).then(response => {
        alert(response.data);
        setCadastrado(true);
      }).catch(error => {
        alert(error);
      })
    }
  }

  if (!token || cadastrado) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
          <List>
            <ListItem button component={Link} to={nome ? 'sair' : 'login'} style={{textDecoration: 'none'}}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary={nome ? 'Sair' : 'Logar'} />
            </ListItem>
          </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Container>
            <Typography variant="h4">
              Cadastrar produto
            </Typography>
            <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
              <br />
              <TextField
                required
                value={nome}
                label="Nome"
                onChange={(e) => setNome(e.target.value)}
              />
              <br />
              <TextField
                required
                value={preco}
                label="Preço"
                type="number"
                onChange={(e) => setPreco(e.target.value)}
              />
              <br />
              <TextField
                required
                value={imagem}
                label="URL da Imagem"
                onChange={(e) => setImagem(e.target.value)}
              />
              <br />
              <TextField
                required
                value={descricao}
                label="Descrição"
                onChange={(e) => setDescricao(e.target.value)}
              />
              <br />
              <TextField
                required
                value={quantidade}
                label="Quantidade"
                type="number"
                onChange={(e) => setQuantidade(e.target.value)}
              />
              <br />
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                {produto ? 'Salvar' : 'Cadastrar'}
              </Button>
              <br />
              <Link to="/" style={{textDecoration: 'none'}}>
                <Button
                  type="submit"
                  color="primary"
                  variant="outlined"
                >
                  Cancelar
                </Button>
              </Link>
            </form>
          </Container>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Cadastrar;