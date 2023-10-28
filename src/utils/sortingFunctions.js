export const sortDates = (data, dateSortDirection) => {
  data.sort((a, b) => {
    const dateA = parseInt(a.UNIX_TIME);
    const dateB = parseInt(b.UNIX_TIME);

    if (dateSortDirection === 1) {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  return data;
};

export const sortId = (data, idSortDirection) => {
  data.sort((a, b) => {
    const idA = parseInt(a.RECORDING_ID);
    const idB = parseInt(b.RECORDING_ID);

    if (idSortDirection === 1) {
      return idA - idB;
    } else {
      return idB - idA;
    }
  });

  return data;
};

export const sortPosition = (data, positionSortDirection) => {
  data.sort((a, b) => {
    const idA = parseInt(a.POSITION_YARDS);
    const idB = parseInt(b.POSITION_YARDS);

    if (positionSortDirection === 1) {
      return idA - idB;
    } else {
      return idB - idA;
    }
  });

  return data;
};

export const sortScore = (data, scoreSortDirection) => {
  data.sort((a, b) => {
    const idA = parseInt(a.SCORE);
    const idB = parseInt(b.SCORE);

    if (scoreSortDirection === 1) {
      return idA - idB;
    } else {
      return idB - idA;
    }
  });

  return data;
};
