/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { Timestamp, getFirestore } from 'firebase-admin/firestore';
import { FirebaseApp } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// eslint-disable-next-line prefer-const
let serviceAccount = require('../../serviceAccountKey.json');

@Injectable()
export class FirebaseService {
  private readonly serviceApp: App;
  private readonly firebase: FirebaseApp;
  public readonly auth;
  constructor() {
    if (!admin?.apps?.length) {
      this.serviceApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://-default-.firebaseio.com',
      });
    } else {
      this.serviceApp = admin.apps[0];
    }
    //TO-DO
    // delete later
    this.firebase = firebase.initializeApp({
      apiKey: 'AIzaSyC0c7AuYqHsZWMjP1hsCtQg50UT_756JVE',
      authDomain: 'twiter-like.firebaseapp.com',
      projectId: 'twiter-like',
      storageBucket: 'twiter-like.appspot.com',
      messagingSenderId: '16937741345',
      appId: '1:16937741345:web:c3a70e21058c3fdcdf4760',
    });
  }
  getApp() {
    return this.serviceApp;
  }
  getAuth(): Auth {
    return getAuth(this.serviceApp);
  }
  getFirestore() {
    return getFirestore();
  }
  async createUserWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    let auth: any;
    return await createUserWithEmailAndPassword(auth, email, password);
  }
  async signInWithEmailAndPassword({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return (await firebase.auth().signInWithEmailAndPassword(email, password))
      .user;
  }
  getTimestamp() {
    const { Timestamp } = firebase.firestore;
    return Timestamp;
  }
}
