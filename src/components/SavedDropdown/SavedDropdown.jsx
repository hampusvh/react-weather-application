import { useState } from "react";
import "./SavedDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

function SavedDropdown({ savedLocations, onSearch, removeLocation }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="saved-dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <FontAwesomeIcon icon={faBookmark} />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          {savedLocations.length > 0 ? (
            savedLocations.map((city, index) => (
              <div className="dropdown-item" key={index}>
                <button onClick={() => onSearch(city)}>{city}</button>
                <button onClick={() => removeLocation(city)} className="remove">
                  x
                </button>
              </div>
            ))
          ) : (
            <p className="empty-msg">Inga sparade platser</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SavedDropdown;
