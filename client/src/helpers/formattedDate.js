import { format } from "date-fns";

//get create-date and convert to local timezone and format
export const getFormattedDate = (date) => {
  let createdDate = new Date(date);
  createdDate.toString();

  return format(createdDate, "MM/dd/yyyy");
};
