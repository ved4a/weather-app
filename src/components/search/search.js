import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoAPIOptions, GEO_API_URL } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}`,
      geoAPIOptions
    );
    const response_1 = await response.json();
    return {
      options: response_1.data.map((city) => {
        return {
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      }),
    };
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Find your city...!"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
