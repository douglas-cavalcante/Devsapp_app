const initialState = {
  chats: [],
  contacts: [],
}

const ChatReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'setContactsList':
      return { ...state, contacts: action.payload.users }


    default:
      return state;

  }


}

export default ChatReducer;