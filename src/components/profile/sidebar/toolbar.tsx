import { addCustomProfile, deleteProfile, moveProfileDown, moveProfileUp, showDelete, showEdit } from "@/reducers/profile";
import { ProfileType } from "@/types/profile";
import { RootState } from "@/types/redux";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";

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
        "show": selectedProfile?.type === ProfileType.CUSTOM,
      })}
      onClick={() => dispatch(showEdit())}
      id="profileEdit"
    />
    <div
      className={classNames("icon delete", {
        "show": selectedProfile?.type === ProfileType.CUSTOM,
      })}
      onClick={() => dispatch(showDelete())}
      id="profileDelete"
    />
    <div
      className={classNames("icon down", {
        "disabled": !selectedProfile || selectedProfile?.order >= profiles.length - 1,
      })}
      id="profileDown"
      onClick={() => dispatch(moveProfileDown())}
    />
    <div
      className={classNames("icon up", {
        "disabled": !selectedProfile || selectedProfile?.order <= 0,
      })}
      id="profileUp"
      onClick={() => dispatch(moveProfileUp())}
    />
  </div>;
};

export default ToolBar;