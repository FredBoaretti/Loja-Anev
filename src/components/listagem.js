import React, { useState, useEffect } from "react";
import {apagar, listagem} from "../services/database";
import Header from "./header";
import { DataGrid } from '@material-ui/data-grid';
import {IconButton , Container, Typography} from "@material-ui/core";
import Confirmacao from "./confirmacao";
import {Redirect} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
import Send from '@material-ui/icons/Send';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";

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

const Listagem = () => {
  const [nome, setNome] = useState(null);
  
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
  const [editar, setEditar] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [confirmar, setConfirmar] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  const logado = localStorage.getItem('token');

  useEffect(() => {
    if (produtos.length === 0) {
      listagem()
        .then(response => {
          setProdutos(response.data.map(item => {
            return {
              id: item._id,
              ...item
            }
          }))
        })
        .catch(error => {
          alert(error)
        })
    }
  }, [produtos]);

  const columns = [
    {
      field: 'imagem',
      width: 200,
      headerClassName: 'super-app-theme--header',
      headerName: 'Imagem',
      renderCell: (params) => (<img src={params.value} height={100} width={100} alt="" />)
    },
    { field: 'nome', headerName: 'Nome', width: 200, headerClassName: 'super-app-theme--header' },
    { field: 'descricao', headerName: 'Descrição', width: 300, headerClassName: 'super-app-theme--header' },
    { field: 'quantidade', headerName: 'Quantidade', width: 160, headerClassName: 'super-app-theme--header' },
    {
      field: 'preco',
      headerName: 'Preço',
      width: 120,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => {
        return `R$ ${params.value}`
      }
    }
  ];

  const apagarProduto = () => {
    apagar(produtoSelecionado, logado)
      .then(response => {
        alert(response.data)
        setProdutos([]);
        setConfirmar(false)
        setProdutoSelecionado(null)
      })
      .catch(error => {
        alert(error)
      })
  }

  const alertaApagar = (id) => {
    setProdutoSelecionado(id)
    setConfirmar(true)
  }

  const editarProduto = (id) => {
    localStorage.setItem('id', id);
    setEditar(true);
  }

  if (logado) {
    columns.push({
      field: '',
      width: 220,
      headerClassName: 'super-app-theme--header',
      headerName: 'Ações',
      disabledClickEventBubbling: true,
      renderCell: ((params) => {
        return (
          <div className={classes.root}>
            <IconButton 
              color="primary"
              aria-label="edit"
              className={space.root}
              onClick={() => editarProduto(params.id)}
            >
              <EditIcon />
            </IconButton >
            <IconButton
              variant="contained"
              color="secondary"
              aria-label="delete"
              onClick={() => alertaApagar(params.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        )
      })
    })
  }
  else{
    columns.push({
      field: '', headerName: '', width: 200, headerClassName: 'super-app-theme--header'
    })
  }

  if (editar) {
    return <Redirect to="cadastrar" />
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
            {nome ? (
            <ListItem button component={Link} to="cadastrar" style={{textDecoration: 'none'}}>
              <ListItemIcon>
                <Send />
              </ListItemIcon>
              <ListItemText primary="Cadastar"/>
            </ListItem>
            ) : ''}
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
            <>
              <Header />
              <Container>
                <br />
                <Typography className="produto-titulo" variant="h5">
                  Produtos
                </Typography>
                <br />
                <div style={{ height: 600, width: '100%' }}>
                  <DataGrid rows={produtos} columns={columns} pageSize={10} rowHeight={100} className={grid.root}/>
                </div>
              </Container>
              {
                confirmar
                &&
                <Confirmacao
                  open={confirmar}
                  positive="Apagar"
                  negative="Cancelar"
                  onAceept={() => apagarProduto()}
                  onClose={() => setConfirmar(false)}
                  message="Deseja realmente excluír o produto selecionado?"
                />
              }
            </>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default Listagem;