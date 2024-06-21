import { createSlice } from '@reduxjs/toolkit'
import { Profile } from '../types/profile';

const initialState = {
  selectedProfile: undefined as Profile | undefined,
  profiles: [] as Profile[],
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    select: (state, action) => {
      const profile = state.profiles.find((profile) => profile.id === action.payload);
      if (profile) {
        state.selectedProfile = profile;
      }

    },
  },
})

// Action creators are generated for each case reducer function
export const { select } = profileSlice.actions

export default profileSlice.reducer