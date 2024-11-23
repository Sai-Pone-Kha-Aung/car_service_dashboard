import { useState, useEffect } from "react";
const useSort = <T>(data: T[], sortField: keyof T) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortedData, setSortedData] = useState<T[]>(data);

  useEffect(() => {
    const sorted = [...data].sort((a, b) => {
      if (a[sortField] > b[sortField]) {
        return sortOrder === "asc" ? 1 : -1;
      }

      if (a[sortField] < b[sortField]) {
        return sortOrder === "asc" ? -1 : 1;
      }

      return 0;
    });
    setSortedData(sorted);
  }, [data, sortField, sortOrder]);

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return { sortedData, sortOrder, handleSort };
};

export default useSort;
