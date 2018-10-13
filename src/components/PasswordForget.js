import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import * as routes from '../constants/routes';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Lock from '@material-ui/icons/Lock';


const PasswordForgetPage = () =>
  <div>
    <PasswordForgetForm />
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    auth.doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      error,
    } = this.state;

    const isInvalid = email === '';

    const styles = {
      card: {
        minWidth: 320,
        display: 'flex',
        marginTop: 64,
        alignItems: 'center',
        flexDirection: 'column',
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width:'100%', 
        marginTop: 14
      },
      avatar: {
        margin: 10,
        width:60,
        height:60,
        backgroundColor: 'teal'
      },
      row:{
        display: 'flex',
        justifyContent: 'center',
      },
      form:{
        width: '100%',
        marginTop: 8
      }
    };

    return (
      <div style={styles.container}>
        <Card style={styles.card}>
          <CardContent>
          <div style={styles.row}>
              <Avatar style={styles.avatar} >
                <Lock fontSize="large" />
              </Avatar>            
            </div>
            <Typography color="textPrimary" variant="h5" align="center">Redefinir Senha</Typography>            
            <form style={styles.form} onSubmit={this.onSubmit}>
              <TextField
                label="Endereço de Email"
                style={styles.textField}
                value={this.state.email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                margin="normal"
                variant="outlined"
                type="text"
                name="email"
                autoComplete="email"
                fullWidth
              />     
              <div style={styles.row}>
                <Link to={routes.LANDING}> <Button  type="submit" color="secondary" size="large">Cancelar</Button></Link>
                <Button fullWidth disabled={isInvalid} type="submit" color="primary" size="large">Resetar Minha Senha</Button>      
              </div> 
              { error && <p>{error.message}</p> }
            </form>
          </CardContent>
        </Card>
      </div>

    );
  }
}

const PasswordForgetLink = () =>
  <Typography align="center" variant="subtitle1">
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </Typography>

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};