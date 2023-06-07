import { configureStore } from "@reduxjs/toolkit"
import AuthReducer from "./features/Auth/AuthSlice"
import UserReducer from "./features/User/UserSlice"

const store = configureStore({
	reducer: {
		auth: AuthReducer,
		user: UserReducer,
	},
})

export default store
