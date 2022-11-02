// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'; // doing import firebase from 'firebase' or import * as firebase from firebase is not good practice.
import 'firebase/auth';
import 'firebase/database'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth } from "firebase/auth";

import Axios from 'axios'
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // The value of `databaseURL` depends on the location of the database
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db =  getFirestore(app);

const functions = getFunctions(getApp());
connectFunctionsEmulator(functions, "localhost", 3000);
const auth = getAuth();

export { Axios, db , app, auth};