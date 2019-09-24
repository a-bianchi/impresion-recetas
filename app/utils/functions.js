const addZerosRigth = (addZeros, number) => {
  let con = '';
  const cant = addZeros - number.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < cant; i++) {
    con += '0';
  }
  return `${con}${number}`;
};

const parseDate = date => {
  if (date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }
};

const pathFolderMeppes = data => {
  const { pathSelected, today, numeroTramite } = data;
  return `${pathSelected}/meppes/${today}/TRAMITE-${numeroTramite}`;
};

export { addZerosRigth, parseDate, pathFolderMeppes };
