import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  });

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const doCreatePoll = (data) => 
  db.ref().update(data);  

  export const onceGetPolls = () =>
  db.ref('polls').once('value');  