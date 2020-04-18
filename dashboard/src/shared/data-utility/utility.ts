export const convertToThousand = (stringifiedNumber: any) => {
  if (stringifiedNumber >= 1000) {
    return (Number(stringifiedNumber) / 1000).toFixed(2) + "K";
  } else {
    return stringifiedNumber;
  }
};
