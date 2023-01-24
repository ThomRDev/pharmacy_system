import { AuthInitialState,AUTH_STATUS} from "./../../src/store/auth/authSlice";

export const initialState:AuthInitialState = {
  status : AUTH_STATUS.CHECKING,
  uid: null,
  email: null,
  username: null,
  errorMessage: null,
  fullname : null,
  role : null
}

export const authenticatedState:AuthInitialState = {
  status : AUTH_STATUS.AUTHENTICATED,
  uid: '454asd',
  email: 'thomtwd@google.com',
  username: 'thomtwd',
  errorMessage: null,
  fullname: 'Thom Roman Aguilar',
  role : "ADMIN"
}

export const notAuthenticatedState:AuthInitialState = {
  status : AUTH_STATUS.NOT_AUTHENTICATED,
  uid: null,
  email: null,
  username: null,
  errorMessage: null,
  fullname : null,
  role : null
}