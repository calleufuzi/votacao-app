import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as routes from '../constants/routes';
import logo from '../assets/owl.png'

class LandingPage extends Component{
  render(){
    const { classes, authUser } = this.props;   
    return (
      <div className={classes.container}>
        <Grid container direction="column" alignItems="center" alignContent="center" spacing={8}>   
          <Grid item xs className={classes.owlContainer}>
            <img  className={classes.owl} alt="Coruja Verde" src={logo} width="80%"/>
          </Grid>
          <Grid item xs >
            <Typography className={classes.title} align="center" variant="h1">Own Poll</Typography>
          </Grid>
          <Grid item xs >
            <Typography className={classes.text} align="center" variant="h5">Crie enquetes para auxiliar nas suas pesquisas</Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item className={classes.button}>
            {!authUser && <Link to={routes.SIGN_UP}>
              <Button  variant="outlined" color="primary" >
                  Criar conta
              </Button>
            </Link>}
          </Grid>
        </Grid>
      </div>
    )
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    width:'100%', 
    marginTop: 120,
    flexDirection: 'column'
  },
  button:{
    padding: theme.spacing.unit * 2,
  },
  owl: {
    margin: 'auto',
    display: 'flex'
  },
  owlContainer: {
    padding: theme.spacing.unit * 2,
  },
  text: {
    padding: theme.spacing.unit,
  },
  title: {
    padding: theme.spacing.unit,
  },
  '@media (max-width: 767px)': {
    text: {
      fontSize: 16
    },
    title: {
      fontSize: 36
    }
  }
});

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(LandingPage);