require('dotenv').config({path: '.env'})
const initializeApp = require('firebase/app').initializeApp
const getStorage = require('firebase/storage').getStorage

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STG_BUCKET,
  messagingSenderId: process.env.MSG_SEND_ID,
  appId: process.env.APP_ID
};


exports.app = initializeApp(firebaseConfig);
exports.storage = getStorage(initializeApp(firebaseConfig))