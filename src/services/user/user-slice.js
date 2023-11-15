// libraries
import { createSlice } from "@reduxjs/toolkit";

// constants 
import { USER_STATE_NAME } from "../../utils/constants";

// thunks
import { 
  getUser,
  loginUser,
  logoutUser,
  updateUser,
  registerUser,
} from "./user-thunks";



const userSlice = createSlice(
  {
    name: USER_STATE_NAME,
    
    initialState: {
      currentUser: null,
      authChecked: false,
      errorAuthorizingUser: false,
      pendingAuthorizingUser: false,
      errorDeauthorizingUser: false,
      pendingDeauthorizingUser: false,
    },
    
    reducers: {
      setUser: (state, action) => {
        state.currentUser = action.payload;
      },
      setAuthChecked: (state, action) => {
        state.authChecked = action.payload;
      }
    },

    extraReducers: builder => {
      
      const addAuthCases = asyncThunk => {
        builder.addCase(
          asyncThunk.pending, state => {
            state.pendingAuthorizingUser = true;
          }
        ).addCase(
          asyncThunk.rejected, (state, action) => {
            state.errorAuthorizingUser = true;
            state.pendingAuthorizingUser = false;
            console.error(action.payload);            
          }
        ).addCase(
          asyncThunk.fulfilled, (state, action) => {
            state.errorAuthorizingUser = false;
            state.pendingAuthorizingUser = false;
            state.currentUser = action.payload;            
          }
        );
      };
      
      addAuthCases(getUser);
      addAuthCases(loginUser);
      addAuthCases(updateUser);
      addAuthCases(registerUser);
      
      builder.addCase(
        logoutUser.pending, state => {
          state.pendingDeauthorizingUser = true;
        }
      ).addCase(
        logoutUser.rejected, (state, action) => {
          state.errorDeauthorizingUser = true;
          state.pendingDeauthorizingUser = false;
          console.error(action.payload);
        }
      ).addCase(
        logoutUser.fulfilled, state => {
          state.errorDeauthorizingUser = false;
          state.pendingDeauthorizingUser = false;
          state.currentUser = null;
        }
      ).addDefaultCase(
        state => state
      );
    }
  }
);

export const { setUser, setAuthChecked } = userSlice.actions;

export const userReducer = userSlice.reducer;
