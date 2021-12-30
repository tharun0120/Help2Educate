import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthClass from "../../app/Auth";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isFetching: false,
  isLoggedIn: false,
  error: [],
};

const auth = new AuthClass();

const signIn = createAsyncThunk("/api/auth/login", (user, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .signIn(user)
      .then((user) => resolve(user))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const signInWithGoogle = createAsyncThunk("/api/auth/google", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .signInGoogle()
      .then((user) => resolve(user))
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const signOut = createAsyncThunk("/api/auth/logout", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject();
      });
  });
});

const signUp = createAsyncThunk("/api/auth/register", (user, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .signUp(user)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(thunkAPI.rejectWithValue(error));
      });
  });
});

const isLoggedIn = createAsyncThunk("/api/auth/isLoggedin", (thunkAPI) => {
  // console.log("isLoggedIn");
  return new Promise(async (resolve, reject) => {
    await auth
      .isLoggedIn()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject();
      });
  });
});

const updateUser = createAsyncThunk("/api/user/me/update", (data, thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .onUserUpdate(data)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
});

const deleteUser = createAsyncThunk("/api/user/me/delete", (thunkAPI) => {
  return new Promise(async (resolve, reject) => {
    await auth
      .onUserDelete()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
});

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.isSuccess = false;
      state.isError = false;
      state.isLoggedIn = false;
      state.error = "";
    },
  },
  extraReducers: {
    //signin
    [signIn.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;
      // console.log(payload.user);
      state.user = payload.user;
    },
    [signIn.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      console.log(payload);
      state.error = payload;
    },
    //signin with google
    [signInWithGoogle.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [signInWithGoogle.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;
      state.user = payload.user;
    },
    [signInWithGoogle.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //signup
    [signUp.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;
      state.user = payload.user;
    },
    [signUp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //Sign Out
    [signOut.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [signOut.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = false;
      state.user = null;
    },
    [signOut.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //isLoggedin
    [isLoggedIn.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [isLoggedIn.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;
      state.user = payload.user;
    },
    [isLoggedIn.rejected]: (state) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = false;
    },
    //delete user
    [deleteUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = false;
      state.user = null;
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = payload;
    },
    //update user
    [updateUser.pending]: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.isSuccess = false;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isError = false;
      state.isLoggedIn = true;
      // console.log(payload.user);
      state.user = payload.data;
    },
    [updateUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.isSuccess = false;
      console.log(payload);
      state.error = payload;
    },
  },
});

export {
  signIn,
  signInWithGoogle,
  signUp,
  signOut,
  isLoggedIn,
  updateUser,
  deleteUser,
};

export const { clearState } = userSlice.actions;

export const selectUser = (state) => state.userState;

export default userSlice.reducer;
