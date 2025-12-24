'use client';
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBnke9AdxstP8J7dB9p2VpviNdX8BRMHq4",
  authDomain: "cropguardian-b9d1f.firebaseapp.com",
  databaseURL: "https://cropguardian-b9d1f-default-rtdb.firebaseio.com",
  projectId: "cropguardian-b9d1f",
  storageBucket: "cropguardian-b9d1f.appspot.com",
  messagingSenderId: "1088737397945",
  appId: "1:1088737397945:web:1ff18283f3e1739c93a527"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
