import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BACKEND_URL } from "../../Constante"

const initialState = {
	isLoading: false,
	data: [],
	error: null,
}

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
	const { data } = await axios.post(
		`${BACKEND_URL}/api/v1/user/profile`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	)
	return data
})
export const fetchUserUpdate = createAsyncThunk(
	"user/fetchUserUpdate",
	async ({ token, firstName, lastName }) => {
		const res = await axios.put(
			`${BACKEND_URL}/api/v1/user/profile`,
			{ firstName, lastName },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
		return res.data
	}
)

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		userReset: (state) => {
			state.isLoading = false
			state.data = []
			state.error = null
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// Post
			.addCase(fetchUser.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchUser.fulfilled, (state, { payload }) => {
				state.isLoading = true
				state.data = payload
				state.error = null
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.isLoading = false
				state.data = []
				state.error = action.error.message
			})
			// Put
			.addCase(fetchUserUpdate.pending, (state) => {
				state.isLoading = true
			})
			.addCase(fetchUserUpdate.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.data = { body: payload } // Mettre à jour ici
				state.error = null
			})
			.addCase(fetchUserUpdate.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.error.message
			})
	},
})

export default userSlice.reducer
export const { userReset, setLoading } = userSlice.actions
