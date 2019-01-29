import firebase from "../firebaseConnection";

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
        other: userRecipient,
      });
    }).then(() => {
      firebase.database().ref('users').child(userSender).once('value').then((snapshot) => {
        firebase.database().ref('users').child(userRecipient).child('chats').child(chatId).set({
          id: chatId,
          title: snapshot.val().name,
          other: userSender
        })
          .then(() => {
            dispatch({
              type: 'setActiveChat',
              payload: {
                chatId: chatId
              }
            });
          });
      });
    });
  }
}

export const getContactsList = (userUid, callback) => {
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
      callback();
      dispatch({
        type: 'setContactsList',
        payload: {
          users: users
        }
      });
    });
  }
}

export const getChatsList = (userUid, callback) => {
  return (dispatch) => {
    firebase.database().ref('users').child(userUid).child('chats').on('value', (snapshot) => {
      let chats = [];
      snapshot.forEach((childItem) => {
        chats.push({
          key: childItem.key,
          title: childItem.val().title,
          other: childItem.val().other,
        });
      });
      callback();
      dispatch({
        type: 'setChatsList',
        payload: {
          chats: chats,
        },
      });
    });
  };
};

export const setActiveChat = (chatId) => {
  return {
    type: 'setActiveChat',
    payload: {
      chatId: chatId,
    },
  }
}

export const resetInfo = () => {
  return (dispatch) => {
    dispatch({
      type: 'resetState',
      payload: {
      },
    });
  }
}

export const sendMessage = (messageType, messageContent, author, activeChat) => {
  return (_dispatch) => {
    let currentDate = '';
    let cDate = new Date();
    currentDate = cDate.getFullYear() + '-' + (cDate.getMonth() + 1) + '-' + cDate.getDate();
    currentDate += ' ';
    currentDate += cDate.getHours() + ':' + cDate.getMinutes() + ':' + cDate.getSeconds();
    let messageId = firebase.database().ref('chats').child(activeChat).child('messages').push();

    switch (messageType) {
      case 'text':
        messageId.set({
          messageType: 'text',
          date: currentDate,
          m: messageContent,
          uid: author
        });
        break;
      case 'image':
        messageId.set({
          messageType: 'image',
          date: currentDate,
          imgSource: messageContent,
          uid: author
        });
      default:
        break;
    }
  }
}

export const sendImage = (blob, progressCallback, sucessCallback) => {
  return (_dispatch) => {
    let tmpKey = firebase.database().ref('chats').push().key;
    let fbImage = firebase.storage().ref().child('images').child(tmpKey);
    fbImage.put(blob, { contentType: 'image/jpeg' })
      .on(
        'state_changed',
        progressCallback,
        (error) => {
          alert(error.code);
        },
        () => {
          fbImage.getDownloadURL().then((url) => {
            sucessCallback(url);
          });
        }
      )
  }
}

export const monitorChat = (activeChat) => {
  return (dispatch) => {
    firebase.database().ref('chats').child(activeChat).child('messages').orderByChild('date').on('value', (snapshot) => {
      let Msgs = [];
      snapshot.forEach((childItem) => {
        switch (childItem.val().messageType) {
          case 'text':
            Msgs.push({
              key: childItem.key,
              date: childItem.val().date,
              messageType: childItem.val().messageType,
              m: childItem.val().m,
              uid: childItem.val().uid

            });
            break;
          case 'image':
            Msgs.push({
              key: childItem.key,
              date: childItem.val().date,
              messageType: childItem.val().messageType,
              imgSource: childItem.val().imgSource,
              uid: childItem.val().uid
            });
            break;
          default:
            break;
        }
      });
      dispatch({
        type: 'setActiveChatMessages',
        payload: {
          messages: Msgs,
        }
      });
    });
  }
}

export const monitorChatOff = (activeChat) => {
  return (_dispatch) => {
    firebase.database().ref('chats').child(activeChat).child('messages').off();
  };
};