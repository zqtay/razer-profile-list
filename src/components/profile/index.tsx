import '../../assets/css/profile.css';
import AutoSave from "./autosave";
import Content from './content';
import SideBar from './sidebar';

const ProfilePage = () => {
  return <div className="thx-wrapper flex">
    <SideBar />
    <Content />
    <AutoSave />
  </div>;
};

export default ProfilePage;