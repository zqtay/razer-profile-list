import { RootState } from "@/types/redux";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const AutoSave = () => {
  const profiles = useSelector((state: RootState) => state.profile.profiles);

  useEffect(() => {
    // Auto save to local storage
    console.log("Auto saving profiles to local storage");
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  return <></>;
};

export default AutoSave;