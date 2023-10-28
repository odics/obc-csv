import { useState } from "react";

const useScoreSort = () => {
  const [scoreSortDirection, setScoreSortDirection] = useState(2);

  const scoreChangeDirection = () => {
    if (scoreSortDirection === 1) {
      setScoreSortDirection(2);
    } else {
      setScoreSortDirection(1);
    }
  };

  return { scoreSortDirection, scoreChangeDirection };
};

export default useScoreSort;
