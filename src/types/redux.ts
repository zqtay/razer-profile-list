import { Profile } from "./profile";

export type ProfileState = {
  selectedProfile: Profile | undefined;
  profiles: Profile[];
};

export type RootState = {
  profile: ProfileState;
};