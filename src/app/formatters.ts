export const dateTimeFormatter = (value: number[]) => {
  let hours = `${value[3]}`.padStart(2, '0');
  let minutes = `${value[4]}`.padStart(2, '0');
  let seconds = `${value[5]}`.padStart(2, '0');

  return `${dateFormatter(value)} ${hours}:${minutes}:${seconds}`;
};

export const dateFormatter = (value: number[]) => {
  let year = `${value[0]}`.padStart(4, '0');
  let month = `${value[1]}`.padStart(2, '0');
  let days = `${value[2]}`.padStart(2, '0');

  return `${year}-${month}-${days}`;
};

export const rateFormatter = (value: number) => {
  let significant = value * 100;

  return `${significant.toFixed(2)}%`;
};

export const numberFormatter = (value: number) => {
  return `${value.toLocaleString('de-CH')}`;
};
