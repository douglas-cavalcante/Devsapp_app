import firebase from "../firebaseConnection";

export const checkLogin = () => {
  return (dipatch) => {
  	let user = firebase.auth().currentUser;
    if (user) {
      dipatch({
        type: 'changeStatus',
        payload: {
          status: 1
        }
      });
    } else {
      dipatch({
        type: 'changeStatus',
        payload: {
          status: 2
        }
      });
    }
  }
}