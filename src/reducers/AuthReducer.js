
// 0 - 1º verificação
// 1 - Logado
// 2 - Não logado
const initialState = {
  name: 'maria',
  email: 'teste@gmail.com',
  password: '',
  status: 0,
  uid: ''
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'changeName':
      return { ...state, name: action.payload.name }
    case 'changeStatus':
      return { ...state, status: action.payload.status }
    case 'changeEmail':
      return { ...state, email: action.payload.email }
    case 'changePassword':
      return { ...state, password: action.payload.password }
    case 'changeUid':
      return { ...state, uid: action.payload.uid }
    default:
      return state;
  }
};

export default AuthReducer;