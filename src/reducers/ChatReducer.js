const initialState = {
  chats: [],
  contacts: [],
  activeChat: '',
  activeChatTitle: ''
}

const ChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setContactsList':
      return { ...state, contacts: action.payload.users }
    case 'setActiveChat':
      let chatTitle = '';
      for (let i in state.chats) {
        if (state.chats[i].key == action.payload.chatId) {
          chatTitle = state.chats[i].title;
        }
      }
      alert(chatTitle)
      return { ...state, activeChat: action.payload.chatId, activeChatTitle: chatTitle }
    case 'setChatsList':
      return { ...state, chats: action.payload.chats }
    default:
      return state;
  }
}

export default ChatReducer;