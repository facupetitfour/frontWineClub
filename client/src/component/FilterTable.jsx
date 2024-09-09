import { useState } from "react";


const FilterTable = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    onSearch(value);
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          value={searchText}
          onChange={handleInputChange}
          className=""
          placeholder="Buscar"
        />
      </div>
    </>
  );
};

export default FilterTable;
