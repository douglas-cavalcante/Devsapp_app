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

    firebase.database().ref('users').child(userSender).child('chats').child(chatId).set({
      id:chatId,
    });


    firebase.database().ref('users').child(userRecipient).child('chats').child(chatId).set({
      id:chatId,
    });

    dispatch({
      type:'setActiveChat',
      payload:{
        chatId: chatId
      }
    });

  }
}