import { addCustomProfile, moveProfileDown, moveProfileUp, selectProfile } from "@/reducers/profile";
import { Profile, ProfileType } from "@/types/profile";
import { RootState } from "@/types/redux";
import classNames from "classnames";
import { FC, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";

type ProfileListItemProps = {
  profile: Profile;
  onClick: MouseEventHandler<HTMLDivElement>;
  active?: boolean;
};

const SideBar = () => {
  const profiles = useSelector((state: RootState) => state.profile.profiles);
  const selectedProfile = useSelector((state: RootState) => state.profile.selectedProfile);
  const dispatch = useDispatch();

  return <div className="thx-drawer flex">
    <div className="main-title">
      Profile List
    </div>
    <div id="profileWrapper" className="drawer-select flex">
      <div id="profileList" className="scrollable">
        {[...profiles]
          .sort((a, b) => a.order - b.order)
          .map((profile: Profile) => (
            <ProfileListItem
              key={profile.id}
              profile={profile}
              onClick={() => dispatch(selectProfile(profile.id))}
              active={profile.id === selectedProfile?.id}
            />
          ))
        }
        <input
          id="profileRename"
          className="profile-item"
          placeholder="Enter Profile Name"
          maxLength={25}
          style={{ top: "150px" }}
        />
      </div>
      <ToolBar />
      <div id="profileDelCfm" className="profile-del alert flex">
        <div className="title">delete eq</div>
        <div className="body-text t-center" id="delName">Default</div>
        <div className="thx-btn" id="cfmDelete">delete</div>
      </div>
    </div>
  </div>;
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

const ToolBar = () => {
  const profiles = useSelector((state: RootState) => state.profile.profiles);
  const selectedProfile = useSelector((state: RootState) => state.profile.selectedProfile);
  const dispatch = useDispatch();
  return <div className="toolbar flex">
    <div
      className="icon add"
      id="profileAdd"
      onClick={() => dispatch(addCustomProfile())}
    />
    <div
      className={classNames("icon edit", {
        show: selectedProfile?.type === ProfileType.CUSTOM,
      })}
      id="profileEdit"
    />
    <div
      className={classNames("icon delete", {
        show: selectedProfile?.type === ProfileType.CUSTOM,
      })}
      id="profileDelete"
    />
    <div
      className={classNames("icon down", {
        disabled: !selectedProfile || selectedProfile?.order >= profiles.length - 1,
      })}
      id="profileDown"
      onClick={() => dispatch(moveProfileDown())}
    />
    <div
      className={classNames("icon up", {
        disabled: !selectedProfile || selectedProfile?.order <= 0,
      })}
      id="profileUp"
      onClick={() => dispatch(moveProfileUp())}
    />
  </div>;
};

export default SideBar;