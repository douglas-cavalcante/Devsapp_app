const initialState = {
  chats: [],
  contacts: [],
  activeChat: '',
  activeChatTitle: '',
  activeChatMessages: []
}

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'setContactsList':
      return { ...state, contacts: action.payload.users }

    case 'setActiveChatMessages':
      return { ...state, activeChatMessages: action.payload.messages }

    case 'resetInfo':
      return { chats: [], contacts: [], activeChat: '', activeChatTitle: '', activeChatMessages: [] }

    case 'setChatsList':
      return { ...state, chats: action.payload.chats }

    case 'setActiveChat':
      let chatTitle = '';
      for (let i in state.chats) {
        if (state.chats[i].key == action.payload.chatId) {
          chatTitle = state.chats[i].title;
        }
      }
      return { ...state, activeChat: action.payload.chatId, activeChatTitle: chatTitle }

    default:
      return state;
  }
}

export default ChatReducer;