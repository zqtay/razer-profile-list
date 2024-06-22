import { selectProfile } from "@/reducers/profile";
import { Profile, ProfileType } from "@/types/profile";
import { RootState } from "@/types/redux";
import { useDispatch, useSelector } from "react-redux";
import ProfileListItem from "./item";
import ToolBar from "./toolbar";
import { DeleteConfirmation } from "./modal";
import { NameInput } from "./input";

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
        <NameInput />
      </div>
      <ToolBar />
      <DeleteConfirmation />
    </div>
  </div>;
};

export default SideBar;