import { deleteProfile } from "@/reducers/profile";
import { RootState } from "@/types/redux";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";

export const DeleteConfirmation = () => {
  const selectedProfile = useSelector((state: RootState) => state.profile.selectedProfile);
  const isDeleting = useSelector((state: RootState) => state.profile.isDeleting);
  const dispatch = useDispatch();

  return <div
    id="profileDelCfm"
    className={
      classNames("profile-del alert flex", {
        "show": isDeleting,
      })
    }
  >
    <div className="title">delete eq</div>
    <div className="body-text t-center" id="delName">{selectedProfile?.name}</div>
    <div className="thx-btn" id="cfmDelete" onClick={() => dispatch(deleteProfile())}>delete</div>
  </div>;
};