import ProfileService from "@/services/profile";
import { RootState } from "@/types/redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AutoSave = () => {
  const profiles = useSelector((state: RootState) => state.profile.profiles);
  const [timeoutId, setTimoutId] = useState<number | null>(null);

  useEffect(() => {
    // Auto save to local storage
    localStorage.setItem("profiles", JSON.stringify(profiles));
    if (timeoutId) {
      // Stop ongoing timeout
      clearTimeout(timeoutId);
    }
    // Save to server after 3 seconds
    const id = window.setTimeout(() => {
      ProfileService.save(profiles);
      // Clear saved timeout id
      setTimoutId(null);
    }, 3000);
    // Set timeout id
    setTimoutId(id);
  }, [profiles]);

  return <></>;
};

export default AutoSave;