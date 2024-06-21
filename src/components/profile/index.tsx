import '../../assets/css/profile.css';
import Content from './content';
import SideBar from './sidebar';

const ProfilePage = () => {
  return <div className="thx-wrapper flex">
    <SideBar />
    <Content />
  </div>;
};

export default ProfilePage;