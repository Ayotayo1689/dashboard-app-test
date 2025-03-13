import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import userService from "../../services/userService"

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await userService.getUsers()
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch users")
  }
})

export const searchUsers = createAsyncThunk("users/searchUsers", async (query, { rejectWithValue }) => {
  try {
    const response = await userService.searchUsers(query)
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Search failed")
  }
})

const initialState = {
  users: [],
  totalUsers: 0,
  activeUsers: 0,
  members: 0,
  isLoading: false,
  error: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.users
        state.totalUsers = action.payload.total

        // Calculate stats
        state.members = Math.floor(action.payload.total * 0.35) // Example calculation
        state.activeUsers = Math.floor(action.payload.total * 0.035) // Example calculation
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(searchUsers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.users
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export default usersSlice.reducer

