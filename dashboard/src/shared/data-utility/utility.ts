export const convertToThousand = (stringifiedNumber: any) => {
  if (stringifiedNumber >= 1000) {
    return (Number(stringifiedNumber) / 1000).toFixed(2) + "K";
  } else {
    return stringifiedNumber;
  }
};

export const monthString = (month: number): string => {
  switch (month) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "July";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "";
  }
};

export enum CovidMetrics {
  Cases = "cases",
  Deaths = "deaths",
  Recovered = "recovered",
  Critical = "critical"
}
