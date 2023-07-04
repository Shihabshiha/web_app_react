import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, signupUser, loginAdmin } from './authApi';

export const loginUserAsync = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  try {
    const response = await loginUser(email, password);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const loginAdminAsync = createAsyncThunk('auth/loginAdmin', async ({ email, password }) => {
  try {
    const response = await loginAdmin(email, password);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const signupUserAsync = createAsyncThunk('auth/signupUser', async ({ name, email, password, phoneNumber }) => {
  try {
    const response = await signupUser(name, email, password, phoneNumber);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUserAsync.fulfilled, (state, action) => {
      state.user = action.payload; // Update with the correct path to user data
      state.error = null;
    })
    .addCase(loginAdminAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = null;
    })
    .addCase(signupUserAsync.fulfilled, (state, action) => {
      state.user = action.payload; // Update with the correct path to user data
      state.error = null;
    })
    .addCase(loginUserAsync.rejected, (state, action) => {
      state.user = null;
      state.error = action.error.message;
    })
    .addCase(loginAdminAsync.rejected, (state, action) => {
      state.user = null;
      state.error = action.error.message;
    })
    .addCase(signupUserAsync.rejected, (state, action) => {
      state.user = null;
      state.error = action.error.message;
    });
  },
});

export const { setUser, clearUser, setError } = authSlice.actions;
export default authSlice.reducer;


