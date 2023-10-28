import { useState } from "react";

const useDateSort = () => {
  const [dateSortDirection, setDateSortDirection] = useState(2);

  const dateChangeDirection = () => {
    if (dateSortDirection === 1) {
      setDateSortDirection(2);
    } else {
      setDateSortDirection(1);
    }
  };

  return { dateSortDirection, dateChangeDirection };
};

export default useDateSort;
