import React, { Fragment} from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';
import Typography from '@material-ui/core/Typography'

const styles = {
  container: {
    alignItems: 'center',
  },
}
const AccountPage = ({ authUser }) => {
  return (
    <Fragment>
      <div style={styles.container}>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    </Fragment>
  )
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);