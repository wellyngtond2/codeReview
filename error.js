import React ,{useEffect, useState}from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ExposureIcon from '@material-ui/icons/Exposure';
import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
import PublishIcon from '@material-ui/icons/Publish';
import BusinessIcon from '@material-ui/icons/Business';
import InboxIcon from '@material-ui/icons/Inbox';
import PersonIcon from '@material-ui/icons/Person';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {useHistory , useLocation } from 'react-router-dom';
import { Switch } from '@material-ui/core';
import {UseAuth} from '../../context/authContext';
import {AnimationContainer} from './styles';
import {userProfile} from '../../service/authService';

const drawerWidth = 240;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      background: 'linear-gradient(83.07deg,#041a58 0%,#3f51b5 100%)',
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
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    title: {
      flexGrow: 1,
      alignSelf: 'center'
    },
    titleDivider:{
      alignSelf: 'center',
      margin: '8px auto 0px auto',
    }
  }),
);

export default  function MenuPrincipal() {
  const classes = useStyles();
  const theme = useTheme();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [barName, setBarName] = React.useState("Dashboard");
  const history = useHistory();
  const location = useLocation();
  const {token, nome, signout } = UseAuth();
  const [anchorEl, setAnchorEl] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSetAppBarName = (name) => {
    let titlebar;
  
    switch(name)
    {
      case "consultanfcompleta": titlebar = "Consultar NF Completa";break;
      case "consultanfsimples": titlebar = "Consultar NF Simples";break;
      case "consultasaldo": titlebar = "Consultar Saldo";break;
      case "processaNF": titlebar = "Processa NF Manual";break;
      case "recinto":titlebar = "Recintos Arduaneiros";break;
      case "urf":titlebar = "Unidade Receita Federal";break;
      case "empresa":titlebar = "Empresas";break;
      case "usuario":titlebar = "Usuários";break;
      case "parametros":titlebar = "Parâmetros";break;
      default :titlebar = "Dashboard";break;
    }
  
    setBarName(titlebar);
    handleDrawerClose();
   };
 
   const handleRoute = (route) => {
     history.push(`/${route}`)
 
     handleSetAppBarName(route);    
  };

  const handleLogOut = ()=>{
    signout();
    handleClose();
  }
  
  useEffect( ()=>{
    handleSetAppBarName(location.pathname.replace("/",""));

    function GetUserProfile(){
      userProfile({ 
        token,
        onSuccess: (data) =>{      
          setIsSuperAdmin(data.data.isSuperAdmin);
        },
       onError: (error) => {
        console.log(error);
       }});
      }
      
  },[]);

 


  if(!token){
   return (<div></div>)
  } 

  return (      
    <AnimationContainer>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton onClick={ open ? handleDrawerClose : handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {barName}
            </Typography>
            <div>
              <Button  color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                {nome}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogOut}>Sair</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
              <ListItem button key={0} >
                <ListItemIcon> <DashboardIcon /> </ListItemIcon>
                <ListItemText primary="Dashboard" onClick={()=> handleRoute("dashboard") } />
              </ListItem>
          </List>
          <h4 className={classes.titleDivider}>Consultas</h4>
          
          <List>
              <ListItem button key={10} >
                <ListItemIcon> <FlashOnIcon /> </ListItemIcon>
                <ListItemText primary="Consulta NF Completa" onClick={()=> handleRoute("consultanfcompleta") } />
              </ListItem>
          </List>
          <List>
              <ListItem button key={11} >
                <ListItemIcon> <OfflineBoltIcon /> </ListItemIcon>
                <ListItemText primary="Consulta NF Simples" onClick={()=> handleRoute("consultanfsimples") } />
              </ListItem>
          </List>
          <List>
              <ListItem button key={12} >
                <ListItemIcon> <ExposureIcon /> </ListItemIcon>
                <ListItemText primary="Consulta Saldo" onClick={()=> handleRoute("consultasaldo") } />
              </ListItem>
          </List>        
          <Divider />
          <h4 className={classes.titleDivider}>Outros</h4>
          <List>
              <ListItem button key={20}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Recintos Arduaneiros" onClick={()=> handleRoute("recinto") }/>
              </ListItem>
              <ListItem button key={21}>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="URF" onClick={()=> handleRoute("urf") }/>
              </ListItem>
          </List>
          <Divider />
          {  isSuperAdmin && <>
          <h4 className={classes.titleDivider}>Cadastros</h4>
          <List>
              <ListItem button key={30}>
                <ListItemIcon><PublishIcon /></ListItemIcon>
                <ListItemText primary="Processa NF Manual"  onClick={()=> handleRoute("processaNF") }/>
              </ListItem>
              <ListItem button key={31}>
                <ListItemIcon><BusinessIcon /></ListItemIcon>
                <ListItemText primary="Cadastro Empresa/Filial"  onClick={()=> handleRoute("empresa") }/>
              </ListItem>
              <ListItem button key={32}>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText primary="Cadastro Usuário"  onClick={()=> handleRoute("usuario") }/>
              </ListItem>
              <ListItem button key={33}>
                <ListItemIcon><PermDataSettingIcon /></ListItemIcon>
                <ListItemText primary="Parâmetros"  onClick={()=> handleRoute("parametros") }/>
              </ListItem>            
          </List> 
          </> }
        </Drawer>
      </div>
      </AnimationContainer>
  );
}
