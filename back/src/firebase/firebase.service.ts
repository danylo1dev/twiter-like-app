/* eslint-disable @typescript-eslint/no-var-requires */
import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FirebaseApp, FirebaseOptions } from 'firebase/app';
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

    this.firebase = firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
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
  async verifyToken(idToken) {
    try {
      await admin.auth().verifyIdToken(idToken);
      return true;
    } catch (error) {
      return false;
    }
  }
}
