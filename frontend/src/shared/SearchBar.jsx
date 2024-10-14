// SearchBar.jsx

import React, { useState } from "react";

function SearchBar({ onSearch }) {
  // Accept onSearch as a prop
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery); // Pass the search query to the parent component
  };

  return (
    <div>
      <div className="container center">
        <form className="d-flex" role="search" onSubmit={handleSearch}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-info" type="submit">
            Search Patient
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
