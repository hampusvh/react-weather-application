import Time from "../Time/Time";

const Header = () => {
  return (
    <div className="header-container">
      <p className="app-title">⊕ Weather Tracker</p>
      <Time />
    </div>
  );
};

export default Header;