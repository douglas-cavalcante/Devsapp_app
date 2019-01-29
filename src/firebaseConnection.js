import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyByM0AWOjMADbSpALAK_WRWV2pHrDSVuYU',
  authDomain: 'devsapp-be58c.firebaseapp.com',
  databaseURL: 'https://devsapp-be58c.firebaseio.com',
  projectId: 'devsapp-be58c',
  storageBucket: 'devsapp-be58c.appspot.com',
  messagingSenderId: '82192703487'
};

firebase.initializeApp(config);
export default firebase;