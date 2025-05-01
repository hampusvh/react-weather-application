import { useState } from "react";
import "./SearchBar.css";
import SavedDropdown from "../SavedDropdown/SavedDropdown";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function SearchBar({
  onSearch,
  onGetCurrentLocation,
  errorMessage,
  setErrorMessage,
  savedLocations,
  removeLocation,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <SavedDropdown
          savedLocations={savedLocations}
          onSearch={onSearch}
          removeLocation={removeLocation}
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setErrorMessage("");
          }}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className={errorMessage ? "input-error" : ""}
        />

        <button className="search-btn" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button className="location-btn" onClick={onGetCurrentLocation}>
          <FontAwesomeIcon icon={faLocationCrosshairs} />
        </button>
      </div>
      <div className="error-container">
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    </div>
  );
}

export default SearchBar;
