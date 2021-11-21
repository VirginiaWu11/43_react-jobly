import React, { useState } from "react";

function SearchForm({ searchFor }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search "
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SearchForm;
