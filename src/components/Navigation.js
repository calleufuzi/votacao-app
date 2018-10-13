import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Person from '@material-ui/icons/Person';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import BarChartIcon from '@material-ui/icons/BarChart';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    margin: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  list: {
    width: 250,
  },
};

const Navigation = ({ authUser }) =>
  <div>
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>
  
class NavigationAuth extends Component {
  state = {
    anchorEl: null,
    open: false,
    anchor: 'left',
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render () {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const sideList = (
      <div style={styles.list}>
        <List component="nav">
          <Link to={routes.LANDING}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText inset primary="Landing" />
            </ListItem>  
          </Link>   
          <Link to={routes.HOME}>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText inset primary="Home" />
            </ListItem>  
          </Link>
          <Link to={routes.ACCOUNT}>
            <ListItem button>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText inset primary="Acount" />
            </ListItem>  
          </Link>
          <SignOutButton />
        </List>
      </div>
    );
    return (     
      <div style={styles.root}>
      <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer('left', false)}
          onKeyDown={this.toggleDrawer('left', false)}
        >
          {sideList}
        </div>
      </Drawer>       
        <AppBar>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)} style={styles.menuButton} aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" style={styles.grow}>
              Owl Poll
            </Typography>
            <div>
            <IconButton 
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}><Link to={routes.ACCOUNT}>Account</Link></MenuItem>
            </Menu>
          </div>
          </Toolbar>
        </AppBar>  
      </div>
    )
  }
}  

const NavigationNonAuth = () =>
  <div style={styles.root}>
      <Toolbar>
        <IconButton style={styles.menuButton} aria-label="Menu">
          <Link to={routes.LANDING}><HomeIcon color="primary" /></Link>
        </IconButton>
        <Typography variant="h6" color="inherit" style={styles.grow}>
          Página Inicial
        </Typography>
        <Link to={routes.SIGN_IN}>
          <Button variant="contained" color="primary" style={styles.button}>
               Sign In
            <Person style={styles.rightIcon} />
          </Button>
        </Link>
      </Toolbar>
  </div>
    

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);