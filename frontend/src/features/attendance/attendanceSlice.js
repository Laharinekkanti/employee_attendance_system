import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkInAPI, checkOutAPI, myHistoryAPI, allAttendanceAPI } from "./attendanceAPI"; // 'todayAPI' removed from this line

export const checkIn = createAsyncThunk("attendance/checkIn", async (_, thunkAPI) => {
  try {
    const res = await checkInAPI();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const checkOut = createAsyncThunk("attendance/checkOut", async (_, thunkAPI) => {
  try {
    const res = await checkOutAPI();
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const getMyHistory = createAsyncThunk("attendance/history", async (_, thunkAPI) => {
  try {
    const res = await myHistoryAPI();
    return Array.isArray(res.data) ? res.data : res.data.records || [];
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

export const getAllAttendance = createAsyncThunk("attendance/all", async (_, thunkAPI) => {
  try {
    const res = await allAttendanceAPI();
    return Array.isArray(res.data) ? res.data : res.data.records || [];
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.error || err.message);
  }
});

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: {
    today: null,
    history: [],
    all: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkIn.fulfilled, (state, action) => {
        state.loading = false;
        console.log("CheckIn Response:", action.payload);
        state.today = action.payload.attendance || action.payload;
      })
      .addCase(checkIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        console.error("CheckIn Error:", action.payload || action.error.message);
      })
      .addCase(checkOut.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkOut.fulfilled, (state, action) => {
        state.loading = false;
        console.log("CheckOut Response:", action.payload);
        state.today = action.payload.attendance || action.payload;
      })
      .addCase(checkOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        console.error("CheckOut Error:", action.payload || action.error.message);
      })
      .addCase(getMyHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getMyHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        console.error("GetMyHistory Error:", action.payload || action.error.message);
      })
      .addCase(getAllAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.all = action.payload;
      })
      .addCase(getAllAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        console.error("GetAllAttendance Error:", action.payload || action.error.message);
      });
  },
});

export default attendanceSlice.reducer;