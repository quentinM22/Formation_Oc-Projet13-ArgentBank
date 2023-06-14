import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BACKEND_URL } from "../../Constante"

const initialState = {
	isLoading: false,
	data: [],
	token: null,
	error: null,
}

export const fetchUserAuth = createAsyncThunk(
	"auth/fetchUserAuth",
	async ({ email, password }) => {
		const { data } = await axios.post(
			`${BACKEND_URL}/api/v1/user/login`,
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
		return data
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
			localStorage.removeItem("token")
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserAuth.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchUserAuth.fulfilled, (state, { payload }) => {
				// state.isLoading = false
				state.data = payload
				state.token = payload.body.token
				state.error = null
				localStorage.setItem("token", payload.body.token)
			})
			.addCase(fetchUserAuth.rejected, (state, action) => {
				state.isLoading = false
				state.data = []
				state.token = false
				state.error = action.error.message
			})
	},
})

export default authSlice.reducer
export const { logOut, setLoading } = authSlice.actions
