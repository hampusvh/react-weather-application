import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import Time from "../Time/Time";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <p className="app-title">
          <FontAwesomeIcon icon={faGlobeAmericas} className="title-icon" />{" "}
          Weather Tracker 3.0
        </p>
        <Time />
      </div>
    </div>
  );
};

export default Header;
