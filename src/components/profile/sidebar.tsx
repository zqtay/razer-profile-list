import { selectProfile } from "@/reducers/profile";
import { Profile, ProfileType } from "@/types/profile";
import classNames from "classnames";
import { FC, MouseEventHandler } from "react";
import { useDispatch, useSelector } from "react-redux";

type ProfileListItemProps = {
  profile: Profile;
  onClick: MouseEventHandler<HTMLDivElement>;
  active?: boolean;
};

const SideBar = () => {
  const profiles = useSelector((state: any) => state.profile.profiles);
  const selectedProfile = useSelector((state: any) => state.profile.selectedProfile);
  const dispatch = useDispatch();

  const handleSelectProfile = (id: string) => {
    dispatch(selectProfile(id));
  };

  return <div className="thx-drawer flex">
    <div className="main-title">
      Profile List
    </div>
    <div id="profileWrapper" className="drawer-select flex">
      <div id="profileList" className="scrollable">
        {profiles.map((profile: Profile) => (
          <ProfileListItem
            key={profile.id}
            profile={profile}
            onClick={() => handleSelectProfile(profile.id)}
            active={profile.id === selectedProfile?.id}
          />
        ))}
        <input
          id="profileRename"
          className="profile-item"
          placeholder="Enter Profile Name"
          maxLength={25}
          style={{ top: "150px" }}
        />
      </div>
      <div className="toolbar flex">
        <div className="icon add" id="profileAdd"></div>
        <div className="icon edit" id="profileEdit"></div>
        <div className="icon delete" id="profileDelete"></div>
        <div className="icon down" id="profileDown"></div>
        <div className="icon up" id="profileUp"></div>
      </div>
      <div id="profileDelCfm" className="profile-del alert flex">
        <div className="title">delete eq</div>
        <div className="body-text t-center" id="delName">Default</div>
        <div className="thx-btn" id="cfmDelete">delete</div>
      </div>
    </div>
  </div>;
};

export const ProfileListItem: FC<ProfileListItemProps> = ({ profile, onClick, active }) => {
  return <div
    className={
      classNames("profile-item", {
        "no-edit": profile.type === ProfileType.DEFAULT,
        "custom": profile.type === ProfileType.CUSTOM,
        "active": active,
      })
    }
    onClick={onClick}
  >
    {profile.name}
  </div>;
};

export default SideBar;