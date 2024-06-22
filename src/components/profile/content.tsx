import { useSelector } from "react-redux";

const Content = () => {
  const selectedProfile = useSelector((state: any) => state.profile.selectedProfile);
  return <div className="thx-window flex">
    <div className="sub-title flex">
      <h1 id="eqTitle" className="eq-title">{selectedProfile?.name}</h1>
    </div>
  </div>;
};

export default Content;