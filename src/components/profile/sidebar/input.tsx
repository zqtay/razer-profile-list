import { editProfile } from "@/reducers/profile";
import { RootState } from "@/types/redux";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export const NameInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedProfile = useSelector((state: RootState) => state.profile.selectedProfile);
  const isEditing = useSelector((state: RootState) => state.profile.isEditing);
  const dispatch = useDispatch();

  const offset = selectedProfile?.order ? selectedProfile?.order * 30 : 0;

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      dispatch(editProfile({
        name: inputRef.current.value
      }));
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.value = selectedProfile?.name ?? "";
      inputRef.current.select();
      inputRef.current.onblur = () => {
        // Save the new name when the input loses focus
        dispatch(editProfile({
          name: inputRef.current?.value
        }));
      }
    }
  }, [isEditing]);

  return <input
    ref={inputRef}
    id="profileRename"
    className={
      classNames("profile-item", {
        "show": isEditing,
      })
    }
    placeholder="Enter Profile Name"
    maxLength={25}
    style={{ top: `${offset}px` }}
    onKeyDown={handleEnter}
  />;
};