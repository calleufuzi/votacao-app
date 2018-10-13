import React, { Fragment} from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './withAuthorization';

const styles = {
  container: {
    alignItems: 'center',
  },
}
const AccountPage = ({ authUser }) => {
  return (
    <Fragment>
      <div style={styles.container}>
        {/* <h1>Account: {authUser.email}</h1> */}
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