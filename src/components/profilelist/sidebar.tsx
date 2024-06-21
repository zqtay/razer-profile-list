const SideBar = () => {
  return <div className="thx-drawer flex">
    <div className="main-title">
      Profile List
    </div>
    <div id="profileWrapper" className="drawer-select flex">
      <div id="profileList" className="scrollable">
        <div id="profile1" className="profile-item default no-edit ">Default</div>
        <div id="profile2" className="profile-item game no-edit active">Game</div>
        <div id="profile3" className="profile-item movie no-edit ">Movie</div>
        <div id="profile4" className="profile-item music no-edit ">Music</div>
        <div id="custom1" className="profile-item custom ">Custom 1</div>
        <div id="custom2" className="profile-item custom ">Demo Long Text Demo Long</div>
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

export default SideBar;