import { createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileType } from '@/types/profile';
import { generateRandomHexString } from "@/lib/utils";

const initialState = {
  selectedProfile: undefined as Profile | undefined,
  profiles: [
    {
      id: generateRandomHexString(),
      name: 'Default',
      type: ProfileType.DEFAULT,
      order: 0,
    },
    {
      id: generateRandomHexString(),
      name: 'Game',
      type: ProfileType.DEFAULT,
      order: 1,
    },
    {
      id: generateRandomHexString(),
      name: 'Movie',
      type: ProfileType.DEFAULT,
      order: 2,
    },
    {
      id: generateRandomHexString(),
      name: 'Music',
      type: ProfileType.DEFAULT,
      order: 3,
    },
    {
      id: generateRandomHexString(),
      name: 'Custom 1',
      type: ProfileType.CUSTOM,
      order: 4,
    },
    {
      id: generateRandomHexString(),
      name: 'Demo Long Text Demo Long',
      type: ProfileType.CUSTOM,
      order: 5,
    },
  ],
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    selectProfile: (state, action) => {
      const profile = state.profiles.find((profile) => profile.id === action.payload);
      if (profile) {
        state.selectedProfile = profile;
      }
    },
    addCustomProfile: (state) => {
      const newProfile = {
        id: generateRandomHexString(),
        name: 'New Profile',
        type: ProfileType.CUSTOM,
        order: state.profiles.length,
      };
      state.profiles.push(newProfile);
    },
    editProfile: (state, action) => {
      if (!state.selectedProfile) return;
      // Prevent editing default profiles
      if (state.selectedProfile.type === ProfileType.DEFAULT) return;
      const selectedId = state.selectedProfile.id;
      const profile = state.profiles.find((profile) => profile.id === selectedId);
      if (profile) {
        profile.name = action.payload.name;
      }
    },
    deleteProfile: (state) => {
      if (!state.selectedProfile) return;
      // Prevent deleting default profiles
      if (state.selectedProfile.type === ProfileType.DEFAULT) return;
      const selectedId = state.selectedProfile.id;
      state.profiles = state.profiles.filter((profile) => profile.id !== selectedId);
    },
    moveProfileUp: (state) => {
      if (!state.selectedProfile) return;
      const selectedId = state.selectedProfile.id;
      const profile = state.profiles.find((profile) => profile.id === selectedId);
      if (profile) {
        const index = state.profiles.indexOf(profile);
        if (index <= 0) return;
        // Switch position with previous profile
        state.profiles[index] = state.profiles[index - 1];
        state.profiles[index - 1] = profile;
      }
    },
    moveProfileDown: (state) => {
      if (!state.selectedProfile) return;
      const selectedId = state.selectedProfile.id;
      const profile = state.profiles.find((profile) => profile.id === selectedId);
      if (profile) {
        const index = state.profiles.indexOf(profile);
        if (index >= state.profiles.length - 1) return;
        // Switch position with next profile
        state.profiles[index] = state.profiles[index + 1];
        state.profiles[index + 1] = profile;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectProfile, addCustomProfile, editProfile, deleteProfile, moveProfileUp, moveProfileDown, } = profileSlice.actions;

export default profileSlice.reducer;