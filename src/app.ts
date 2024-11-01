import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { initializeFirebase } from './services/firebase';
import { LoginScreen } from './components/LoginScreen';

// Initialize Firebase
initializeFirebase().catch(console.error);

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

ReactNativeScript.start(React.createElement(LoginScreen, {}, null));