import { Profile, ProfileType } from "@/types/profile";
import classNames from "classnames";
import { MouseEventHandler, FC } from "react";

type ProfileListItemProps = {
  profile: Profile;
  onClick: MouseEventHandler<HTMLDivElement>;
  active?: boolean;
};

const ProfileListItem: FC<ProfileListItemProps> = ({ profile, onClick, active }) => {
  const isDefault = profile.type === ProfileType.DEFAULT;
  return <div
    className={
      classNames("profile-item", {
        "no-edit": isDefault,
        "custom": profile.type === ProfileType.CUSTOM,
        "active": active,
        "default": isDefault && profile.name === "Default",
        "game": isDefault && profile.name === "Game",
        "movie": isDefault && profile.name === "Movie",
        "music": isDefault && profile.name === "Music",
      })
    }
    onClick={onClick}
  >
    {profile.name}
  </div>;
};

export default ProfileListItem;