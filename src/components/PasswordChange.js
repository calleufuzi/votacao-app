import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Lock from '@material-ui/icons/Lock';

import { auth } from '../firebase';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
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
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';
    
    const styles = {
      card: {
        minWidth: 320,
        display: 'flex',
        marginTop: 64,
        alignItems: 'center',
        flexDirection: 'column',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
            <Typography color="textPrimary" variant="h5" align="center">Trocar a Senha</Typography>            
            <form style={styles.form} onSubmit={this.onSubmit}>
              <TextField
                  label="Nova Senha"
                  value={passwordOne}
                  onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                  margin="normal"
                  variant="outlined"
                  type="password"
                  name="Senha 1"
                  fullWidth
                />  
              <TextField
                  label="Confirme a Nova Senha"
                  value={passwordTwo}
                  onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                  margin="normal"
                  variant="outlined"
                  type="password"
                  name="Senha 2"
                  fullWidth
                />                
                <div style={styles.row}>
                  <Button fullWidth disabled={isInvalid} type="submit" color="primary" size="large">Mudar a Senha</Button>      
                </div> 
                { error && <p>{error.message}</p> }
            </form>
          </CardContent>
        </Card>
      </div>      
    );
  }
}

export default PasswordChangeForm;