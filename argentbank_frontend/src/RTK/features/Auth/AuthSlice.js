import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
	isLoading: false,
	data: [],
	token: null,
	error: null,
	connected: false,
}

const backendURL = "http://127.0.0.1:3001"

export const fetchUserAuth = createAsyncThunk(
	"auth/fetchUserAuth",
	async ({ email, password }) => {
		const res = await axios.post(
			`${backendURL}/api/v1/user/login`,
			{
				email,
				password,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
		return res.data
	}
)

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		logOut: (state) => {
			state.isLoading = false
			state.data = []
			state.token = null
			state.error = null
			state.connected = false
			localStorage.removeItem("token")
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserAuth.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchUserAuth.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.data = payload
				state.token = payload.body.token
				state.error = null
				state.connected = true
				localStorage.setItem("token", payload.body.token)
			})
			.addCase(fetchUserAuth.rejected, (state, action) => {
				state.isLoading = false
				state.data = []
				state.token = false
				state.error = action.error.message
				state.connected = false
			})
	},
})

export default authSlice.reducer
export const { logOut } = authSlice.actions
