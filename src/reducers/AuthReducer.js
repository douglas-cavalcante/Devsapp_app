
//0 - first verification
// 1 - Logando
//2 - nao logado
const initialState = {
  email: '',
  password: '',
  status: 0,
};

const AuthReducer = (state = initialState, action) => {

  switch (action.type) {
    
    case 'changeStatus':
    
      return { ...state, status: action.payload.status }

    default:
      return state;

  }

};

export default AuthReducer;