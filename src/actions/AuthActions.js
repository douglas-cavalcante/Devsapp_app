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

export const signUp = (name, email, password) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        let uid = firebase.auth().currentUser.uid;
        firebase.database().ref('users').child(uid).set({
          name: name,
        });
        dispatch({
          type: 'changeUid',
          payload: {
            uid: uid,
          }
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert("Email já em uso");
            break;
          case 'auth/invalid-email':
            alert("Email inválido");
            break;
          case 'auth/operation-not-allowed':
            alert("Email já em uso");
            break;
          case 'auth/weak-password':
            alert("Digite uma senha melhor");
            break;
          default:
            break;
        }
      });
  }
}

export const signIn = (email, password) => {
  alert(email + password)
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        let uid = firebase.auth().currentUser.uid;
        dispatch({
          type: 'changeUid',
          payload: {
            uid: uid,
          }
        });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
            alert('Email inválido');
            break;
          case 'auth/user-disabled':
            alert('Usuário desativado');
            break;
          case 'auth/user-not-found':
            alert('Usuário não existe');
            break;
          case 'wrong/password':
            alert('Email e/ou senha errados!!!');
            break;
          default:
            break;
        }
      });
  }
};

export const changeEmail = (email) => {
  return {
    type: 'changeEmail',
    payload: {
      email: email,
    }
  }
}

export const changePassword = (password) => {
  return {
    type: 'changePassword',
    payload: {
      password: password,
    }
  }
}

export const changeName = (name) => {
  return {
    type: 'changeName',
    payload: {
      name: name,
    }
  }
}