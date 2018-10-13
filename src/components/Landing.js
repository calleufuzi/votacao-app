import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import * as routes from '../constants/routes';


import logo from './owl.png'

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
  }
});

const LandingPage = (props) => {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <div>
        <img alt="Coruja Verde" src={logo} width="500"/>
      </div>
      <Typography variant="h1">Own Poll</Typography>
      <Typography variant="h5">Crie enquetes para auxiliar nas suas pesquisas</Typography>
    
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item className={classes.button}>
          <Link to={routes.SIGN_UP}>
            <Button  variant="outlined" color="primary" >
                Criar conta
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}
export default withStyles(styles)(LandingPage);