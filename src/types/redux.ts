import { Profile } from "./profile";

export type ProfileState = {
  selectedProfile: Profile | undefined;
  isEditing: boolean;
  isDeleting: boolean;
  profiles: Profile[];
};

export type RootState = {
  profile: ProfileState;
};