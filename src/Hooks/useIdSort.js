import { useState } from "react";

const useIdSort = () => {
  const [idSortDirection, setIdSortDirection] = useState(2);

  const idChangeDirection = () => {
    if (idSortDirection === 1) {
      setIdSortDirection(2);
    } else {
      setIdSortDirection(1);
    }
  };

  return { idSortDirection, idChangeDirection };
};

export default useIdSort;
