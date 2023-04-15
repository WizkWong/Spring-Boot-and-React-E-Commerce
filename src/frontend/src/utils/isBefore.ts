const isBefore = (date: string | Date, dateCompare: string | Date): boolean => {
  let tempDate: Date;
  let tempDateCompare: Date;

  if (typeof date === "string") {
    tempDate = new Date(date);
  } else if (date instanceof Date) {
    tempDate = date;
  } else {
    throw new Error("Invalid date format");
  }

  if (typeof dateCompare === "string") {
    tempDateCompare = new Date(dateCompare);
  } else if (dateCompare instanceof Date) {
    tempDateCompare = dateCompare;
  } else {
    throw new Error("Invalid dateCompare format");
  }
  return tempDate <= tempDateCompare;
};

export default isBefore;
