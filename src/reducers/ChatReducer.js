const initialState = {
  chats: [],
  contacts: [],
  activeChat: '',
}

const ChatReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'setContactsList':
      return { ...state, contacts: action.payload.users }

    case 'setActiveChat':
    return { ...state, activeChat: action.payload.chatId }

    default:
      return state;

  }


}

export default ChatReducer;