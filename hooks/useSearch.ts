import { set } from "date-fns";
import { useState, useEffect } from "react";

const useSearch = <T>(data: T[], searchField: keyof T) => {
  const [searchResults, setSearchResults] = useState(data);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const filteredData = data.filter((item) =>
      String(item[searchField])
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredData);
  }, [searchQuery, data, searchField]);

  return { searchQuery, setSearchQuery, searchResults };
};

export default useSearch;
