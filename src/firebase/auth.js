import { auth } from './firebase';

// Cadastro
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Login
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Deslogar
export const doSignOut = () =>
  auth.signOut();

// Redefinição de Senha
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Troca de Senha
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);