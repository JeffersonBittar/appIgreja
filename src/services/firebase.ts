import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-auth';
import '@nativescript/firebase-storage';

export const initializeFirebase = async () => {
  await firebase.initializeApp();
};

export const getCurrentUser = async () => {
  return firebase.auth().currentUser;
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signInWithGoogle = async () => {
  try {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const userCredential = await firebase.auth().signInWithProvider(googleProvider);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    throw error;
  }
};