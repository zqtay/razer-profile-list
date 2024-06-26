import { createSlice } from '@reduxjs/toolkit';
import { Profile, ProfileType } from '@/types/profile';
import { ProfileState } from "@/types/redux";
import { v4 as uuid } from "uuid";

const defaultProfiles = [
  {
    id: uuid(),
    name: 'Default',
    type: ProfileType.DEFAULT,
    order: 0,
  },
  {
    id: uuid(),
    name: 'Game',
    type: ProfileType.DEFAULT,
    order: 1,
  },
  {
    id: uuid(),
    name: 'Movie',
    type: ProfileType.DEFAULT,
    order: 2,
  },
  {
    id: uuid(),
    name: 'Music',
    type: ProfileType.DEFAULT,
    order: 3,
  },
];

const getInitialState = (): ProfileState => {
  const profiles = localStorage.getItem('profiles') ? JSON.parse(localStorage.getItem('profiles') as string) : defaultProfiles;
  return {
    selectedProfile: profiles.find((profile: Profile) =>
      profile.type === ProfileType.DEFAULT && profile.name === 'Default'
    ),
    isEditing: false,
    isDeleting: false,
    isFirstLoad: true,
    profiles,
  };
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState: getInitialState(),
  reducers: {
    selectProfile: (state, action) => {
      const profile = state.profiles.find((profile) => profile.id === action.payload);
      if (profile) {
        state.selectedProfile = profile;
      }
    },
    addCustomProfile: (state) => {
      const newProfile = {
        id: uuid(),
        name: 'New Profile',
        type: ProfileType.CUSTOM,
        order: state.profiles.length,
      };
      state.profiles.push(newProfile);
      state.selectedProfile = newProfile;
      state.isFirstLoad = false;
    },
    editProfile: (state, action) => {
      if (!state.selectedProfile) return;
      // Prevent editing default profiles
      if (state.selectedProfile.type === ProfileType.DEFAULT) return;
      // Prevent empty name
      const newName = action.payload?.name?.trim();
      if (newName) {
        const selectedId = state.selectedProfile.id;
        const profile = state.profiles.find((profile) => profile.id === selectedId);
        if (profile) {
          profile.name = newName;
        }
      }
      state.isEditing = false;
      state.isFirstLoad = false;
    },
    deleteProfile: (state) => {
      if (!state.selectedProfile) return;
      // Prevent deleting default profiles
      if (state.selectedProfile.type === ProfileType.DEFAULT) return;
      const selectedId = state.selectedProfile.id;
      const selectedOrder = state.selectedProfile.order;
      state.profiles = state.profiles.filter((profile) => profile.id !== selectedId);
      // Update order
      state.profiles.forEach((profile) => {
        if (profile.order > selectedOrder) {
          profile.order -= 1;
        }
      });
      // Set selected profile to previous one
      state.selectedProfile = state.profiles.find((profile) => profile.order === selectedOrder);
      state.isDeleting = false;
      state.isFirstLoad = false;
    },
    moveProfileUp: (state) => {
      const profile = state.profiles.find((profile) => profile.id === state.selectedProfile?.id);
      if (!profile) return;
      if (profile.order <= 0) return;
      // Switch position with previous profile
      const prevIndex = state.profiles.findIndex(e => e.order === profile.order - 1);
      if (prevIndex === -1) return;
      profile.order -= 1;
      state.profiles[prevIndex].order += 1;
      state.selectedProfile = profile;
      state.isFirstLoad = false;
    },
    moveProfileDown: (state) => {
      const profile = state.profiles.find((profile) => profile.id === state.selectedProfile?.id);
      if (!profile) return;
      if (profile.order >= state.profiles.length - 1) return;
      // Switch position with next profile
      const nextIndex = state.profiles.findIndex(e => e.order === profile.order + 1);
      if (nextIndex === -1) return;
      profile.order += 1;
      state.profiles[nextIndex].order -= 1;
      state.selectedProfile = profile;
      state.isFirstLoad = false;
    },
    // Frontend only
    showEdit: (state) => {
      if (!state.selectedProfile) return;
      state.isEditing = true;
    },
    hideEdit: (state) => {
      state.isEditing = false;
    },
    showDelete: (state) => {
      if (!state.selectedProfile) return;
      state.isDeleting = true;
    },
    hideDelete: (state) => {
      state.isDeleting = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  selectProfile,
  addCustomProfile,
  editProfile,
  deleteProfile,
  moveProfileUp,
  moveProfileDown,
  showEdit,
  hideEdit,
  showDelete,
  hideDelete,
} = profileSlice.actions;

export default profileSlice.reducer;