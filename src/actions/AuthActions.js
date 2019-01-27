import firebase from "../firebaseConnection";

/*
@checkLogin
Verificar se existe um usuário logado.Caso exista, atualiza o uid e consequentemente o usuário é redirecionado pra parte de conversas.
*/
export const checkLogin = () => {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("recebi o usuário" + user)
      if (user) {
        dispatch({
          type: 'changeUid',
          payload: {
            uid: user.uid,
          }
        });
      } else {
        dispatch({
          type: 'changeStatus',
          payload: {
            status: 2
          }
        });
      }
    });
  }
}

/*
@signUp
Cria um novo usuário e seta o status para 1
*/
export const signUp = (name, email, password, callback) => {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((_user) => {
        let uid = firebase.auth().currentUser.uid;
        callback();
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
            alert("Tente novamente mais tarde");
            break;
          case 'auth/weak-password':
            alert("Digite uma senha melhor");
            break;
          default:
            alert("No momento não é possível realizar essa operação");
            break;
        }
        callback();
      });
  }
}


export const signOut = () => {
  firebase.auth().signOut();
  return {
    type: 'resetState',
    payload: {
      status: 2,
    }
  }
}


export const signIn = (email, password, callback) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((_user) => {
        let uid = firebase.auth().currentUser.uid;
        callback();
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
          case 'auth/wrong-password':
            alert('Email e/ou senha errados!!!');
            break;
          default:
            alert(error.code)
            break;
        }
        callback();
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