import firebase from "../firebaseConnection";

export const getContactsList = (userUid) => {
  return (dispatch) => {
    firebase.database().ref('users').orderByChild('name').once('value').then((snapshot) => {
      let users = [];
      snapshot.forEach((childItem) => {
        if (childItem.key != userUid) {
          users.push({
            key: childItem.key,
            name: childItem.val().name,
          });
        }
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


export const getChatsList = (userUid) => {
  return (dispatch) => {
    firebase.database().ref('users').child(userUid).child('chats').on('value', (snapshot) => {
      let chats = [];

      snapshot.forEach((childItem) => {
        chats.push({
          key: childItem.key,
          title: childItem.val().title,
        });
      });
      dispatch({
        type: 'setChatsList',
        payload: {
          chats: chats,
        },
      });
    });
  };
};


export const createChat = (userSender, userRecipient) => {
  return (dispatch) => {
    //Criando o chat
    const newChat = firebase.database().ref('chats').push();
    newChat.child('members').child(userSender).set({
      id: userSender,
    });
    newChat.child('members').child(userRecipient).set({
      id: userRecipient,
    });
    //Associando aos envolvidos
    let chatId = newChat.key;

    //criando referencia e recuperando o nome do user
    firebase.database().ref('users').child(userRecipient).once('value').then((snapshot) => {
      firebase.database().ref('users').child(userSender).child('chats').child(chatId).set({
        id: chatId,
        title: snapshot.val().name,
      });
    });

    firebase.database().ref('users').child(userSender).once('value').then((snapshot) => {
      firebase.database().ref('users').child(userRecipient).child('chats').child(chatId).set({
        id: chatId,
        title: snapshot.val().name,
      });
    });

    dispatch({
      type: 'setActiveChat',
      payload: {
        chatId: chatId
      }
    });
  }
}

export const setActiveChat = (chatId) => {
  return {
    type: 'setActiveChat',
    payload: {
      chatId: chatId
    }
  }
}