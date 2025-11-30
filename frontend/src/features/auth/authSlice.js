import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, registerAPI, meAPI, getTotalMembersAPI } from "./authAPI";

export const loginUser = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    const res = await loginAPI(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const registerUser = createAsyncThunk("auth/register", async (data, thunkAPI) => {
  try {
    const res = await registerAPI(data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const fetchMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const res = await meAPI();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getTotalMembers = createAsyncThunk("auth/members", async (_, thunkAPI) => {
  try {
    const res = await getTotalMembersAPI();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    totalMembers: 0,
    membersBreakdown: { employees: 0, managers: 0 },
  },
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // login
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // register
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state) => { // Removed 'action' here
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // me
      .addCase(fetchMe.fulfilled, (state, action) => { // NOTE: If you were receiving an error here, it's likely a similar fix.
        state.user = action.payload.user; // You ARE using 'action.payload' here, so 'action' must be kept.
      })

      // get total members
      .addCase(getTotalMembers.fulfilled, (state, action) => {
        state.totalMembers = action.payload.totalMembers;
        state.membersBreakdown = action.payload.breakdown;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;