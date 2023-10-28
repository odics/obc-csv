import { useState } from "react";

const usePositionSort = () => {
  const [positionSortDirection, setPositionSortDirection] = useState(2);

  const positionChangeDirection = () => {
    if (positionSortDirection === 1) {
      setPositionSortDirection(2);
    } else {
      setPositionSortDirection(1);
    }
  };

  return { positionSortDirection, positionChangeDirection };
};

export default usePositionSort;
