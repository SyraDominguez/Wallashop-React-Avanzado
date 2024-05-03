import { formatDistanceToNow } from "date-fns";
import es from "date-fns/locale/es";

const TimeAgo = ({ date }) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj)) {
    return null; // or return a default value
  }
  const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true, locale: es });
  return <span>{timeAgo}</span>;
};

export default TimeAgo;
