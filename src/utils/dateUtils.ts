import { format } from "date-fns";

const euFormat = "dd/MM/yyyy"
const euFormatWItTime = `${euFormat} HH:mm`

export const dateUtils = {
  formattedDate: (date: Date) => format(date, euFormat),
  formattedDateWithTime: (date: Date) => format(date, euFormatWItTime),
};
