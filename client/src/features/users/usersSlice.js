import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsersList, deleteUser } from './usersApi';

export const getUsersAsync = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await getUsersList();
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteUserAsync = createAsyncThunk('users/deleteUser', async (userId) => {
  try{
    await deleteUser(userId);
    return userId;
  }catch(error){
    throw new Error(error.message);
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users.result = state.users.result.filter((user) => user._id !== userId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.users = [];
        state.error = action.error.message;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        const userId = action.payload;
        state.users.result = state.users.result.filter((user) => user._id !== userId);
        state.error = null;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setUsers, clearUsers, setError } = usersSlice.actions;
export default usersSlice.reducer;
