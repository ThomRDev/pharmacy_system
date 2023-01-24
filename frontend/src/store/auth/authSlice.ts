import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'

export enum AUTH_STATUS {
  CHECKING = 'checking', // revisando
  NOT_AUTHENTICATED = 'not-authenticated', // no esta authenticado
  AUTHENTICATED ='authenticated' // esta authenticado
}

export interface AuthInitialState {
  status       : AUTH_STATUS
  uid          : string | null
  email        : string | null
  username     : string | null
  errorMessage : string | null
  fullname : string | null
  role : string | null
}
const initialState:AuthInitialState = {
  status : AUTH_STATUS.CHECKING,
  uid: null,
  email: null,
  username: null,
  errorMessage: null,
  fullname : null,
  role : null
}
export const authSlice = createSlice({
  name  : 'auth',
  initialState,
  reducers : {
    login : (state:AuthInitialState, action: PayloadAction<AuthInitialState>) => {
      state.status = AUTH_STATUS.AUTHENTICATED
      state.uid = action.payload.uid
      state.email = action.payload.email
      state.username = action.payload.username
      state.errorMessage = null;
      state.fullname = action.payload.fullname
      state.role = action.payload.role
    },
    logout: (state:AuthInitialState, action: PayloadAction<AuthInitialState>) => {
      state.uid = null;
      state.email = null;
      state.username = null;
      state.status = AUTH_STATUS.NOT_AUTHENTICATED
      state.errorMessage = action.payload?.errorMessage
      state.role = null
      state.fullname = null
    },
    checkingCredentials : (state:AuthInitialState) => {
      state.status = AUTH_STATUS.CHECKING
    }
  }
})
export const { login,logout,checkingCredentials } = authSlice.actions