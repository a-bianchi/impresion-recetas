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
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

export { addZerosRigth, parseDate };
