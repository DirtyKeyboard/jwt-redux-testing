import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        username: sessionStorage.getItem('username'),
        token: sessionStorage.getItem('token')
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            sessionStorage.setItem('username', action.payload.username)
            sessionStorage.setItem('token', action.payload.token)
            state.user.username = action.payload.username
            state.user.token = action.payload.token
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice.reducer