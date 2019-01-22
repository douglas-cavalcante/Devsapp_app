import firebase from "../firebaseConnection";

export const getContactsList = () => {
  return (dispatch) => {
    firebase.database().ref('users').once('value').then((snapshot) => {
      let users = [];
      snapshot.forEach((childItem) => {
        users.push({
          key: childItem.key,
          name: childItem.val().name,
        });
      });
      dispatch({
        type: 'setContactsList',
        payload: {
          users: users
        }
      });
    });
  }
}